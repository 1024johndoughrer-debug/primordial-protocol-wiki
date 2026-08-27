function updateVhsClock(){
  const el=document.getElementById("vhsClock");
  if(!el)return;
  const now=new Date();
  el.textContent=[now.getHours(),now.getMinutes(),now.getSeconds()].map(v=>String(v).padStart(2,"0")).join(":");
}
updateVhsClock();setInterval(updateVhsClock,1000);

const breach=document.getElementById("breach-screen");
const enter=document.getElementById("enter-archive");
if(breach){
  setTimeout(()=>{document.title="PROTOCOL BREACHED // Primordial Protocol";},100);
  enter?.addEventListener("click",()=>{
    breach.classList.add("hidden");
    sessionStorage.setItem("pp_breach_seen","1");
  });
  if(sessionStorage.getItem("pp_breach_seen")==="1") breach.classList.add("hidden");
}
const panic=document.getElementById("panicMode");
panic?.addEventListener("click",()=>{
  document.body.classList.toggle("panic-mode");
  panic.textContent=document.body.classList.contains("panic-mode")?"NORMAL FEED":"PANIC FEED";
});
const incident=document.getElementById("incidentCount");
if(incident){
  let n=47;
  setInterval(()=>{if(Math.random()>.82){n++;incident.textContent=String(n).padStart(3,"0")}},3200);
}

// Self-contained image hydration: fixes deployments where the assets folder is not served.
(function(){
  const images=window.PP_IMAGES||{};
  document.querySelectorAll('img[data-image-key]').forEach(img=>{
    const key=img.dataset.imageKey;
    if(images[key]) img.src=images[key];
  });
})();

// Universal image recovery + horror image viewer.
(function(){
  const lightbox=document.getElementById("imageLightbox");
  const lightboxImg=document.getElementById("lightboxImage");
  const caption=document.getElementById("lightboxCaption");
  const close=document.getElementById("lightboxClose");

  window.openImageViewer=function(src,alt){
    if(!lightbox||!src)return;
    lightboxImg.src=src;
    lightboxImg.alt=alt||"Recovered image";
    caption.textContent=(alt||"RECOVERED IMAGE")+" // CLICK OUTSIDE TO CLOSE";
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden","false");
    document.body.classList.add("viewer-open");
  };
  function closeViewer(){
    lightbox?.classList.remove("open");
    lightbox?.setAttribute("aria-hidden","true");
    document.body.classList.remove("viewer-open");
    if(lightboxImg) lightboxImg.removeAttribute("src");
  }
  close?.addEventListener("click",closeViewer);
  lightbox?.addEventListener("click",e=>{if(e.target===lightbox)closeViewer()});
  document.addEventListener("keydown",e=>{if(e.key==="Escape")closeViewer()});

  document.querySelectorAll("img").forEach(img=>{
    img.addEventListener("error",()=>{
      img.classList.add("image-missing");
      if(img.dataset.fallback && img.src!==new URL(img.dataset.fallback,location.href).href){
        img.src=img.dataset.fallback;
      }
    });
    if(img.classList.contains("portrait-image") || img.closest(".big-portrait")){
      img.addEventListener("click",()=>openImageViewer(img.currentSrc||img.src,img.alt));
      img.setAttribute("tabindex","0");
      img.setAttribute("role","button");
      img.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" ")openImageViewer(img.currentSrc||img.src,img.alt)});
    }
  });
})();

/* =========================================================
   PROTOCOL // FX ENGINE
   Lightweight procedural UI effects: scanner, cursor, tilt, glitch metadata
   ========================================================= */
(function protocolFX(){
  const reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce)return;

  // Inject surveillance HUD geometry without requiring HTML edits on every page.
  ['tl','tr','bl','br'].forEach(pos=>{const el=document.createElement('div');el.className='protocol-corner '+pos;el.setAttribute('aria-hidden','true');document.body.appendChild(el);});
  const beam=document.createElement('div');beam.className='protocol-scanbeam';beam.setAttribute('aria-hidden','true');document.body.appendChild(beam);

  // Desktop tracking reticle.
  if(window.matchMedia('(pointer:fine)').matches){
    const cursor=document.createElement('div');cursor.className='protocol-cursor';cursor.setAttribute('aria-hidden','true');document.body.appendChild(cursor);
    let tx=innerWidth/2,ty=innerHeight/2,cx=tx,cy=ty;
    addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY;});
    const tick=()=>{cx+=(tx-cx)*.18;cy+=(ty-cy)*.18;cursor.style.left=cx+'px';cursor.style.top=cy+'px';requestAnimationFrame(tick)};tick();
    document.querySelectorAll('a,button,.card,.story-card,.ability-list li,.portrait-image,.big-portrait').forEach(el=>{
      el.addEventListener('mouseenter',()=>document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave',()=>document.body.classList.remove('cursor-hover'));
    });
  }

  // Micro tilt on cards for a holographic-console feel.
  document.querySelectorAll('.card,.story-card,.classified-card').forEach(card=>{
    card.addEventListener('pointermove',e=>{
      const r=card.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
      card.style.transform=`translateY(-6px) rotateX(${(-y*2.2).toFixed(2)}deg) rotateY(${(x*2.6).toFixed(2)}deg)`;
    });
    card.addEventListener('pointerleave',()=>{card.style.transform='';});
  });

  // Add glitch metadata to major titles for the CSS pseudo-channel.
  document.querySelectorAll('.hero h1,.story-page h1,.file-hero h1').forEach(h=>h.setAttribute('data-glitch',h.textContent));

  // Random tiny signal corruption keeps the interface feeling alive.
  const huds=document.querySelectorAll('.vhs-hud,.logo-status');
  setInterval(()=>{
    if(Math.random()<.22){
      huds.forEach(h=>h.style.transform=`translateX(${Math.floor(Math.random()*5)-2}px)`);
      setTimeout(()=>huds.forEach(h=>h.style.transform=''),90);
    }
  },1400);
})();
