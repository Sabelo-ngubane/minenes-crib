(function(){
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
function tilt(el,tg,ry,rx){el.addEventListener('pointermove',function(e){var b=el.getBoundingClientRect(),x=(e.clientX-b.left)/b.width-.5,y=(e.clientY-b.top)/b.height-.5;tg.style.transform='rotateY('+x*ry+'deg) rotateX('+(-y*rx)+'deg)'});el.addEventListener('pointerleave',function(){tg.style.transform=''})}
tilt(document.getElementById('scene'),document.getElementById('tilt'),26,16);
tilt(document.getElementById('bedpic'),document.getElementById('bedpic').firstElementChild,18,12);
document.querySelectorAll('.pk').forEach(function(c){tilt(c,c.firstElementChild,14,10)});
/* portal */
var P=[['Newborn portraits','images/newborn.jpg','#baby'],['Maternity shoots','images/mat2.jpg','#maternity'],['Milestone sessions','images/mile.jpg','#baby'],['Baby photoshoots','images/piano.jpg','#baby'],['Baby bedding','images/bedset.jpg','#bedding']],N=P.length,pbox=document.getElementById('photos'),els=[];
P.forEach(function(p){var a=document.createElement('a');a.className='at ph';a.href=p[2];a.setAttribute('aria-label',p[0]+': jump to this section');a.innerHTML='<img src="'+p[1]+'" alt=""><span>'+p[0]+'</span>';pbox.appendChild(a);els.push(a)});
var tr=document.getElementById('services'),t1=document.getElementById('t1'),t2=document.getElementById('t2'),pin=tr.querySelector('.pin');
var G=[[255,243,207],[242,201,135],[184,121,62]];
var C=[[[255,240,220],[232,201,160],[166,124,82]],[[243,220,230],[201,155,180],[123,74,107]],[[255,224,236],[245,158,192],[201,72,127]],[[255,244,201],[247,194,90],[217,130,43]],[[255,230,238],[234,165,186],[155,122,138]]];
function upd(){
  var r=tr.getBoundingClientRect(),p=Math.max(0,Math.min(1,-r.top/(r.height-innerHeight))),ws=0,acc=[0,0,0,0,0,0,0,0,0];
  els.forEach(function(el,i){
    var t=(p*(N+1.2)-i*.9)/2.2+.28;
    if(t<=0||t>=1){el.style.opacity=0;el.style.visibility='hidden';return}
    el.style.visibility='visible';
    var w=Math.max(0,1-Math.abs(t-.42)/.55);ws+=w;
    for(var k=0;k<3;k++)for(var m=0;m<3;m++)acc[k*3+m]+=C[i][k][m]*w;
    var dir=i%2?-1:1,q=Math.max(0,(t-.5)/.5),z=t<.5?-1400+t*2800:300*q,x=dir*Math.sin(q*3)*60,y=t<.5?(t-.5)*30:-Math.pow(q,1.6)*innerHeight*.95,op=Math.min(1,t/.08)*(t<.7?1:Math.max(0,(1-t)/.3));
    el.style.transform='translate3d('+x+'px,'+y+'px,'+z+'px) translate(-50%,-50%) rotateY('+(-dir*18*q)+'deg) rotateZ('+(dir*10*q)+'deg)';
    el.style.opacity=op;el.style.pointerEvents=(t>.52&&op>.35)?'auto':'none';
  });
  var g=Math.max(0,1-ws),tot=ws+g;
  function mix(k){var o=[];for(var m=0;m<3;m++)o.push(Math.round((acc[k*3+m]+G[k][m]*g)/tot));return o}
  var a=mix(0),b=mix(1),c=mix(2);
  pin.style.setProperty('--c0','rgb('+a+')');pin.style.setProperty('--c1','rgb('+b+')');pin.style.setProperty('--c2','rgba('+c+',.33)');pin.style.setProperty('--glow','rgba('+b+',.5)');
  pin.style.setProperty('--wallc','rgb('+[Math.round(16+(b[0]-16)*.1),Math.round(32+(b[1]-32)*.1),Math.round(26+(b[2]-26)*.1)]+')');
  t1.style.opacity=p<.84?1:0;t2.style.opacity=p>.87?1:0;
}
addEventListener('scroll',upd,{passive:true});addEventListener('resize',upd);upd();
/* christmas dates */
var D=[[2026,9,24],[2026,10,7],[2026,10,21],[2026,10,28],[2026,11,5],[2026,11,12]],M=['January','February','March','April','May','June','July','August','September','October','November','December'];
var now=new Date(),t0=new Date(now.getFullYear(),now.getMonth(),now.getDate()),nx=-1,box=document.getElementById('dates');
D.forEach(function(d,i){if(nx<0&&new Date(d[0],d[1],d[2])>=t0)nx=i});
D.forEach(function(d,i){if(nx>=0&&i<nx)return;var s=document.createElement('span');s.textContent=d[2]+' '+M[d[1]];if(i===nx)s.className='next';box.appendChild(s)});
var cd=document.getElementById('cd');
if(nx>=0){var dd=Math.round((new Date(D[nx][0],D[nx][1],D[nx][2])-t0)/864e5);cd.textContent=dd===0?'next session is today':'next session in '+dd+(dd===1?' day':' days')}
else{cd.textContent='sessions have ended';box.innerHTML='<p style="margin:0;color:#5d6b60">This year’s Christmas sessions have ended. Follow us for next year’s dates.</p>';var rb=document.querySelector('.rib');if(rb)rb.textContent='BOOKINGS CLOSED';var bt=document.querySelector('.xmas .btn');if(bt)bt.style.display='none'}

/* gold dust */
try{
var cv=document.getElementById('dust'),r=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:false}),sc=new THREE.Scene(),cam=new THREE.PerspectiveCamera(60,1,.1,100);cam.position.z=10;
var tc=document.createElement('canvas');tc.width=tc.height=64;var x=tc.getContext('2d'),g=x.createRadialGradient(32,32,0,32,32,32);g.addColorStop(0,'rgba(255,236,180,1)');g.addColorStop(.3,'rgba(240,200,110,.5)');g.addColorStop(1,'rgba(240,200,110,0)');x.fillStyle=g;x.fillRect(0,0,64,64);
var n=innerWidth<700?90:200,p=new Float32Array(n*3),sp=[];
for(var i=0;i<n;i++){p[i*3]=(Math.random()-.5)*26;p[i*3+1]=(Math.random()-.5)*16;p[i*3+2]=(Math.random()-.5)*14;sp.push(.004+Math.random()*.012)}
var geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(p,3));
var pts=new THREE.Points(geo,new THREE.PointsMaterial({size:.55,map:new THREE.CanvasTexture(tc),transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,opacity:.75}));sc.add(pts);var hc=document.createElement('canvas');hc.width=hc.height=96;var hx=hc.getContext('2d'),hg=hx.createRadialGradient(48,50,4,48,50,46);hg.addColorStop(0,'rgba(255,214,228,.95)');hg.addColorStop(.45,'rgba(246,140,176,.55)');hg.addColorStop(1,'rgba(246,140,176,0)');hx.fillStyle=hg;hx.beginPath();hx.moveTo(48,76);hx.bezierCurveTo(8,50,14,16,48,32);hx.bezierCurveTo(82,16,88,50,48,76);hx.fill();var hn=innerWidth<700?14:30,hp=new Float32Array(hn*3),hs=[];for(var j=0;j<hn;j++){hp[j*3]=(Math.random()-.5)*24;hp[j*3+1]=(Math.random()-.5)*16;hp[j*3+2]=(Math.random()-.5)*10;hs.push(.003+Math.random()*.008)}var hgeo=new THREE.BufferGeometry();hgeo.setAttribute('position',new THREE.BufferAttribute(hp,3));var hmat=new THREE.PointsMaterial({size:1.1,map:new THREE.CanvasTexture(hc),transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,opacity:.55});sc.add(new THREE.Points(hgeo,hmat));var hc=document.createElement('canvas');hc.width=hc.height=96;var hx=hc.getContext('2d'),hg=hx.createRadialGradient(48,50,4,48,50,46);hg.addColorStop(0,'rgba(255,214,228,.95)');hg.addColorStop(.45,'rgba(246,140,176,.55)');hg.addColorStop(1,'rgba(246,140,176,0)');hx.fillStyle=hg;hx.beginPath();hx.moveTo(48,76);hx.bezierCurveTo(8,50,14,16,48,32);hx.bezierCurveTo(82,16,88,50,48,76);hx.fill();var hn=innerWidth<700?14:30,hp=new Float32Array(hn*3),hs=[];for(var j=0;j<hn;j++){hp[j*3]=(Math.random()-.5)*24;hp[j*3+1]=(Math.random()-.5)*16;hp[j*3+2]=(Math.random()-.5)*10;hs.push(.003+Math.random()*.008)}var hgeo=new THREE.BufferGeometry();hgeo.setAttribute('position',new THREE.BufferAttribute(hp,3));var hmat=new THREE.PointsMaterial({size:1.1,map:new THREE.CanvasTexture(hc),transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,opacity:.55});sc.add(new THREE.Points(hgeo,hmat));
function rs(){r.setPixelRatio(Math.min(devicePixelRatio,1.5));r.setSize(innerWidth,innerHeight,false);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix()}
addEventListener('resize',rs);rs();var mx=0;addEventListener('pointermove',function(e){mx=e.clientX/innerWidth-.5});
(function lp(){requestAnimationFrame(lp);if(!reduce)for(var i=0;i<n;i++){p[i*3+1]+=sp[i];p[i*3]+=Math.sin(Date.now()*.0004+i)*.002;if(p[i*3+1]>8)p[i*3+1]=-8}
geo.attributes.position.needsUpdate=true;cam.position.y=-scrollY*.004;cam.position.x=mx*1.5;r.render(sc,cam)})();
}catch(e){}
})();

