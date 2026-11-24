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
const hero = 1;                         // foto untuk hero
const final = 28;                       // foto grup penutup
const featured = [[3,"Together, outside the classroom"],[29,"Classroom days"],[30,"Late night, good company"]];
const polaroids = [[22,"just us"],[24,"golden hour (night ver.)"],[34,"random but real"],[35,"after dark"],[2,"say cheese"],[26,"the chill ones"]];
const cats = {all:"All", campus:"Campus Days", class:"Classroom Stories", together:"Together", outside:"Outside Campus", random:"Random Moments", night:"Night Memories"};
/* ========================= */
const src = n => `${P}${String(n).padStart(2,"0")}.jpg`;
const $ = s => document.querySelector(s);
$("#heroBg").style.backgroundImage = `url(${src(hero)})`;
$("#endImg").src = src(final);
let current = photos.map(p=>p.n);
function open(n){ i = current.indexOf(n); if(i<0){current=[n];i=0} show(); $("#lb").classList.add("open") }
let i=0;
function show(){ const im=$("#lbImg"); im.style.opacity=0; setTimeout(()=>{im.src=src(current[i]);im.style.opacity=1},150) }
function step(d){ i=(i+d+current.length)%current.length; show() }
function renderGallery(cat){
  const list = photos.filter(p=>cat==="all"||p.cat.split(" ").includes(cat));
  current = list.map(p=>p.n);
  $("#gallery").innerHTML = list.map(p=>`<figure class="reveal" data-n="${p.n}"><img loading="lazy" src="${src(p.n)}" alt="Kenangan kuliah"></figure>`).join("");
  observe();
}
$("#filters").innerHTML = Object.entries(cats).map(([k,v])=>`<button data-c="${k}" class="${k==="all"?"on":""}">${v}</button>`).join("");
$("#filters").onclick = e => { const b=e.target.closest("button"); if(!b) return;
  document.querySelectorAll("#filters button").forEach(x=>x.classList.toggle("on",x===b)); renderGallery(b.dataset.c) };
$("#polaroids").innerHTML = polaroids.map(([n,t],k)=>`<div class="pol reveal" data-n="${n}" style="--r:${[-4,3,-2,4,-3,2][k%6]}deg"><img loading="lazy" src="${src(n)}" alt=""><span>${t}</span></div>`).join("");
$("#feat").innerHTML = featured.map(([n,t])=>`<figure class="reveal" data-n="${n}"><img loading="lazy" src="${src(n)}" alt=""><figcaption>${t}</figcaption></figure>`).join("");
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
addEventListener("scroll",()=>{ $("#heroBg").style.transform=`translateY(${scrollY*.25}px)` },{passive:true});
document.querySelectorAll(".links a").forEach(a=>a.onclick=()=>document.body.classList.remove("menu"));
renderGallery("all");
