/* ===== EDIT DI SINI =====
   Semua foto diatur di daftar ini. Tambah/hapus baris, ganti nama file, atau ubah kategori.
   cat: campus | class | together | outside | night | random   */
const P = "assets/images/photo-";
const photos = [
  {n:1, cat:"outside together"}, {n:2, cat:"outside together"}, {n:3, cat:"outside together"},
  {n:4, cat:"outside together"}, {n:5, cat:"class campus"}, {n:8, cat:"night"},
  {n:10,cat:"class campus"}, {n:12,cat:"class campus"}, {n:14,cat:"class campus"},
  {n:16,cat:"outside"}, {n:18,cat:"class campus"}, {n:20,cat:"class campus"},
  {n:22,cat:"random together"}, {n:24,cat:"night together"}, {n:26,cat:"night together"},
  {n:30,cat:"night together"}, {n:32,cat:"night"}, {n:34,cat:"random"},
  {n:35,cat:"night random"}, {n:37,cat:"night random"}, {n:7,cat:"class campus"}, {n:29,cat:"class campus"}
];
const polaroids = [22,24,34,35,2,26,16,30,32,4];   // foto scrapbook (tanpa caption)
const cats = {all:"All", campus:"Campus Days", class:"Classroom Stories", together:"Together", outside:"Outside Campus", random:"Random Moments", night:"Night Memories"};
/* ========================= */
const src = n => `${P}${String(n).padStart(2,"0")}.jpg`;
const $ = s => document.querySelector(s);
let current = photos.map(p=>p.n);
function open(n){ i = current.indexOf(n); if(i<0){current=[n];i=0} show(); $("#lb").classList.add("open") }
let i=0;
function show(){ const im=$("#lbImg"); im.style.opacity=0; setTimeout(()=>{im.src=src(current[i]);im.style.opacity=1},150) }
function step(d){ i=(i+d+current.length)%current.length; show() }
function renderGallery(cat){
  const list = photos.filter(p=>cat==="all"||p.cat.split(" ").includes(cat));
  current = list.map(p=>p.n);
  $("#gallery").innerHTML = list.map((p,k)=>`<figure class="reveal img" data-n="${p.n}" style="transition-delay:${(k%3)*.1}s"><img loading="lazy" src="${src(p.n)}" alt="Kenangan kuliah"></figure>`).join("");
  observe();
}
$("#filters").innerHTML = Object.entries(cats).map(([k,v])=>`<button data-c="${k}" class="${k==="all"?"on":""}">${v}</button>`).join("");
$("#filters").onclick = e => { const b=e.target.closest("button"); if(!b) return;
  document.querySelectorAll("#filters button").forEach(x=>x.classList.toggle("on",x===b)); renderGallery(b.dataset.c) };
const rots=[-4,3,-2,4,-3,2,-5,3.5,-2.5,4.5], kinds=["","tall","wide","","tall"];
$("#polaroids").innerHTML = polaroids.map((n,k)=>`<div class="pol ${kinds[k%5]} reveal stag" data-n="${n}" style="--r:${rots[k%10]}deg;--d:${(k%4)*.12}s"><img loading="lazy" src="${src(n)}" alt=""></div>`).join("");
const strip = photos.map(p=>`<img loading="lazy" src="${src(p.n)}" alt="">`).join("");
$("#track").innerHTML = strip+strip;
function floaters(el,n,chars){ for(let k=0;k<n;k++){ const s=document.createElement("span"); s.className="fl"; s.textContent=chars[k%chars.length];
  s.style.cssText=`left:${Math.random()*100}%;font-size:${14+Math.random()*26}px;animation-duration:${10+Math.random()*14}s;animation-delay:-${Math.random()*20}s`; el.appendChild(s) } }
floaters($("#heroFloat"),16,["✶","♡","✦","·","★"]); floaters($("#endFloat"),10,["♡","✦","✶"]);
$(".hero-text").insertAdjacentHTML("beforeend",'<span class="scroll-hint">↓</span>');
const glow=$("#glow");
addEventListener("mousemove",e=>{glow.style.opacity=1;glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px"});
document.addEventListener("mousemove",e=>{ const f=e.target.closest&&e.target.closest(".masonry figure"); if(!f) return;
  const r=f.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
  f.style.transform=`perspective(700px) rotateY(${x*7}deg) rotateX(${-y*7}deg) scale(1.02)` });
document.addEventListener("mouseout",e=>{ const f=e.target.closest&&e.target.closest(".masonry figure"); if(f) f.style.transform="" });
document.addEventListener("click", e => { const f=e.target.closest("[data-n]"); if(f) open(+f.dataset.n) });
$(".x").onclick = () => $("#lb").classList.remove("open");
$(".pv").onclick = () => step(-1); $(".nx").onclick = () => step(1);
$("#lb").onclick = e => { if(e.target.id==="lb") $("#lb").classList.remove("open") };
document.addEventListener("keydown", e => { if(!$("#lb").classList.contains("open")) return;
  if(e.key==="Escape") $("#lb").classList.remove("open"); if(e.key==="ArrowLeft") step(-1); if(e.key==="ArrowRight") step(1) });
let sx=0; $("#lb").addEventListener("touchstart",e=>sx=e.touches[0].clientX);
$("#lb").addEventListener("touchend",e=>{const d=e.changedTouches[0].clientX-sx; if(Math.abs(d)>50) step(d>0?-1:1)});
const io = new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.12});
function observe(){ document.querySelectorAll(".reveal:not(.in)").forEach(el=>io.observe(el)) }
addEventListener("scroll",()=>{ $("#heroBg").style.transform=`translateY(${scrollY*.25}px)`;
  $("#progress").style.width=(scrollY/(document.body.scrollHeight-innerHeight)*100)+"%" },{passive:true});
document.querySelectorAll(".links a").forEach(a=>a.onclick=()=>document.body.classList.remove("menu"));
renderGallery("all");
