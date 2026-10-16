import fs from 'node:fs';
/** Jobs Tracker worker film, native Higgsedit animation, 60 seconds. */
export default async function edit({project,text,rect,path,frame,media,icon}) {
 const root=process.env.JOBS_TRACKER_ROOT || '/home/user/jobstracker-worker-mobile';
 const durations=[4,6,7,8,7,6,6,5,5,6];
 const timing=durations.map((dur,i)=>({dur,at:durations.slice(0,i).reduce((a,b)=>a+b,0)}));
 const p=await project({dir:root+'/project',size:'1920x1080',fps:24,background:'#101c24'});
 const logo=await p.add(root+'/assets/logo.png');
 const C={navy:'#101c24',panel:'#1b303b',muted:'#9fb6b8',lime:'#c1f46e',teal:'#06aba7',cream:'#f4f1e8',paper:'#fffdf6',ink:'#133246',peach:'#efb99b',hair:'#503d35',coral:'#fa856e',blue:'#afd7e6',white:'#ffffff',line:'#d0ddd4'};
 const R=(x,y,w,h,c,r=0,o={})=>rect({x,y,width:w,height:h,fill:c,radius:r,...o});
 const T=(s,x,y,w,size=30,c=C.ink,o={})=>text(s,{x,y,width:w,height:size*3,fontFamily:'Inter',fontSize:size,fontWeight:700,lineHeight:1.12,color:c,...o});
 const F=(x,y,w,h,kids,o={})=>frame({x,y,width:w,height:h,layout:'none',...o},kids.flat(Infinity).filter(Boolean));
 const P=(d,w,h,c,sw=0,fill=null,o={})=>path({d,width:w,height:h,...(fill?{fill}:{}),...(sw?{stroke:{color:c,width:sw,cap:'round'}}:{}),...o});
 const I=(name,x,y,size=48,c=C.teal,o={})=>icon(name,{x,y,size,color:c,strokeWidth:1.8,...o});
 const anim=(property,from,to,at,duration,easing='house')=>({property,from,to,at,duration,easing});
 const keys=(property,values)=>({property,keyframes:values.map(([at,value])=>({at,value,easing:'smooth'}))});
 const enter=(at=0,dy=24)=>({enter:{from:{y:dy,opacity:0},duration:.4,at,easing:'house'}});
 const pop=(at=0)=>({enter:{from:{scale:.9,opacity:0},duration:.35,at,easing:'house'}});
  function worker(x,y,scale=1,dur=8,opts={}) {
    return F(x,y,250*scale,460*scale,[F(0,0,250,460,[
      R(62,242,57,178,C.ink,17),R(128,242,57,178,C.ink,17),R(47,403,79,27,C.hair,12),R(124,403,79,27,C.hair,12),
      R(57,125,133,157,C.teal,30),R(70,134,23,145,C.lime,3),R(154,134,23,145,C.lime,3),R(61,223,124,17,C.lime,2),
      R(100,97,49,47,C.peach,13),R(82,32,89,91,C.peach,32),
      P('M 72 55 Q 73 3 126 3 Q 182 4 183 56 Z',250,120,C.lime,0,C.lime),R(66,47,125,15,C.lime,5),
      R(101,73,7,8,C.ink,3),R(147,73,7,8,C.ink,3),P('M 111 98 Q 126 108 141 98',250,125,C.ink,3),
      F(173,135,73,125,[P('M 0 8 L 42 63 L 10 91',80,120,C.teal,28),R(2,77,37,23,C.peach,10),R(8,42,37,64,C.ink,7),R(13,48,27,44,C.blue,3)],{animate:[keys('rotation',[[0,0],[dur*.4,-8],[dur*.7,0],[dur,0]])]})
    ],{animate:[anim('scale',scale,scale,0,dur)]})],opts);
  }
  function van(x,y,scale=1,color=C.teal,opts={}) {
    return F(x,y,310*scale,160*scale,[F(0,0,310,160,[
      R(8,34,186,94,color,20),P('M 184 34 L 247 34 L 285 83 L 285 129 L 182 129 Z',310,160,color,0,color),
      P('M 207 47 L 239 47 L 264 83 L 207 83 Z',310,160,C.blue,0,C.blue),
      R(16,118,274,13,C.ink,5),R(41,112,47,47,C.ink,24),R(218,112,47,47,C.ink,24),R(52,123,25,25,C.cream,13),R(229,123,25,25,C.cream,13),
      P('M 59 64 L 128 64 L 82 101 L 150 101',310,160,C.lime,9),R(274,91,14,15,C.lime,3)
    ],{animate:[anim('scale',scale,scale,0,1)]})],opts);
  }

 const chip=(s,x,y,w=250,c=C.lime,tc=C.ink)=>F(x,y,w,42,[R(0,0,w,42,c,21),T(s,12,10,w-24,18,tc,{align:'center',height:27})]);
 const check=(x,y,size=32,c=C.teal)=>F(x,y,size,size,[R(0,0,size,size,c,size/2),I('check',size*.2,size*.2,size*.6,C.white)]);
 const button=(s,y,c=C.lime)=>F(0,y,436,57,[R(0,0,436,57,c,15),T(s,15,17,406,23,C.ink,{align:'center',height:30})]);
 const line=(label,value,y)=>[T(label,0,y,430,17,'#54717a',{fontWeight:600,height:25}),T(value,0,y+25,430,24,C.ink,{height:58})];
 const toast=(s,at=0,c=C.lime)=>F(12,520,412,52,[R(0,0,412,52,c,13),I('check',14,15,24,C.ink),T(s,49,15,350,19,C.ink,{height:29})],{at,motion:pop()});
 const tap=(x,y,at=0)=>F(x-27,y-27,54,54,[R(0,0,54,54,'#c1f46e33',27,{strokeColor:C.teal,strokeWidth:3})],{at,duration:.7,animate:[anim('scale',.6,1.5,0,.7),anim('opacity',.9,0,0,.7)]});
 function appCard(title,detail,y,h=100,ic='clipboard-check',accent=C.teal) {
  return F(0,y,436,h,[R(0,0,436,h,C.white,16),I(ic,17,22,35,accent),T(title,67,17,350,23,C.ink,{height:58}),T(detail,67,h-34,350,17,'#54717a',{fontWeight:400,height:27})]);
 }
 function phone(kids,active=0,opts={}) {
  return F(1230,158,500,810,[
   R(0,0,500,810,'#37505b',46),R(6,6,488,798,C.navy,43),R(15,15,470,780,C.cream,36),
   R(170,17,160,24,C.navy,12),T('08:12',38,29,100,14,C.ink,{height:20}),T('5G  •••',369,29,92,14,C.ink,{align:'right',height:20}),
   media({file:logo,x:31,y:66,width:229,height:42,fit:'contain'}),I('bell',400,70,25,C.ink),R(420,69,8,8,C.coral,4),I('ellipsis',444,70,25,C.ink),
   F(32,130,436,575,kids),
   R(25,721,450,1,C.line),
   ...[['briefcase-business','Jobs'],['calendar-days','Upcoming'],['clock','Time'],['calendar','Leave']].map(([ic,s],j)=>F(25+j*113,734,111,57,[
    I(ic,42,0,26,j===active?C.teal:'#71858a'),T(s,2,33,107,14,j===active?C.teal:'#71858a',{align:'center',height:21})
   ])),
   R(173,797,154,5,C.ink,3)
  ],opts);
 }
 function title(kicker,headline,sub=null) {
  return [T(kicker.toUpperCase(),100,138,1080,21,C.lime,{letterSpacing:2.5,height:32}),
   T(headline,94,192,1090,68,C.white,{height:174}),
   sub?T(sub,100,350,1050,28,C.muted,{fontWeight:400,height:90}):null];
 }
 function feature(ic,a,b,x,y,w=970,at=0) {
  return F(x,y,w,111,[R(0,0,w,111,C.panel,20),I(ic,25,28,48,C.lime),T(a,102,21,w-128,29,C.white,{height:43}),T(b,102,66,w-128,21,C.muted,{fontWeight:400,height:34})],{motion:enter(at)});
 }
 function scene(i,nodes) {
  const s=timing[i];
  p.compose(F(0,0,1920,1080,[
   R(0,0,1920,1080,C.navy),...nodes,
   R(100,48,258,49,C.white,10),media({file:logo,x:111,y:57,width:235,height:33,fit:'contain'}),
   T('WORKER APP  /  IPHONE + ANDROID',1120,64,700,18,C.muted,{align:'right',letterSpacing:1.6,height:28}),
   T('jobstracker.work',100,1031,520,18,C.muted,{fontWeight:400,height:27}),
   T('Illustrated app workflow',1230,984,500,15,C.muted,{fontWeight:400,align:'center',height:24}),
   R(0,1074,1920,6,'#29414b'),R(0,1074,1920,6,C.lime,0,{animate:[anim('scaleX',s.at/60,(s.at+s.dur)/60,0,s.dur,'linear')]})
  ]),{at:s.at,dur:s.dur,name:'Worker scene '+(i+1)});
 }
 // 1. Meet Sam: a phone replaces loose job sheets.
 {
  const d=4;
  scene(0,[
   T('MEET SAM',100,163,980,22,C.lime,{letterSpacing:3}),
   T('The whole day.\nIn your pocket.',93,228,1090,86,C.white,{height:225}),
   T('One phone. Fewer paper chases.',100,475,1000,33,C.muted,{fontWeight:400,height:50}),
   ...['JOB SHEET','WHERE NEXT?','FRIDAY HOURS'].map((s,j)=>F(130+j*54,624+j*41,374,127,[
    R(0,0,374,127,C.paper,13),T(s,24,23,324,24,C.ink),R(24,77,272,6,'#bdcec7',3),R(24,96,210,6,'#bdcec7',3)
   ],{animate:[keys('offsetX',[[0,0],[1.5,0],[2.4,-900]]),keys('rotation',[[0,0],[1.5,0],[2.4,-15]])]})),
   worker(771,485,1.02,d,{motion:enter(.3)}),
   phone([T('Morning, Sam',0,0,436,34),T('Your day is ready.',0,50,436,22,'#54717a',{fontWeight:400}),appCard('Westgate House','09:00 · Service visit',106,118),appCard('Riverside Works','13:30 · Planned maintenance',241,118),chip('2 jobs. One app.',55,414,326)],0,{motion:enter(.25)})
  ]);
 }
 // 2. Sign in, inspect today's work and see what's next.
 {
  scene(1,[...title('Start your day','Open. Check. Go.'),
   feature('fingerprint','Biometric sign-in','A quick, secure start.',100,399,1000,.05),
   feature('calendar-days','Today + upcoming jobs','Job details and the next address, together.',100,540,1000,.7),
   feature('bell','Push alerts + reminders','New work and office updates reach your phone.',100,681,1000,1.2),
   chip('Less “Where am I going?”',100,855,480),
   phone([
    F(0,0,436,575,[T('Welcome back, Sam',0,14,436,32),I('fingerprint',130,140,176,C.teal),button('Use biometrics',403),tap(218,432,.6)],{at:0,duration:1.6}),
    F(0,0,436,575,[T('Today’s jobs',0,0,436,34),appCard('Westgate House','09:00 · Job 1048',61,127),T('Site address + job details',16,202,404,20,C.teal),appCard('Upcoming work','Tomorrow · Riverside Works',261,115,'calendar-days'),F(0,416,436,110,[R(0,0,436,110,'#e3edcf',17),I('bell',17,24,31,C.teal),T('Office update',65,18,349,23),T('Your next job is ready to view.',65,56,349,18,'#54717a',{fontWeight:400})])],{at:1.6,duration:4.4,motion:enter()})
   ],0)
  ]);
 }
 // 3. Sign safety requirements, then choose navigation and start travel.
 {
  scene(2,[...title('Before the job','Safety first.\nThen hit the road.'),
   feature('shield-check','Read and sign required RAMS','Work proceeds after the required safety sign-off.',100,398,1000,.1),
   feature('navigation','Google Maps or Waze','Start travel with directions to your next job.',100,537,1000,2.3),
   van(151,744,1.23,C.teal,{animate:[keys('offsetX',[[0,-50],[2,0],[7,125]])]}),worker(807,685,.63,7),
   phone([
    F(0,0,436,575,[T('RAMS + safety',0,0,436,34),appCard('Site RAMS','Read the document',65,108,'file-text'),...['Hazards reviewed','Controls understood','Required confirmations'].map((s,j)=>F(0,202+j*57,436,46,[check(3,6,30),T(s,46,10,375,20)])),button('Sign RAMS',430),tap(218,458,1.1),toast('Required RAMS signed',1.9)],{at:0,duration:2.8}),
    F(0,0,436,575,[T('Start travel',0,0,436,34),T('Westgate House',0,53,436,22),R(0,100,436,236,'#d4e4dc',15),P('M 22 155 L 161 155 L 161 286 L 360 286',436,336,C.teal,8),I('map-pin',325,236,56,C.teal),chip('RAMS signed',18,112,212),F(0,362,210,67,[R(0,0,210,67,C.white,14),T('Google Maps',10,21,190,21,C.ink,{align:'center'})]),F(226,362,210,67,[R(0,0,210,67,C.white,14),T('Waze',10,21,190,21,C.ink,{align:'center'})]),button('Start travel',463),tap(218,490,1.6)],{at:2.8,duration:4.2,motion:enter()})
   ],0)
  ]);
 }
 // 4. Arrival and recording the job: checklist, photos, notes, chat.
 {
  scene(3,[...title('On site','Arrive. Tap in.\nKeep things moving.'),
   F(100,405,995,135,[R(0,0,995,135,C.cream,23),I('map-pin',23,33,64,C.teal),T('GPS tap-in recorded',119,26,830,31),T('Travel start / arrival / on-site time',119,78,830,23,'#54717a',{fontWeight:400})],{motion:enter(.1)}),
   ...[['list-checks','Checklists'],['camera','Job photos'],['file-text','Notes + AI proofread'],['messages-square','Office chat']].map(([ic,s],j)=>F(100+(j%2)*514,578+Math.floor(j/2)*154,481,127,[
    R(0,0,481,127,C.panel,22),I(ic,28,35,53,C.lime),T(s,109,44,344,30,C.white,{height:48})
   ],{motion:enter(.8+j*.5)})),
   chip('GPS event trail stays with the job',100,928,620),
   phone([
    F(0,0,436,575,[T('Arrived on site?',0,0,436,34),I('map-pin',141,98,154,C.teal),T('Westgate House',0,283,436,28,C.ink,{align:'center'}),button('GPS tap-in',407),tap(218,436,.4),toast('Arrival recorded',1)],{at:0,duration:1.9}),
    F(0,0,436,575,[T('Westgate House',0,0,436,31),T('Job 1048 · In progress',0,45,436,18,C.teal),F(0,83,436,105,[R(0,0,436,105,C.white,16),check(15,17,27),T('Job checklist',58,18,357,22),T('Photo step completed',58,60,357,18,'#54717a',{fontWeight:400})]),F(0,207,436,126,[R(0,0,436,126,'#d4e4dc',17),I('camera',22,31,62,C.teal),T('Progress photo',108,25,308,23),T('Saved against the job',108,68,308,18,'#54717a',{fontWeight:400})],{motion:enter(.3)}),appCard('Notes saved','“Access confirmed. Work started.”',352,93,'file-text'),F(0,459,436,95,[R(0,0,436,95,'#dceec4',16),I('messages-square',17,27,36,C.teal),T('Office: photo received',65,21,350,21),T('Job chat · new reply',65,57,350,17,'#54717a',{fontWeight:400})],{motion:enter(.9)})],{at:1.9,duration:6.1,motion:enter()})
   ],0)
  ]);
 }
 // 5. Record materials and variations while details are fresh.
 {
  scene(4,[...title('Materials + extras','Used it? Changed it?\nLog it on the job.'),
   feature('package','Materials + delivery notes','Description, supplier, quantity and proof.',100,405,1000,.1),
   feature('git-branch','Variations + PO numbers','Capture extra work before the details disappear.',100,544,1000,2),
   F(153,754,450,165,[R(0,0,450,165,'#cca16f',15),R(202,0,46,165,'#e9cda7',0),T('DELIVERY',40,36,370,26,C.ink),I('camera',41,90,43,C.ink)],{motion:enter(.3)}),
   worker(779,705,.62,7),
   phone([
    F(0,0,436,575,[T('Materials',0,0,436,34),...line('DESCRIPTION','Cable',66),...line('SUPPLIER / QUANTITY','Trade counter · 2 reels',151),appCard('Delivery-note photo','Attached to this job',251,106,'camera'),button('Save material',431),tap(218,459,1.6),toast('Material recorded',2.3)],{at:0,duration:3.4}),
    F(0,0,436,575,[T('Variation / extra',0,0,436,34),...line('ADDITIONAL WORK','Extra isolation work',70),...line('PURCHASE ORDER','PO-1048',178),appCard('Notes + evidence','Photo attached',290,104,'file-text'),button('Save variation',440),tap(218,469,1.7),toast('Extra work recorded',2.3)],{at:3.4,duration:3.6,motion:enter()})
   ],0)
  ]);
 }
 // 6. Completion proof, client signature and tap out.
 {
  scene(5,[...title('Finish the job','Proof. Signature.\nTap out. Done.'),
   F(100,406,502,384,[R(0,0,502,384,C.cream,25),R(22,22,458,262,'#cfdfd9',18),R(301,53,113,200,'#9eb8bb',7),R(321,70,73,156,C.ink,7),worker(47,69,.48,6),chip('Completion photo',60,304,382)],{motion:enter(.1)}),
   F(647,406,450,384,[R(0,0,450,384,C.cream,25),T('Client signature',27,25,390,30),F(25,127,400,110,[P('M 8 74 Q 60 15 71 62 Q 83 109 118 34 Q 96 95 144 67 Q 188 36 167 82 Q 210 97 226 51 Q 210 94 264 71 L 364 58',400,110,C.teal,5)],{reveal:{from:'left',at:1.2,duration:1.1}}),T('Signed on the phone',27,292,390,23,'#54717a',{fontWeight:400})],{motion:enter(.5)}),
   chip('Proof stays with the job',100,858,544),
   phone([T('Complete job',0,0,436,34),appCard('Completion photo','Attached',64,100,'camera'),F(0,188,436,146,[R(0,0,436,146,C.white,17),T('Client signature',18,18,390,23),F(19,61,393,72,[P('M 6 49 Q 50 6 64 39 Q 79 78 112 20 Q 100 65 150 43 Q 183 12 173 49 Q 216 63 237 30 L 343 37',393,72,C.teal,4)],{reveal:{from:'left',at:1.2,duration:.9}})]),button('GPS tap-out',393),tap(218,422,3.1),toast('Job completed',3.8),T('Tap-out reminder enabled',0,475,436,18,'#54717a',{align:'center',height:28})],0)
  ]);
 }
 // 7. A weekly timesheet assembled from actual job taps.
 {
  scene(6,[...title('Time, without the chase','Your week.\nAlready coming together.'),
   F(100,414,1000,385,[R(0,0,1000,385,C.cream,25),T('WEEKLY HOURS',27,25,900,24,C.teal,{letterSpacing:2}),...['MON','TUE','WED','THU','FRI'].map((s,j)=>F(29+j*190,101,180,127,[R(0,0,180,127,C.white,17),T(s,9,17,162,21,C.ink,{align:'center'}),T(['8.0','8.5','7.5','8.0','7.0'][j],9,61,162,39,C.teal,{align:'center'})],{motion:enter(.2+j*.2)})),T('Built from GPS travel and site taps.',29,273,940,28,C.ink,{fontWeight:400})],{motion:enter(.1)}),
   chip('No sandwich-receipt maths.',100,861,597),
   phone([T('Weekly timesheet',0,0,436,32),T('Travel + site hours',0,49,436,21,'#54717a',{fontWeight:400}),...['MON   8.0 hours','TUE    8.5 hours','WED   7.5 hours','THU   8.0 hours','FRI     7.0 hours'].map((s,j)=>F(0,96+j*58,436,48,[R(0,0,436,48,C.white,10),T(s,18,13,400,19)])),button('Submit week',415),tap(218,443,2.9),toast('Submitted for office approval',3.7)],2)
  ]);
 }
 // 8. Leave and certificates are also in the worker's pocket.
 {
  scene(7,[...title('Your own admin, too','Your time off.\nYour proof on site.'),
   feature('calendar','Leave requests + balance','Choose your dates and send a request.',100,414,1000,.1),
   feature('award','Training certificates','Ready to show on site, with expiry alerts.',100,556,1000,.8),
   worker(716,727,.55,5),chip('Less searching. More getting on.',100,874,577),
   phone([
    F(0,0,436,575,[T('My leave',0,0,436,34),R(0,69,436,124,'#dceec4',19),T('12 days',20,88,396,46,C.teal),T('Example available balance',20,149,396,18,C.ink,{fontWeight:400}),...line('REQUEST','Choose dates',238),button('Send leave request',411),tap(218,441,.8)],{at:0,duration:2.2}),
    F(0,0,436,575,[T('My certificates',0,0,436,31),appCard('Working at height','Certificate ready to show',73,115,'award'),appCard('First aid','Expiry alert · review due date',215,115,'bell',C.coral),F(0,361,436,143,[R(0,0,436,143,C.white,17),I('file-check-2',24,33,66,C.teal),T('Open certificate',119,45,296,24),T('On your phone',119,85,296,18,'#54717a',{fontWeight:400})])],{at:2.2,duration:2.8,motion:enter()})
   ],3)
  ]);
 }
 // 9. Optional vehicle checks and defect reporting.
 {
  scene(8,[...title('When enabled','Van check?\nSorted before the first call.'),
   chip('OPTIONAL FEATURES',100,396,413,C.coral),
   van(135,457,2.34,C.teal,{motion:enter(.1)}),worker(862,570,.64,5),
   feature('wrench','Check it. Photograph it. Report it.','Weekly checks and defects stay recorded.',100,849,1000,.3),
   phone([T('Van check',0,0,436,34),chip('When enabled',0,57,221,C.coral),...['Tyres','Lights','Visible damage'].map((s,j)=>F(0,130+j*66,436,55,[R(0,0,436,55,C.white,12),j!==1?check(15,12,30):I('circle-alert',17,14,28,C.coral),T(s,61,17,348,22)])),F(0,348,436,99,[R(0,0,436,99,'#f8e2d8',15),I('camera',17,25,39,C.ink),T('Rear light fault',73,17,347,23),T('Photo added to defect report',73,57,347,17,C.ink,{fontWeight:400})],{motion:enter(.9)}),button('Report defect',467),tap(218,496,2.8)],0)
  ]);
 }
 // 10. End card: one phone, a complete working day.
 {
  scene(9,[
   T('JOBS TRACKER MOBILE',100,161,1080,22,C.lime,{letterSpacing:2.5}),
   T('Your working day.\nIn your pocket.',92,221,1100,78,C.white,{height:218}),
   F(100,480,846,140,[R(0,0,846,140,C.white,25),media({file:logo,x:35,y:29,width:776,height:83,fit:'contain'})],{motion:enter(.2)}),
   chip('iPhone + Android',100,671,398),
   T('jobstracker.work',94,768,1110,62,C.white,{height:100}),
   T('Less back-and-forth. More work moving forward.',100,877,1065,29,C.muted,{fontWeight:400,height:80}),
   phone([T('Nice work, Sam.',0,0,436,35),T('Your day, under control.',0,52,436,22,'#54717a',{fontWeight:400}),...[['Job completed','Photos + signature saved'],['Week submitted','Ready for office review'],['Everything together','Jobs, time, leave and certificates']].map(([a,b],j)=>F(0,116+j*131,436,110,[R(0,0,436,110,C.white,17),check(16,25,36),T(a,70,20,349,23),T(b,70,62,349,17,'#54717a',{fontWeight:400})],{motion:enter(.5+j*.3)}))],0,{motion:enter(.15)})
  ]);
 }
 if(fs.existsSync(root+'/assets/soundtrack.wav')) {const a=await p.add(root+'/assets/soundtrack.wav');p.cut(a,{at:0,from:0,dur:60});}
 fs.writeFileSync(root+'/scene-timing-used.json',JSON.stringify(timing,null,2));
 if(process.env.QA==='1') for(let i=0;i<timing.length;i++) await p.frame(timing[i].at+timing[i].dur*.78,'renders/scene-'+String(i+1).padStart(2,'0')+'.png');
 if(process.env.RENDER==='1') await p.render('renders/native-master.mp4',{bitrate:3000000,concurrency:3,shards:6});
}