/* bedding showcase */
(function(){
var car=document.getElementById('bcar'),frame=document.querySelector('.bframe'),slides=car.children,rows=document.querySelectorAll('.brow'),dots=document.querySelectorAll('#bdots button'),cur=-1;
function seen(el){var r=el.getBoundingClientRect();return r.top>=70&&r.bottom<=innerHeight-70}
function show(el){if(!seen(el))el.scrollIntoView({behavior:'smooth',block:'center'})}
for(var k=0;k<slides.length;k++){var cap=slides[k].querySelector('figcaption'),pr=rows[k]&&rows[k].querySelector('b');if(cap&&pr)cap.textContent=cap.textContent+' · '+pr.textContent}
function mark(i){if(i===cur)return;cur=i;rows.forEach(function(r,k){r.classList.toggle('on',k===i)});dots.forEach(function(d,k){d.classList.toggle('on',k===i)})}
function go(i){i=(i+slides.length)%slides.length;car.scrollTo({left:i*car.clientWidth,behavior:'smooth'});mark(i)}
car.addEventListener('scroll',function(){mark(Math.round(car.scrollLeft/car.clientWidth))},{passive:true});
rows.forEach(function(r,k){r.addEventListener('click',function(){go(k);show(frame)})});
Array.prototype.forEach.call(slides,function(s,k){s.addEventListener('click',function(){mark(k);show(rows[k])})});
dots.forEach(function(d,k){d.addEventListener('click',function(){go(k)})});
document.getElementById('bprev').addEventListener('click',function(){go(cur-1)});
document.getElementById('bnext').addEventListener('click',function(){go(cur+1)});
mark(0);
})();