"""Build the ninety-second narration, music edit and effects master."""
import json, wave, re, subprocess
from pathlib import Path
import numpy as np
ROOT=Path('/home/user/jobstracker-90s')
SR=48000; TOTAL=90; N=TOTAL*SR
durations=[5,7,9,7,6,10,11,9,11,8,7]
old_durations=[7,11,11,10,8,14,16,12,16,8,7]
def read(name):
    with wave.open(str(ROOT/'assets'/name),'rb') as f:
        assert f.getframerate()==SR
        return np.frombuffer(f.readframes(f.getnframes()),dtype='<i2').astype(np.float32).reshape(-1,f.getnchannels())/32768
def save(name,a):
    a=np.clip(a,-.99,.99)
    with wave.open(str(ROOT/'assets'/name),'wb') as f:
        f.setnchannels(1 if a.ndim==1 else a.shape[1]);f.setsampwidth(2);f.setframerate(SR)
        f.writeframes((a*32767).astype('<i2').tobytes())
def norm(s):return re.sub('[^a-z0-9]','',s.lower()).replace('enquiries','inquiries')
words=[w for seg in json.load(open(ROOT/'assets/transcript.json')) for w in seg['words']]
needles=['meetdave','inquiriescalls','wheresthevan','fridaybrings','meetjobstracker','turninquiries','seephotos','seevans','gps','lesschasing','jobstracker']
starts=[];cursor=0
for needle in needles:
    candidates=[i for i in range(cursor,len(words)) if ''.join(norm(w['word']) for w in words[i:i+6]).startswith(needle)]
    if not candidates:raise RuntimeError('Speech boundary not found: '+needle)
    starts.append(candidates[0]);cursor=candidates[0]+1
source=read('narration-source.wav').mean(axis=1)
bounds=[0]+[(words[i-1]['end']+words[i]['start'])/2 for i in starts[1:]]+[len(source)/SR]
voice=np.zeros(N,dtype=np.float32);timing=[];at=0
for i,d in enumerate(durations):
    paragraph=words[starts[i]:starts[i+1] if i+1<len(starts) else len(words)]
    # The provider repeated the last 'Sorted'; retain the scripted occurrence only.
    if i==8 and len(paragraph)>1 and norm(paragraph[-1]['word'])==norm(paragraph[-2]['word'])=='sorted':
        paragraph=paragraph[:-1]
    a=max(0,paragraph[0]['start']-.04);b=min(len(source)/SR,paragraph[-1]['end']+.07)
    clip=source[int(a*SR):int(b*SR)].copy()
    # Tighten long pauses without trimming consonants or changing the voice's pitch.
    cuts=[]
    for previous,current in zip(paragraph,paragraph[1:]):
        if current['start']-previous['end']>.48:
            cuts.append((previous['end']+.15,current['start']-.15))
    for left,right in reversed(cuts):
        lo=max(0,int((left-a)*SR));hi=min(len(clip),int((right-a)*SR))
        if hi>lo:
            edge=min(120,lo,len(clip)-hi)
            if edge>0:
                clip[lo-edge:lo]*=np.linspace(1,0,edge);clip[hi:hi+edge]*=np.linspace(0,1,edge)
            clip=np.concatenate([clip[:lo],clip[hi:]])
    lead=.25 if i!=9 else .10
    available=d-lead-.10
    factor=max(1,len(clip)/SR/available)
    if factor>1.22:raise RuntimeError(('Voice would sound rushed',i,factor))
    if factor>1.001:
        save('segment-input.wav',clip)
        subprocess.run(['ffmpeg','-y','-v','error','-i',str(ROOT/'assets/segment-input.wav'),'-af',f'atempo={factor:.8f}','-ar',str(SR),str(ROOT/'assets/segment-fitted.wav')],check=True)
        clip=read('segment-fitted.wav').mean(axis=1)
    clip=clip[:int(available*SR)]
    fade=min(160,len(clip)//4);clip[:fade]*=np.linspace(0,1,fade);clip[-fade:]*=np.linspace(1,0,fade)
    ix=int((at+lead)*SR);voice[ix:ix+len(clip)]+=clip
    timing.append({'at':at,'dur':d,'voice_at':at+lead,'source_from':a,'source_to':b,'speed_factor':factor})
    at+=d
active=voice[np.abs(voice)>.015]
voice*=min(.19/max(float(np.sqrt(np.mean(active**2))),1e-6),2.5)
# Re-edit the original score so the musical change coincides with the new product reveal.
old_music=read('original-music.wav')
cuts=[(0,25),(35.6,38.6),(39,94.5),(113.5,120)]
parts=[]
for a,b in cuts:
    z=old_music[round(a*SR):round(b*SR)].copy();r=min(int(.025*SR),len(z)//4)
    z[:r]*=np.linspace(0,1,r)[:,None];z[-r:]*=np.linspace(1,0,r)[:,None];parts.append(z)
music=np.concatenate(parts)
assert len(music)==N
# Retimed effects follow the same scene-local pace as the character animation.
old_fx=read('sound-effects.wav')
effects=np.zeros((N,2),dtype=np.float32);old_at=0;new_at=0
for od,nd in zip(old_durations,durations):
    original=old_fx[old_at*SR:(old_at+od)*SR]
    grid=np.linspace(0,len(original)-1,nd*SR)
    for c in range(2):effects[new_at*SR:(new_at+nd)*SR,c]=np.interp(grid,np.arange(len(original)),original[:,c])
    old_at+=od;new_at+=nd
mix=np.column_stack([voice,voice])+music*.34+effects*.38
mix*=min(1,.94/max(float(np.max(np.abs(mix))),1e-6))
save('narration-timed.wav',voice);save('music-90s.wav',music);save('effects-90s.wav',effects);save('soundtrack.wav',mix)
for name in ['segment-input.wav','segment-fitted.wav']:(ROOT/'assets'/name).unlink(missing_ok=True)
json.dump(timing,open(ROOT/'assets/timing.json','w'),indent=2)
report={'duration_seconds':90,'source_duration_seconds':len(source)/SR,'voice_preset':'Archie','voice_id':'bd072316-f77c-588b-b6e5-e46b9b03d008','source_job':'477c8808-2797-4adf-b448-645e27a8c411','maximum_speech_speed_factor':max(x['speed_factor'] for x in timing),'scene_timing':timing}
json.dump(report,open(ROOT/'production-90s.json','w'),indent=2);print(json.dumps(report,indent=2))
