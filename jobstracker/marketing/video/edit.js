import fs from 'node:fs';
/** Native Higgsedit animation. Rebuild with: higgsedit build edit.js */
export default async function edit({project, text, rect, path, frame, media, icon}) {
  const root=process.env.JOBS_TRACKER_ROOT || '/home/user/jobstracker-production';
  const timing=fs.existsSync(root+'/assets/timing.json')?JSON.parse(fs.readFileSync(root+'/assets/timing.json','utf8')):[7,11,11,10,8,14,16,12,16,8,7].map((dur,i,a)=>({at:a.slice(0,i).reduce((s,x)=>s+x,0),dur}));
  const p=await project({dir:root+'/project',size:'1920x1080',fps:24,background:'#101c24'});
  const logo=await p.add(root+'/assets/logo.png');
  const C={navy:'#101c24',panel:'#1b303b',muted:'#9fb6b8',lime:'#c1f46e',teal:'#06aba7',cream:'#f4f1e8',paper:'#fffdf6',ink:'#133246',peach:'#efb99b',hair:'#503d35',coral:'#fa856e',red:'#a94f46',blue:'#afd7e6',white:'#ffffff'};
  const R=(x,y,w,h,c,r=0,o={})=>rect({x,y,width:w,height:h,fill:c,radius:r,...o});
  const T=(s,x,y,w,size=34,c=C.white,o={})=>text(s,{x,y,width:w,height:size*2.8,fontFamily:'Inter',fontSize:size,fontWeight:700,lineHeight:1.12,color:c,...o});
  const F=(x,y,w,h,kids,o={})=>frame({x,y,width:w,height:h,layout:'none',...o},kids.flat(Infinity).filter(Boolean));
  const P=(d,w,h,c,sw=0,fill=null,o={})=>path({d,width:w,height:h,...(fill?{fill}:{}),...(sw?{stroke:{color:c,width:sw,cap:'round'}}:{}),...o});
  const I=(name,x,y,size=48,c=C.teal,o={})=>icon(name,{x,y,size,color:c,strokeWidth:1.8,...o});
  const enter=(delay=0,dy=32)=>({enter:{from:{y:dy,opacity:0},duration:.55,at:delay,easing:'house'}});
  const pop=(delay=0)=>({enter:{from:{scale:.82,opacity:0},duration:.5,at:delay,easing:'house'}});
  const anim=(property,from,to,at,duration,easing='house')=>({property,from,to,at,duration,easing});
  const keys=(property,values)=>({property,keyframes:values.map(([at,value])=>({at,value,easing:'smooth'}))});
  const blink=(d)=>({property:'scaleY',keyframes:[{at:0,value:1},{at:Math.min(2.6,d*.35),value:1},{at:Math.min(2.7,d*.36),value:.1},{at:Math.min(2.85,d*.38),value:1}]});
  const label=(s,x,y,w=220,color=C.lime)=>F(x,y,w,44,[R(0,0,w,44,color,22),T(s,10,8,w-20,21,C.navy,{align:'center',height:30})]);
  function mug(x,y,hot=true,scale=1,opts={}) {
    const w=100*scale,h=115*scale;
    return F(x,y,w,h,[
      R(65*scale,40*scale,28*scale,34*scale,C.teal,12*scale),
      R(69*scale,47*scale,16*scale,20*scale,C.cream,8*scale),
      R(0,30*scale,73*scale,63*scale,hot?C.lime:C.blue,12*scale),
      R(6*scale,32*scale,61*scale,9*scale,C.hair,5*scale),
      ...[18,38,58].map((sx,i)=>F(sx*scale,0,10*scale,26*scale,[P('M 4 25 Q -2 16 5 10 Q 10 4 4 0',10,26,hot?'#c7d9d3':'#b7e7f1',3*scale)],{animate:[keys('offsetY',[[0,0],[1+i*.1,-7*scale],[2+i*.1,0]])]})),
      !hot&&P('M 12 83 L 23 114 L 34 83 M 44 85 L 52 106 L 62 85',75*scale,115*scale,C.blue,0,C.blue)
    ],opts);
  }
  function dave(x,y,scale=1,mood='calm',dur=8,opts={}) {
    const worried=mood==='worried', sip=mood==='sip';
    const face=[
      R(80,18,134,158,C.peach,52),
      P('M 79 78 C 40 15 92 -13 147 8 C 197 -14 232 20 213 71 L 185 50 Q 130 76 104 42 L 97 91 Z',240,115,C.hair,0,C.hair),
      R(65,83,24,41,C.peach,12),R(204,84,24,40,C.peach,12),
      R(92,89,46,37,'#f5d8bd',14),R(150,89,46,37,'#f5d8bd',14),
      P('M 92 97 Q 113 88 138 98 L 136 121 Q 111 133 93 119 Z M 150 98 Q 174 88 195 98 L 194 119 Q 175 132 151 120 Z M 138 103 L 151 103',240,175,C.ink,4),
      F(108,104,67,14,[R(0,0,8,10,C.ink,4),R(57,0,8,10,C.ink,4)],{animate:[blink(dur)]}),
      P(worried?'M 100 81 L 126 88 M 161 88 L 188 80':'M 100 84 Q 112 78 128 84 M 159 84 Q 175 78 189 84',240,175,C.hair,5),
      P('M 145 111 L 139 130 L 151 131',240,175,'#c78a72',3),
      P(worried?'M 123 151 Q 146 134 169 151':'M 122 142 Q 146 161 171 142',240,175,C.hair,4)
    ];
    return F(x,y,300*scale,520*scale,[
      F(0,0,300,520,[
        R(78,260,165,188,'#143443',45),R(96,408,34,68,C.ink,12),R(187,408,34,68,C.ink,12),
        R(69,467,68,24,C.hair,12),R(179,467,69,24,C.hair,12),
        R(120,152,45,50,C.peach,14),
        P('M 77 197 Q 145 168 214 198 L 231 336 Q 157 368 67 336 Z',300,520,C.teal,0,C.teal),
        P('M 121 182 L 144 211 L 165 182 L 178 192 L 145 229 L 110 195 Z',300,520,C.cream,0,C.cream),
        F(35,206,100,160,[
          P('M 52 9 Q 25 27 18 89 L 74 125',110,150,C.teal,33),
          R(62,106,48,24,C.peach,12)
        ],{animate:worried?[keys('rotation',[[0,0],[dur*.3,-8],[dur*.6,6],[dur*.9,0]])]:[]}),
        F(196,204,110,175,[
          P('M 4 10 Q 42 13 47 69 L 8 110',110,175,C.teal,32),
          R(0,94,49,25,C.peach,12),
          sip?mug(-20,44,true,.65):null
        ],{animate:sip?[keys('offsetY',[[0,0],[dur*.55,0],[dur*.72,-118],[dur*.85,-118],[dur*.97,0]]),keys('offsetX',[[0,0],[dur*.55,0],[dur*.72,-43],[dur*.85,-43],[dur*.97,0]])]:[]}),
        F(0,0,240,180,face,{animate:worried?[keys('rotation',[[0,-3],[dur*.35,4],[dur*.6,-4],[dur*.85,1]])]:[keys('offsetY',[[0,0],[dur*.5,-4],[dur,0]])]})
      ],{animate:[anim('scale',scale,scale,0,dur)]})
    ],opts);
  }
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
  function clock(x,y,late=false,opts={}) {
    return F(x,y,120,120,[R(0,0,120,120,C.paper,60),R(7,7,106,106,C.cream,53),P(late?'M 60 23 L 60 60 L 35 78':'M 60 25 L 60 60 L 88 60',120,120,C.ink,5),R(55,55,10,10,C.teal,5)],opts);
  }
  function office(x,y,scale=1,mood='calm',dur=8,opts={}) {
    return F(x,y,870*scale,620*scale,[F(0,0,870,620,[
      R(0,0,870,620,C.cream,70),R(60,83,215,226,'#c6dedb',18),R(78,101,83,188,'#e2f0e6',4),R(174,101,83,188,'#e2f0e6',4),
      P('M 78 245 L 109 191 L 132 216 L 161 161 L 161 289 L 78 289 Z',275,310,'#a1c8bc',0,'#a1c8bc'),
      R(643,124,109,12,'#bfceb9',6),R(673,66,15,58,C.teal,4),R(694,82,15,42,C.coral,4),R(716,75,16,49,C.ink,4),
      clock(690,175,mood==='sip'),R(56,530,772,3,'#d7dbcc',1),
      R(291,245,145,185,'#a4b4af',30),R(347,411,22,106,C.ink,5),R(299,510,121,13,C.ink,6),
      dave(253,95,.88,mood,dur),
      R(146,397,584,26,C.hair,9),R(179,422,18,119,C.hair,7),R(674,422,18,119,C.hair,7),
      R(466,262,160,118,C.ink,11),R(478,274,136,91,mood==='worried'?'#f2b8a7':'#c5e7df',6),
      R(533,377,23,19,C.ink,3),R(503,391,85,7,C.ink,3),
      P('M 498 296 L 591 296 M 498 312 L 568 312 M 498 329 L 584 329 M 498 345 L 541 345',626,380,mood==='worried'?C.red:C.teal,6),
      mood!=='sip'?mug(226,306,mood!=='worried',.83):null,
      R(737,442,62,83,'#b6c3b0',14),
      P('M 768 446 Q 705 376 738 341 Q 780 352 768 446 M 769 440 Q 821 366 798 348 Q 764 366 769 440',870,620,C.teal,0,C.teal)
    ],{animate:[anim('scale',scale,scale,0,1)]})],opts);
  }
  function card(small,title,x,y,w=370,h=145,accent=C.coral,delay=0) {
    return F(x,y,w,h,[R(0,0,w,h,C.paper,20),R(0,0,9,h,accent,4),T(small,28,20,w-48,20,accent,{letterSpacing:1.5,height:28}),T(title,28,57,w-48,32,C.ink,{height:h-62})],{motion:enter(delay)});
  }
  function check(x,y,delay=0,size=46) {
    return F(x,y,size,size,[R(0,0,size,size,C.lime,size/2),P('M 11 24 L 21 33 L 36 15',46,46,C.ink,4)],{motion:pop(delay)});
  }
  function stageTitle(kicker,title,sub=null,color=C.lime) {
    return [T(kicker.toUpperCase(),100,117,1690,22,color,{letterSpacing:3,height:32}),
      T(title,94,175,1730,70,C.white,{height:170}),
      sub?T(sub,100,273,1650,28,C.muted,{fontWeight:400,height:80}):null];
  }
  function scene(i,nodes,bg=C.navy) {
    const s=timing[i];
    p.compose(F(0,0,1920,1080,[
      R(0,0,1920,1080,bg),
      R(0,1018,1920,62,bg),
      ...nodes.flat(Infinity).filter(Boolean),
      R(100,49,258,49,C.white,10),media({file:logo,x:111,y:57,width:235,height:33,fit:'contain'}),
      T('OFFICE + FIELD, ONE SYSTEM',1275,64,545,18,C.muted,{align:'right',letterSpacing:2,height:28}),
      T('jobstracker.work',100,1033,550,18,C.muted,{fontWeight:400,height:28}),
      T(String(i+1).padStart(2,'0')+' / 11',1630,1033,190,18,C.muted,{align:'right',fontWeight:400,height:28}),
      R(0,1074,1920,6,'#29414b'),
      R(0,1074,1920,6,C.lime,0,{animate:[anim('scaleX',s.at/120,(s.at+s.dur)/120,0,s.dur,'linear')]})
    ]),{at:s.at,dur:s.dur,name:'Scene '+(i+1)});
  }
  // 01: Character introduction and the recurring tea gag.
  {
    const d=timing[0].dur;
    scene(0,[
      T('A DAY IN THE LIFE',100,201,780,22,C.lime,{letterSpacing:3}),
      T('Meet Dave.',91,268,900,112,C.white,{height:160,motion:{by:'word',from:{opacity:0,y:30},duration:.5,overlap:.4}}),
      T('Busy office.\nVery patient tea.',100,425,740,46,C.muted,{fontWeight:400,height:170}),
      label('OFFICE MANAGER',100,649,260),
      office(887,244,1,'calm',d,{motion:enter(.3)}),
      F(1070,174,430,75,[R(0,0,430,75,C.coral,26),I('phone',22,21,34,C.navy),T('RING. RING. RING.',75,24,340,25,C.navy)],{at:d*.65,duration:d*.35,motion:pop()})
    ]);
  }
  // 02: Notification escalation. Papers fly in while Dave tries to keep up.
  {
    const d=timing[1].dur;
    const papers=Array.from({length:9},(_,j)=>F(920+(j%3)*245,390+Math.floor(j/3)*142,226,128,[
      R(0,0,226,128,j%3===0?'#ffd4ba':C.paper,10),R(22,24,130,8,'#b6c8c7',4),R(22,45,178,7,'#b6c8c7',3),R(22,65,151,7,'#b6c8c7',3),T(j%2?'CALL BACK':'NEW ENQUIRY',22,88,184,16,C.ink)
    ],{motion:{enter:{from:{x:650,y:-180,opacity:0},duration:.6,at:1+j*.37,easing:'house'}},animate:[keys('rotation',[[0,0],[d*.6,(j%2?1:-1)*3],[d,0]])]}));
    scene(1,[...stageTitle('08:01 AM','Everything is urgent.','Especially the “quick” ones.',C.coral),
      office(95,390,.84,'worried',d),
      ...papers,
      card('MESSAGE 01','URGENT',1020,352,490,116,C.coral,5.5),
      card('MESSAGE 02','VERY URGENT',1080,525,490,116,C.coral,6.4),
      card('MESSAGE 03','“Just a quick one…”',1140,698,565,130,C.coral,7.9),
      F(679,395,147,147,[R(0,0,147,147,C.coral,74),I('phone',39,38,70,C.navy)],{at:d*.4,duration:d*.6,animate:[keys('rotation',[[0,-6],[.2,6],[.4,-6],[.6,6],[.8,0]])],motion:pop()})
    ]);
  }
  // 03: Three very familiar questions, then the empty-box reveal.
  {
    const d=timing[2].dur;
    scene(2,[...stageTitle('THE DAILY MYSTERY','Anyone know…?',null,C.coral),
      F(100,355,540,575,[
        R(0,0,540,575,'#e9e9df',34),T('Where’s the van?',30,34,480,34,C.ink),
        P('M 34 156 L 480 450 M 35 420 L 470 180 M 110 106 L 110 505 M 392 106 L 392 505',540,575,'#d2dbce',20),
        van(88,234,.95,C.teal,{animate:[keys('offsetX',[[0,-30],[d*.35,35],[d*.65,65],[d,0]])]}),
        F(322,132,112,112,[R(0,0,112,112,C.coral,56),T('?',0,9,112,77,C.navy,{align:'center'})],{motion:pop(.7)})
      ],{motion:enter(.2)}),
      F(690,355,540,575,[
        R(0,0,540,575,'#e9e9df',34),T('What changed on site?',30,34,480,34,C.ink),
        worker(60,136,.8,d),card('SITE UPDATE','Extra work found',222,171,280,124,C.teal,1.8),
        ...['Missed call','Any update?','Photo somewhere…'].map((s,j)=>F(208,304+j*57,306,49,[R(0,0,306,49,j===2?'#b7c7c5':C.paper,12),T(s,17,11,275,21,C.ink)],{motion:enter(3+j*.3,8)}))
      ],{motion:enter(.45)}),
      F(1280,355,540,575,[
        R(0,0,540,575,'#e9e9df',34),T('Who ordered the part?',25,34,490,34,C.ink),
        R(100,283,339,191,'#cfa777',12),
        P('M 100 283 L 270 215 L 439 283 L 270 351 Z',540,575,'#e5c49e',0,'#e5c49e'),
        P('M 100 283 L 45 202 L 211 148 L 270 215 Z M 270 215 L 329 148 L 495 202 L 439 283 Z',540,575,'#e5c49e',0,'#e5c49e'),
        T('“Someone else.”',60,119,420,31,C.ink,{align:'center'}),
        F(244,245,44,21,[R(0,0,44,21,C.paper,10)],{at:d*.66,duration:d*.34,animate:[keys('offsetY',[[0,15],[.9,-75],[1.8,-8]])]}),
        T('Nobody.',70,493,400,42,C.red,{align:'center',at:d*.74,duration:d*.26,motion:{by:'word',from:{opacity:0,y:12},duration:.3}})
      ],{motion:enter(.7)})
    ]);
  }
  // 04: Timesheet treasure hunt; hold the receipt gag.
  {
    const d=timing[3].dur;
    scene(3,[...stageTitle('FRIDAY AFTERNOON','The timesheet treasure hunt.',null,C.coral),
      office(100,395,.8,'worried',d),
      card('ONE TEXT','“Think it was 8 hours?”',920,360,725,120,C.teal,.7),
      F(1000,525,370,300,[
        R(0,0,370,300,C.paper,14),T('Spreadsheet_v7_FINAL',22,19,327,21,C.ink),
        ...Array.from({length:5},(_,j)=>R(22,65+j*40,326,2,'#c6d3cc')),
        ...[22,125,231,348].map(x=>R(x,65,2,200,'#c6d3cc')),
        ...['MON','TUE','WED'].map((day,k)=>T(day,31+k*103,80,93,18,C.ink,{align:'center'})),...['8','?','8'].map((hr,k)=>T(hr,31+k*103,131,93,23,C.ink,{align:'center'}))
      ],{motion:{enter:{from:{x:300,rotation:12,opacity:0},duration:.7,at:2.1}}}),
      F(1443,490,275,413,[
        R(0,0,275,413,'#fff9dc',9),T('LUNCH STOP',20,31,235,25,C.ink,{align:'center'}),
        T('1 x sandwich\n1 x tea\n\nTOTAL  £6.40',30,98,219,24,C.ink,{fontFamily:'JetBrains Mono',fontWeight:400,height:200}),
        R(25,293,225,2,C.ink),T('HOURS WORKED: ?',18,326,242,22,C.red,{align:'center'})
      ],{motion:{enter:{from:{y:-320,opacity:0},duration:.7,at:6.5}},animate:[keys('rotation',[[0,0],[d*.7,5],[d,3]])]}),
      F(697,640,145,190,[
        R(0,0,113,113,C.blue,57),R(12,12,89,89,'#e6f3ed',45),R(88,90,31,92,C.hair,14),
        T('?',24,23,66,62,C.ink,{align:'center'})
      ],{motion:enter(7.0)})
    ],'#27272c');
  }
  // 05: The reveal. Four worlds join the same record.
  {
    const d=timing[4].dur;
    scene(4,[...stageTitle('A BETTER WORKING DAY','Office + field. One system.'),
      P('M 330 650 L 690 650 L 960 530 L 1230 650 L 1590 650',1920,1080,C.teal,6),
      ...[330,690,1230,1590].map((x,j)=>F(x-82,576,164,164,[
        R(0,0,164,164,j===1?C.lime:C.panel,82),I(['building-2','clipboard-check','hard-hat','truck'][j],43,43,78,j===1?C.ink:C.teal)
      ],{motion:pop(.3+j*.25)})),
      ...[['OFFICE',330],['JOBS',690],['ENGINEERS',1230],['VANS',1590]].map(([s,x])=>T(s,x-180,782,360,23,C.white,{align:'center',letterSpacing:2})),
      F(589,378,742,141,[R(0,0,742,141,C.white,26),media({file:logo,x:39,y:29,width:664,height:82,fit:'contain'})],{motion:pop(.2)}),
      ...Array.from({length:5},(_,j)=>R(328,644,14,14,C.lime,7,{at:1+j*.28,duration:d-1-j*.28,animate:[keys('offsetX',[[0,0],[2.0,1260],[d-1-j*.28,1260]])]})),
      T('From the first enquiry to the final sign-off.',340,886,1240,35,C.muted,{fontWeight:400,align:'center'})
    ]);
  }
  // 06: Enquiry-to-job workflow, then connected job chat.
  {
    const d=timing[5].dur;
    scene(5,[...stageTitle('ENQUIRIES + COMMUNICATION','Less re-keying. More clarity.'),
      ...[['ENQUIRY','New enquiry','mail'],['QUOTE','Ready to send','file-text'],['JOB','Assigned to the team','clipboard-check']].map(([a,b,ic],j)=>F(100+j*595,347,530,181,[
        R(0,0,530,181,j===2?C.lime:C.paper,22),I(ic,27,37,57,C.teal),T(a,111,28,380,21,C.teal,{letterSpacing:2}),T(b,111,74,387,31,C.ink),
        j<2?I('arrow-right',548,66,38,C.lime):null
      ],{motion:enter(.5+j*1.2)})),
      F(445,602,1030,327,[
        R(0,0,1030,327,C.cream,25),R(0,0,1030,66,'#d7e6da',25),T('JOB 1048  /  WESTGATE HOUSE',29,21,900,22,C.ink),
        F(26,91,717,79,[R(0,0,717,79,C.white,16),T('OFFICE',20,10,170,17,C.teal),T('Can you send a photo of the extra work?',20,37,675,23,C.ink)],{motion:enter(d*.35,14)}),
        F(263,194,739,91,[R(0,0,739,91,'#d9efb9',16),T('SITE TEAM',20,11,650,17,C.teal),T('Photo attached. Variation recorded on the job.',20,43,695,23,C.ink)],{motion:enter(d*.6,14)})
      ],{motion:enter(3.1)}),
      dave(102,586,.6,'calm',d),worker(1577,574,.7,d),
      T('The conversation stays with the job.',445,950,1030,24,C.muted,{align:'center',fontWeight:400})
    ]);
  }
  // 07: A photo from the site becomes a visible variation and materials record.
  {
    const d=timing[6].dur;
    scene(6,[...stageTitle('PHOTOS + VARIATIONS + MATERIALS','See the site. Capture the detail.'),
      F(136,349,458,628,[
        R(0,0,458,628,C.ink,42),R(18,18,422,592,C.cream,28),R(157,24,144,19,C.ink,9),
        T('WESTGATE HOUSE',43,74,370,22,C.ink),
        R(43,123,372,328,'#cee1de',15),
        R(245,172,124,242,'#a3babe',4),R(265,191,84,187,C.ink,6),R(272,198,70,173,'#d5ded9',3),
        worker(47,189,.51,d),P('M 290 231 L 290 319 L 321 319',458,628,C.teal,8),
        I('camera',186,486,72,C.teal),T('PHOTO CAPTURED',67,572,330,18,C.teal,{align:'center'})
      ],{motion:enter(.3)}),
      I('arrow-right',650,568,70,C.lime,{at:1.5,duration:d-1.5,animate:[keys('offsetX',[[0,-12],[1,12],[2,-12],[3,12],[d-1.5,12]])]}),
      F(784,349,1030,628,[
        R(0,0,1030,628,C.cream,28),T('JOB 1048  /  WESTGATE HOUSE',35,31,950,25,C.ink),
        R(35,86,960,2,'#d2d9ce'),
        ...[['camera','Site photos','Uploaded from the engineer’s phone'],['git-branch','Variation recorded','Extra work attached to the job'],['package','Materials + purchase orders','Parts and PO numbers in the same record']].map(([ic,a,b],j)=>F(35,115+j*153,960,133,[
          R(0,0,960,133,C.white,17),I(ic,28,34,55,C.teal),T(a,111,24,745,29,C.ink),T(b,111,73,745,23,'#506f77',{fontWeight:400}),
          check(874,43,0,46)
        ],{motion:enter(1.8+j*2.5)}))
      ],{motion:enter(1.1)}),
      T('Illustrated product workflow',1470,993,344,15,C.muted,{align:'right',fontWeight:400,height:20})
    ]);
  }
  // 08: Live map with animated vans and job markers.
  {
    const d=timing[7].dur;
    scene(7,[...stageTitle('FLEET + LIVE TRACKING','The vans are on the map.','Dave’s detective career is over.'),
      F(100,371,1720,595,[
        R(0,0,1720,595,'#e6eadf',32),
        ...[[100,45,330,120],[630,45,400,115],[1230,45,340,120],[140,295,340,220],[744,319,312,190],[1300,316,274,220]].map(([x,y,w,h])=>R(x,y,w,h,'#cddbc8',20)),
        P('M 0 233 L 1720 233 M 540 0 L 540 595 M 1150 0 L 1150 595 M 0 560 L 1720 45',1720,595,C.paper,27),
        P('M 222 233 L 540 233 L 540 421 L 955 421 L 1150 233 L 1500 233',1720,595,C.teal,6),
        van(135,137,.54,C.teal,{animate:[keys('offsetX',[[0,0],[d*.35,300],[d*.6,300],[d*.85,580],[d,670]]),keys('offsetY',[[0,0],[d*.35,0],[d*.6,170],[d,170]])]}),
        van(1250,150,.52,'#e99673',{animate:[keys('offsetX',[[0,200],[d*.4,-120],[d*.8,-120],[d,-290]])]}),
        ...[[540,228,'WESTGATE HOUSE'],[1150,230,'RIVERSIDE WORKS'],[961,421,'DEPOT']].map(([x,y,s],j)=>F(x-44,y-70,88,88,[R(0,0,88,88,C.teal,44),I(j===2?'building-2':'map-pin',23,22,43,C.white)],{motion:pop(.6+j*.3)})),
        label('WESTGATE HOUSE',390,350,300),label('RIVERSIDE WORKS',1110,113,304),
        F(31,31,302,85,[R(0,0,302,85,C.paper,16),R(19,27,16,16,C.teal,8),T('LIVE FLEET VIEW',51,24,230,20,C.ink)],{motion:enter(.3)}),
        F(1111,470,574,88,[R(0,0,574,88,C.navy,17),T('Works with your existing trackers',23,28,530,24,C.white,{fontWeight:400})],{motion:enter(2.8)})
      ],{motion:enter(.2)})
    ]);
  }
  // 09: Hours assemble from GPS events, approval remains explicit.
  {
    const d=timing[8].dur;
    scene(8,[...stageTitle('TIMESHEETS + PAYROLL','Friday just got less interesting.','Dave is delighted.'),
      F(100,371,500,595,[
        R(0,0,500,595,C.panel,28),T('GPS TAP-IN / TAP-OUT',28,32,450,23,C.lime),
        ...[['MON','08:00','16:30'],['TUE','08:15','16:45'],['WED','08:00','16:30']].map(([day,a,b],j)=>F(26,106+j*143,448,113,[
          R(0,0,448,113,C.cream,16),T(day,20,18,100,22,C.ink),I('map-pin',20,57,28,C.teal),T(a,70,56,110,25,C.ink,{fontWeight:600}),I('arrow-right',183,57,26,C.teal),T(b,235,56,140,25,C.ink,{fontWeight:600})
        ],{motion:enter(.6+j*.7)}))
      ],{motion:enter(.2)}),
      I('arrow-right',632,589,60,C.lime),
      F(737,371,1083,595,[
        R(0,0,1083,595,C.cream,28),T('WEEKLY TIMESHEET',35,32,800,25,C.ink),
        R(35,92,1013,52,'#dae7d1',8),T('ENGINEER',57,107,400,20,C.ink),...['MON','TUE','WED','THU','FRI'].map((day,k)=>T(day,480+k*106,107,100,20,C.ink,{align:'center'})),
        ...[['A. Williams','8.5      8.5      8.5      8.0      8.0'],['S. Patel','8.0      8.5      8.0      8.0      8.5'],['J. Hughes','8.5      8.0      8.5      8.5      8.0']].map(([name,hrs],j)=>F(35,166+j*75,1013,62,[
          R(0,0,1013,62,C.white,10),T(name,23,18,380,23,C.ink,{fontWeight:600}),...hrs.trim().split(/\s+/).map((hour,k)=>T(hour,445+k*106,19,100,21,C.ink,{fontWeight:400,align:'center'}))
        ],{motion:enter(2+j*.85,14)})),
        F(35,429,1013,120,[
          R(0,0,1013,120,C.lime,18),check(20,32,0,46),T('REVIEWED + APPROVED',86,24,820,25,C.ink),
          T('Ready to export to Sage or Xero',86,67,820,24,C.ink,{fontWeight:400})
        ],{at:d*.32,duration:d*.68,motion:pop()})
      ],{motion:enter(.6)}),
      T('Illustrative hours. Review and approval remain in your control.',738,990,1080,17,C.muted,{fontWeight:400,height:25})
    ]);
  }
  // 10: Return to the office. Finally, hot tea.
  {
    const d=timing[9].dur;
    scene(9,[
      T('THE END OF A BETTER DAY',100,201,830,22,C.lime,{letterSpacing:3}),
      T('More time\nback.',94,272,825,100,C.white,{height:250}),
      T('Less chasing. Less retyping.\nA life after work.',100,540,770,37,C.muted,{fontWeight:400,height:130}),
      label('AND THE TEA? HOT.',100,735,340),
      office(887,244,1,'sip',d,{motion:enter(.3)}),
      F(1120,811,560,80,[R(0,0,560,80,C.lime,30),T('Home on time. Imagine that.',20,23,520,27,C.ink,{align:'center'})],{at:d*.7,duration:d*.3,motion:pop()})
    ]);
  }
  // 11: Legible seven-second end card.
  {
    const d=timing[10].dur;
    scene(10,[
      F(510,224,900,180,[R(0,0,900,180,C.white,30),media({file:logo,x:48,y:39,width:804,height:102,fit:'contain'})],{motion:enter(.15)}),
      T('From dispatch to done.',220,465,1480,66,C.white,{align:'center',height:100}),
      T('Your office. Your team. Your day, under control.',260,568,1400,31,C.muted,{align:'center',fontWeight:400}),
      F(675,675,570,108,[R(0,0,570,108,C.lime,54),T('Book your demo',20,29,530,37,C.navy,{align:'center'}),I('arrow-up-right',478,37,37,C.navy)],{motion:pop(.5)}),
      T('jobstracker.work',260,832,1400,57,C.white,{align:'center',height:100}),
      T('A product of Workwiz Ltd',260,940,1400,19,C.muted,{align:'center',fontWeight:400,height:30})
    ]);
  }
  // The editable native project includes the complete voice/music/effects master.
  if(fs.existsSync(root+'/assets/soundtrack.wav')) {
    const soundtrack=await p.add(root+'/assets/soundtrack.wav');
    p.cut(soundtrack,{at:0,from:0,dur:120});
  }
  fs.writeFileSync(root+'/scene-timing-used.json',JSON.stringify(timing,null,2));
  if(process.env.QA==='1') {
    for(let i=0;i<timing.length;i++) await p.frame(timing[i].at+Math.min(timing[i].dur*.76,timing[i].dur-0.2),'renders/scene-'+String(i+1).padStart(2,'0')+'.png');
  }
  if(process.env.RENDER==='1') await p.render('renders/visual-master.mp4',{bitrate:3000000,concurrency:3,shards:12});
}
