function updateVhsClock(){const el=document.getElementById("vhsClock");if(!el)return;const now=new Date();el.textContent=[now.getHours(),now.getMinutes(),now.getSeconds()].map(v=>String(v).padStart(2,"0")).join(":");}
updateVhsClock();setInterval(updateVhsClock,1000);

// Archive breach sequence + interactive telemetry
const breach=document.getElementById('breach-screen');
const enter=document.getElementById('enter-archive');
if(breach){setTimeout(()=>{document.title='PROTOCOL BREACHED // Primordial Protocol';},100); enter?.addEventListener('click',()=>{breach.classList.add('hidden');sessionStorage.setItem('pp_breach_seen','1');}); if(sessionStorage.getItem('pp_breach_seen')==='1') breach.classList.add('hidden');}
const panic=document.getElementById('panicMode');
panic?.addEventListener('click',()=>{document.body.classList.toggle('panic-mode');panic.textContent=document.body.classList.contains('panic-mode')?'NORMAL FEED':'PANIC FEED';});
const incident=document.getElementById('incidentCount');
if(incident){let n=47;setInterval(()=>{if(Math.random()>.82){n++;incident.textContent=String(n).padStart(3,'0')}},3200)}
