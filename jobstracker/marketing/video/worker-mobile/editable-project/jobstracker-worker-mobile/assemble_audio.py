"""Build the 60-second worker-film narration, original-score edit and effects."""
import json,wave,re,subprocess
from pathlib import Path
import numpy as np
ROOT=Path('/home/user/jobstracker-worker-mobile')
SR=48000;N=60*SR
durations=[4,6,7,8,7,6,6,5,5,6]
def read(name):
 with wave.open(str(ROOT/'assets'/name),'rb') as f:
  assert f.getframerate()==SR
  return np.frombuffer(f.readframes(f.getnframes()),dtype='<i2').astype(np.float32).reshape(-1,f.getnchannels())/32768
def save(name,a):
 a=np.clip(a,-.99,.99)
 with wave.open(str(ROOT/'assets'/name),'wb') as f:
  f.setnchannels(1 if a.ndim==1 else a.shape[1]);f.setsampwidth(2);f.setframerate(SR);f.writeframes((a*32767).astype('<i2').tobytes())
def norm(s):return re.sub('[^a-z0-9]','',s.lower())
words=[w for seg in json.load(open(ROOT/'assets/transcript.json')) for w in seg['words']]
needles=['meetsam','signin','readand','arrived','logmaterials','capturecompletion','checkandsubmit','requestleave','vanchecks','jobstracker']
starts=[];cursor=0
for needle in needles:
 found=[i for i in range(cursor,len(words)) if ''.join(norm(w['word']) for w in words[i:i+6]).startswith(needle)]
 if not found:raise RuntimeError('Cannot find narration boundary: '+needle)
 starts.append(found[0]);cursor=found[0]+1
source=read('narration-source.wav').mean(axis=1)
voice=np.zeros(N,dtype=np.float32);timing=[];at=0
for i,d in enumerate(durations):
 paragraph=words[starts[i]:starts[i+1] if i+1<len(starts) else len(words)]
 a=max(0,paragraph[0]['start']-.04);b=min(len(source)/SR,paragraph[-1]['end']+.07)
 clip=source[int(a*SR):int(b*SR)].copy()
 cuts=[(previous['end']+.15,current['start']-.15) for previous,current in zip(paragraph,paragraph[1:]) if current['start']-previous['end']>.48]
 for left,right in reversed(cuts):
  lo=max(0,int((left-a)*SR));hi=min(len(clip),int((right-a)*SR))
  if hi>lo:
   edge=min(120,lo,len(clip)-hi)
   if edge>0:clip[lo-edge:lo]*=np.linspace(1,0,edge);clip[hi:hi+edge]*=np.linspace(0,1,edge)
   clip=np.concatenate([clip[:lo],clip[hi:]])
 lead=.18;available=d-lead-.08
 factor=max(1,len(clip)/SR/available)
 if factor>1.2:raise RuntimeError(('Voice would be rushed',i,factor))
 if factor>1.001:
  save('segment-input.wav',clip)
  subprocess.run(['ffmpeg','-y','-v','error','-i',str(ROOT/'assets/segment-input.wav'),'-af',f'atempo={factor:.8f}','-ar',str(SR),str(ROOT/'assets/segment-fitted.wav')],check=True)
  clip=read('segment-fitted.wav').mean(axis=1)
 clip=clip[:int(available*SR)]
 fade=min(120,len(clip)//4);clip[:fade]*=np.linspace(0,1,fade);clip[-fade:]*=np.linspace(1,0,fade)
 ix=int((at+lead)*SR);voice[ix:ix+len(clip)]+=clip
 timing.append({'at':at,'dur':d,'voice_at':at+lead,'source_from':a,'source_to':b,'speed_factor':factor});at+=d
active=voice[np.abs(voice)>.015];voice*=min(.19/max(float(np.sqrt(np.mean(active**2))),1e-6),2.5)
original=read('original-music.wav')
music=np.concatenate([original[39*SR:93*SR],original[114*SR:120*SR]]).copy()
for t in [0,54]:
 ix=t*SR;r=int(.025*SR);music[ix:ix+r]*=np.linspace(0,1,r)[:,None]
 if ix>0:music[ix-r:ix]*=np.linspace(1,0,r)[:,None]
effects=np.zeros((N,2),dtype=np.float32)
def ping(at,note=86,gain=.04):
 t=np.arange(int(.5*SR))/SR;freq=440*2**((note-69)/12)
 sig=(np.sin(2*np.pi*freq*t)+.2*np.sin(2*np.pi*freq*2*t))*np.exp(-t*12)*np.minimum(t/.004,1)*gain
 ix=int(at*SR);effects[ix:ix+len(sig),0]+=sig*.68;effects[ix:ix+len(sig),1]+=sig*.74
for t in [4.6,6.8,11.1,11.9,14.4,17.4,20.3,21.8,26.6,30.1,33.2,35.1,35.8,40.9,41.7,44.8,46.2,51.8,54.2]:ping(t)
mix=np.column_stack([voice,voice])+music*.34+effects*.6
mix*=min(1,.94/max(float(np.max(np.abs(mix))),1e-6))
save('narration-timed.wav',voice);save('music-60s.wav',music);save('effects-60s.wav',effects);save('soundtrack.wav',mix)
for name in ['segment-input.wav','segment-fitted.wav']:(ROOT/'assets'/name).unlink(missing_ok=True)
json.dump(timing,open(ROOT/'assets/timing.json','w'),indent=2)
report={'duration_seconds':60,'source_duration_seconds':len(source)/SR,'narration_words':115,'voice':'Archie','source_job':'ab9bfdfb-dca2-452d-8ab6-71577f1885e6','max_speed_factor':max(s['speed_factor'] for s in timing),'scenes':timing}
json.dump(report,open(ROOT/'production-worker.json','w'),indent=2);print(json.dumps(report,indent=2))
