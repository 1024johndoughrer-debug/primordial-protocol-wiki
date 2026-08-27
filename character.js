const data={
"Fighter":{role:"SURVIVOR / FIGHTER",status:"ACTIVE",threat:"MODERATE",origin:"SECTOR 04",image:"assets/fighter.webp",summary:"A combat-capable survivor who refuses to become another name in the incident reports.",bio:"The Fighter was recovered from Sector 04 carrying equipment normally reserved for emergency response teams. Unlike most survivors, they chose to confront hostile entities rather than simply evade them. Their past remains partially sealed.",abilities:[{type:'PASSIVE',name:'Adrenaline Surge'},{type:'ABILITY',name:'Last Stand'}],note:"RUNNING only works until something faster finds you. So I learned to fight."},
"Unknown":{role:"KILLER / UNKNOWN",status:"UNKNOWN",threat:"CRITICAL",origin:"[NO RECORD]",image:"assets/unknown.webp",summary:"An unidentified organism whose name, origin, and purpose remain completely unknown.",bio:"No matching specimen exists in the official database. Witness descriptions are inconsistent, but every surviving report mentions the same unnerving behavior: it watches before it attacks.",abilities:[{type:'PASSIVE',name:'Something Is Watching'},{type:'ABILITY',name:'False Face'}],note:"There is no designation because there was never supposed to be anything alive down there."},
"Experiment 142":{role:"KILLER / EXPERIMENT",status:"ESCAPED",threat:"CRITICAL",origin:"EXPERIMENTAL WING",image:"assets/experiment142.webp",summary:"Experiment 142 was created inside the Protocol's experimental wing. It was not the first attempt. It was the first one that escaped.",bio:"The original purpose of Experiment 142 has been heavily redacted. Containment records show repeated failures followed by an abrupt loss of all laboratory personnel. The creature's red-orange ocular glow became the primary visual identifier in later recovery reports.",abilities:[{type:'PASSIVE',name:'Adaptive Mutation'},{type:'ABILITY',name:'Neural Collapse'}],note:"142 IS NOT A NUMBER. IT IS A WARNING. — handwritten note recovered from the laboratory"},
"The Abyss":{role:"KILLER / ENTITY",status:"UNKNOWN",threat:"CRITICAL",origin:"BELOW SECTOR 04",image:"assets/abyss.webp",summary:"A shadowed entity associated with the disappearance of the lower-level teams.",bio:"There is no confirmed birth record, specimen record, or original designation. The name 'Abyss' first appears in handwritten notes recovered after Incident 0047. Every attempt to map its origin has ended with corrupted data.",abilities:[{type:'PASSIVE',name:'Void Presence'},{type:'ABILITY',name:'Abyssal Grasp'}],note:"DO NOT RESPOND TO VOICES FROM BELOW. THEY ARE NOT YOUR TEAM."},
"Redacted 1":{role:"REDACTED / RECORD",status:"ACTIVE",threat:"UNKNOWN",origin:"[REDACTED]",summary:"A complete personnel file replaced with black bars. The subject remains listed as active.",bio:"Every identifying field has been overwritten. The original recording contains footsteps approaching the camera, followed by a single frame of static. No further information was recovered.",abilities:[{type:"PASSIVE",name:"[REDACTED]"},{type:"ABILITY",name:"[REDACTED]"}],note:"IDENTITY WITHHELD BY ORDER OF THE PROTOCOL."},
"Redacted 2":{role:"REDACTED / RECORD",status:"UNKNOWN",threat:"CRITICAL",origin:"[REDACTED]",summary:"Biometric data is null. The archive cannot determine whether this subject is human.",bio:"The record was recovered from a damaged terminal. Every field except the threat marker was erased. The threat marker reads CRITICAL.",abilities:[{type:"PASSIVE",name:"[REDACTED]"},{type:"ABILITY",name:"[REDACTED]"}],note:"DO NOT RESTORE THE ORIGINAL NAME."},
"Redacted 3":{role:"REDACTED / RECORD",status:"MISSING",threat:"CRITICAL",origin:"SECTOR [REDACTED]",summary:"Witnesses remember the subject. The system remembers only a blank record.",bio:"Three witnesses independently described the same silhouette. Their statements were sealed before investigators could compare them.",abilities:[{type:"PASSIVE",name:"[REDACTED]"},{type:"ABILITY",name:"[REDACTED]"}],note:"THE CAMERA REMEMBERS WHAT THE DATABASE DOES NOT."},
"Redacted 4":{role:"REDACTED / RECORD",status:"UNKNOWN",threat:"UNKNOWN",origin:"[REDACTED]",summary:"A live tape with no visible subject and a timestamp that moves backward.",bio:"The file remains one of the Protocol's strangest surviving artifacts. Audio is present, but all speech is replaced by low-frequency interference.",abilities:[{type:"PASSIVE",name:"[REDACTED]"},{type:"ABILITY",name:"[REDACTED]"}],note:"ARCHIVE ENTRY: [REDACTED]."},
"Slasher":{role:"KILLER / ACTIVE",status:"ACTIVE",threat:"EXTREME",origin:"UNLISTED FACILITY",image:"assets/slasher.webp",summary:"A silent, heavily built entity recovered from a corrupted tape. The subject designation SLASHER is the only surviving name.",bio:"Slasher appears in footage without a confirmed entry point. The body is unusually dense, the face is almost completely swallowed by shadow, and two bright points of light remain visible where the eyes should be. A torn red appendage or growth is visible behind the subject in every recovered frame. The archive has no verified explanation for it.",abilities:[{type:'PASSIVE',name:'Relentless Pursuit'},{type:'ABILITY',name:'Meat Hook'}],note:"BY HELL. — final phrase found on the last surviving frame before the camera feed failed."}
};
const params=new URLSearchParams(location.search);
const key=params.get("name")||"Unknown";
const d=data[key]||data.Unknown;
document.title=d.role+" — "+key+" — Primordial Protocol";
for(const [id,val] of Object.entries({name:key,role:d.role,status:d.status,threat:d.threat,origin:d.origin,summary:d.summary,bio:d.bio,note:d.note})) document.getElementById(id).textContent=val;
document.getElementById("recordId").textContent="PP-"+String(key.replace(/\s/g,"").length*137).padStart(4,"0");
const portrait=document.getElementById("portrait");
const portraitImage=document.getElementById("portraitImage");
if(d.image){ portraitImage.src=d.image; portraitImage.alt=key+" portrait"; portrait.classList.add("has-image"); }
else { portraitImage.src="assets/unknown.webp"; portraitImage.alt="Redacted record"; portrait.classList.add("redacted-image"); }
const abilityIcon="assets/ability-placeholder.png";
document.getElementById("abilities").innerHTML=d.abilities.map(x=>`<li><img src="${abilityIcon}" alt=""><div><small class="ability-type">${x.type}</small><span>${x.name}</span></div></li>`).join("");

// Enhanced image viewer + broken-image recovery.
(function(){
  const portrait=document.getElementById("portraitImage");
  const portraitBox=document.getElementById("portrait");
  const abilityIcon="assets/ability-placeholder.png";
  const abilityList=document.getElementById("abilities");
  if(portrait){
    portrait.onerror=()=>{ portrait.onerror=null; portrait.src="assets/unknown.webp"; portrait.alt="Recovered image unavailable"; portraitBox.classList.add("image-error"); };
    portrait.addEventListener("click",()=>window.openImageViewer?.(portrait.src, portrait.alt));
  }
  abilityList?.querySelectorAll("img").forEach((img,i)=>{
    img.onerror=()=>{img.onerror=null;img.src=abilityIcon};
    img.addEventListener("click",()=>window.openImageViewer?.(img.src, "Ability record "+String(i+1).padStart(2,"0")));
  });
})();
