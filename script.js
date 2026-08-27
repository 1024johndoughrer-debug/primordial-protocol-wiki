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
