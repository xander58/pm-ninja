
let current=0;
let favorites=JSON.parse(localStorage.getItem('favorites')||'[]');

function render(i){
current=i;
document.getElementById('question').textContent=questions[current];
document.getElementById('count').textContent=`${current+1}/${questions.length}`;
drawFavs();
}
function randomQ(){
render(Math.floor(Math.random()*questions.length));
}
function drawFavs(){
document.getElementById('favCount').textContent=`⭐ ${favorites.length}`;
document.getElementById('favorites').innerHTML=
favorites.slice(-10).map(f=>`<li>${f}</li>`).join('');
}
document.getElementById('randomBtn').onclick=randomQ;
document.getElementById('copyBtn').onclick=()=>navigator.clipboard.writeText(questions[current]);
document.getElementById('favBtn').onclick=()=>{
if(!favorites.includes(questions[current])){
favorites.push(questions[current]);
localStorage.setItem('favorites',JSON.stringify(favorites));
drawFavs();
}
};
document.getElementById('search').oninput=(e)=>{
const q=e.target.value.toLowerCase();
const idx=questions.findIndex(x=>x.toLowerCase().includes(q));
if(idx>=0) render(idx);
};
randomQ();
