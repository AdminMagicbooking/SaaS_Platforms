"""Assemble the selected Higgsfield voice take and compose an original music bed."""
import json, wave, math
from pathlib import Path
import numpy as np
ROOT=Path('/home/user/jobstracker-production')
SR=48000
DURATION=120
n=SR*DURATION
with wave.open(str(ROOT/'assets/narration-source.wav'),'rb') as f:
    source=np.frombuffer(f.readframes(f.getnframes()),dtype=np.int16).astype(np.float32)/32768
    channels=f.getnchannels(); source=source.reshape(-1,channels).mean(axis=1)
    assert f.getframerate()==SR
bounds=[0,4.80,13.66,21.56,29.71,36.63,45.69,56.47,64.28,74.43,82.27,len(source)/SR]
durations=[7,11,11,10,8,14,16,12,16,8,7]
timing=[]; at=0
voice=np.zeros(n,dtype=np.float32)
for i,d in enumerate(durations):
    lead=.5 if i!=9 else .08
    a,b=bounds[i:i+2]; clip=source[int(a*SR):int(b*SR)].copy()
    assert len(clip)/SR+lead<d,(i,len(clip)/SR,d)
    fade=min(240,len(clip)//4); clip[:fade]*=np.linspace(0,1,fade); clip[-fade:]*=np.linspace(1,0,fade)
    start=int((at+lead)*SR); voice[start:start+len(clip)]+=clip
    timing.append({'at':at,'dur':d,'voice_at':round(at+lead,3),'source_from':a,'source_to':b})
    at+=d
json.dump(timing,open(ROOT/'assets/timing.json','w'),indent=2)

# All music and small effects are newly composed/synthesised for this film.
music=np.zeros((n,2),dtype=np.float32)
sfx=np.zeros((n,2),dtype=np.float32)
rng=np.random.default_rng(1048)
def hz(m): return 440*2**((m-69)/12)
def place(buf,sound,at,gain=1,pan=0):
    ix=int(at*SR)
    if ix>=n or ix<0:return
    sound=sound[:n-ix]*gain
    l=math.sqrt((1-pan)/2);r=math.sqrt((1+pan)/2)
    if sound.ndim==1:
        buf[ix:ix+len(sound),0]+=sound*l;buf[ix:ix+len(sound),1]+=sound*r
    else:buf[ix:ix+len(sound)]+=sound
def pluck(m,d=.8,bright=1):
    t=np.arange(int(d*SR))/SR; f=hz(m)
    sig=(np.sin(2*np.pi*f*t)+.31*np.sin(2*np.pi*f*2*t)*np.exp(-t*6)+.12*np.sin(2*np.pi*f*3*t)*np.exp(-t*9))
    return sig*np.exp(-t*(6 if bright else 3))*np.minimum(t/.006,1)
def bass(m,d=.45):
    t=np.arange(int(d*SR))/SR
    return (np.sin(2*np.pi*hz(m)*t)+.16*np.sin(2*np.pi*hz(m)*2*t))*np.exp(-t*5)*np.minimum(t/.015,1)
def pad(chord,d=2):
    t=np.arange(int(d*SR))/SR
    sig=sum(np.sin(2*np.pi*hz(m)*t+.2*j)+.15*np.sin(2*np.pi*hz(m)*2*t) for j,m in enumerate(chord))/len(chord)
    env=np.minimum(t/.24,1)*np.minimum((d-t)/.45,1)
    return sig*env
def brush(d=.12):
    t=np.arange(int(SR*d))/SR
    noise=rng.normal(size=len(t)).astype(np.float32)
    return np.diff(np.r_[0,noise])*np.exp(-t*50)*np.minimum(t/.002,1)*.13
beat=60/108
minor=[[50,57,62,65],[46,53,58,62],[43,50,55,58],[45,52,57,61]]
major=[[50,57,62,66],[47,54,59,62],[43,50,55,59],[45,52,57,61]]
for k,bar in enumerate(np.arange(0,DURATION,4*beat)):
    chord=(minor if bar<39 else major)[k%4]
    if 35.6<bar<39:continue
    place(music,bass(chord[0]-12),bar,.18)
    place(music,bass(chord[0]-12),bar+2*beat,.12)
    for j in range(8):
        at=bar+j*beat/2
        if 35.7<at<39:continue
        melody=chord[[0,2,1,3,2,1,3,2][j]]+12
        place(music,pluck(melody,.75,bar<39),at,.12 if bar<39 else .105,(-.35 if j%2 else .35))
    for j in [1,3]:
        place(music,pluck(chord[1]+12,.5),bar+j*beat,.055,-.15)
        place(music,brush(),bar+j*beat,.36,.15)
    if bar>=39:
        place(music,pad([x+12 for x in chord[1:]],4*beat),bar,.07,.0)
# A sparse melodic phrase, rather than an unchanging loop.
for phrase in np.arange(40,112,8*beat):
    for j,nt in enumerate([74,78,76,74,71,69]):
        place(music,pluck(nt,1.5,False),phrase+j*beat,.075,.12)
# Short reverb/delay taps, well below the dry instruments.
dry=music.copy()
for delay,gain in [(.11,.16),(.23,.09),(.37,.05)]:
    z=int(delay*SR); music[z:]+=dry[:-z,::-1]*gain
# Music becomes quieter under actual speech, with smoothed gain changes.
win=int(.08*SR)
energy=np.sqrt(np.mean(voice[:(n//win)*win].reshape(-1,win)**2,axis=1))
env=np.repeat(np.where(energy>.012,.64,1.0),win)[:n]
smooth=np.convolve(np.r_[np.ones(8),np.where(energy>.012,.64,1.0),np.ones(8)],np.ones(7)/7,mode='same')[8:-8]
duck=np.interp(np.arange(n),np.arange(len(smooth))*win,smooth)
music*=duck[:,None]
# End resolves to D major with a soft tail.
place(music,pad([62,66,69,74],3.8),115.7,.12)
music*=np.minimum(np.arange(n)/SR/1.4,1)[:,None]
music*=np.clip((120-np.arange(n)/SR)/2.0,0,1)[:,None]

def ping(at,notes=[81,86],gain=.11):
    for j,nt in enumerate(notes):place(sfx,pluck(nt,.6),at+j*.11,gain,.15)
# Ring, notification escalation, tiny comedic reveal, tidy confirmation, mug clink.
for at in [5.45,5.8,6.15]:
    t=np.arange(int(.14*SR))/SR
    place(sfx,np.sin(2*np.pi*880*t)*np.sin(2*np.pi*18*t)**2*np.exp(-t*14),at,.09,-.25)
for at in [8.4,10.2,12.8]:ping(at,[84],.09)
ping(26.9,[76,64],.10)
ping(36.9,[81,69],.08)
ping(40.8,[62,66,69,74],.1)
for at in [52.2,55.5,65.1,67.6,70.1,93.8,95.0,96.2,99.4]:ping(at,[86],.055)
ping(110.6,[93,98],.06)
# Voice normalization uses active speech, not the deliberately inserted pauses.
active=voice[np.abs(voice)>.015]
rms=np.sqrt(np.mean(active**2))
voice*=min(.19/max(rms,1e-6),2)
def save(name,a):
    a=np.clip(a,-.99,.99)
    with wave.open(str(ROOT/'assets'/name),'wb') as f:
        f.setnchannels(1 if a.ndim==1 else 2);f.setsampwidth(2);f.setframerate(SR)
        f.writeframes((a*32767).astype('<i2').tobytes())
save('narration-timed.wav',voice)
save('original-music.wav',music)
save('sound-effects.wav',sfx)
mix=np.column_stack([voice,voice])+music*.34+sfx*.38
peak=float(np.max(np.abs(mix)));mix*=min(1,.94/max(peak,1e-6))
save('soundtrack.wav',mix)
print(json.dumps({'duration':120,'voice_active_rms':float(rms),'mix_peak':float(np.max(np.abs(mix))),'scenes':timing},indent=2))
