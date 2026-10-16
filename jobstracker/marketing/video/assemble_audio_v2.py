"""Align the revised voice to the approved 120-second animation and remix the audio."""
import json, wave, re, subprocess, math
from pathlib import Path
import numpy as np
ROOT=Path('/home/user/jobstracker-voice-v2')
SR=48000
N=120*SR
durations=[7,11,11,10,8,14,16,12,16,8,7]
def read(name):
    with wave.open(str(ROOT/'assets'/name),'rb') as f:
        rate=f.getframerate(); ch=f.getnchannels()
        a=np.frombuffer(f.readframes(f.getnframes()),dtype='<i2').astype(np.float32)/32768
        assert rate==SR,rate
        return a.reshape(-1,ch)
def save(name,a):
    a=np.clip(a,-.99,.99)
    with wave.open(str(ROOT/'assets'/name),'wb') as f:
        f.setnchannels(1 if a.ndim==1 else a.shape[1]);f.setsampwidth(2);f.setframerate(SR)
        f.writeframes((a*32767).astype('<i2').tobytes())
def norm(s):return re.sub('[^a-z0-9]','',s.lower()).replace('enquiries','inquiries')
words=[w for seg in json.load(open(ROOT/'assets/transcript.json')) for w in seg['words']]
needles=['meetdave','everymorning','wheresthevan','thenitsfriday','daveneeds','inquiriesbecome','photosandupdates','vansengineers','gps','lesschasing','jobstracker']
starts=[];cursor=0
for needle in needles:
    found=None
    for i in range(cursor,len(words)):
        candidate=''.join(norm(w['word']) for w in words[i:i+6])
        if candidate.startswith(needle):found=i;break
    if found is None:raise RuntimeError('Missing speech boundary: '+needle)
    starts.append(found);cursor=found+1
source=read('narration-source.wav').mean(axis=1)
bounds=[0]+[(words[i-1]['end']+words[i]['start'])/2 for i in starts[1:]]+[len(source)/SR]
voice=np.zeros(N,dtype=np.float32)
timing=[];at=0
for i,d in enumerate(durations):
    a,b=bounds[i:i+2];clip=source[int(a*SR):int(b*SR)].copy()
    # Remove a duplicated 'Time' introduced in this generated take.
    if i==3:
        cut_a,cut_b=21.44,22.84
        clip=np.concatenate([clip[:int((cut_a-a)*SR)],clip[int((cut_b-a)*SR):]])
    lead=.35 if i!=9 else .08
    available=d-lead-.08
    factor=max(1,len(clip)/SR/available)
    if factor>1.3:raise RuntimeError(('Speech would be rushed',i,factor))
    if factor>1.001:
        save('segment-input.wav',clip)
        subprocess.run(['ffmpeg','-y','-v','error','-i',str(ROOT/'assets/segment-input.wav'),'-af',f'atempo={factor:.8f}','-ar',str(SR),str(ROOT/'assets/segment-fitted.wav')],check=True)
        clip=read('segment-fitted.wav').mean(axis=1)
    clip=clip[:int(available*SR)]
    fade=min(160,len(clip)//4)
    clip[:fade]*=np.linspace(0,1,fade);clip[-fade:]*=np.linspace(1,0,fade)
    ix=int((at+lead)*SR);voice[ix:ix+len(clip)]+=clip
    timing.append({'at':at,'dur':d,'voice_at':at+lead,'source_from':a,'source_to':b,'speed_factor':factor})
    at+=d
active=voice[np.abs(voice)>.015]
rms=float(np.sqrt(np.mean(active**2)))
voice*=min(.19/max(rms,1e-6),2.5)
music=read('original-music.wav')
sfx=read('sound-effects.wav')
assert len(music)==len(sfx)==N
mix=np.column_stack([voice,voice])+music*.34+sfx*.38
mix*=min(1,.94/max(float(np.max(np.abs(mix))),1e-6))
save('narration-timed.wav',voice);save('soundtrack.wav',mix)
for name in ['segment-input.wav','segment-fitted.wav']:
    (ROOT/'assets'/name).unlink(missing_ok=True)
json.dump(timing,open(ROOT/'assets/timing.json','w'),indent=2)
report={'duration_seconds':120,'source_duration':len(source)/SR,'voice_preset':'Archie','voice_id':'bd072316-f77c-588b-b6e5-e46b9b03d008','source_job':'e9dc9496-039a-4072-ba1f-a90bb127ce6d','max_speed_factor':max(x['speed_factor'] for x in timing),'scene_timing':timing}
json.dump(report,open(ROOT/'voice-revision.json','w'),indent=2)
print(json.dumps(report,indent=2))
