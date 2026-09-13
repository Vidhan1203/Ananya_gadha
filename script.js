/* ================================
   EDIT THESE SETTINGS
   ================================

   1) MEMORY PHOTO ORDER
   photo-01.jpg = 1, photo-02.jpg = 2, etc.
   Change the numbers below to change which photo appears on each memory page.

   2) PUZZLE CORRECT SEQUENCE
   Change the numbers below to choose the correct 1 → 5 puzzle order.
   Example: [3,1,5,2,4] means puzzle-03, puzzle-01, puzzle-05, puzzle-02, puzzle-04.

   You only need to edit the two arrays below.
*/
const memoryPhotoOrder = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  21, 22, 23, 24, 25
];

const puzzleCorrectSequence = [1, 2, 3, 4, 5];

const PHOTOS = Array.from({length:25}, (_,i)=>`photos/photo-${String(i+1).padStart(2,"0")}.jpg`)
  .concat(Array.from({length:5}, (_,i)=>`photos/puzzle-${String(i+1).padStart(2,"0")}.jpg`));

const memoryOrder = memoryPhotoOrder.map(n => n - 1);
const puzzleOrder = puzzleCorrectSequence.map(n => 24 + n);

function hideAll(){
  document.querySelectorAll(".page").forEach(x=>x.classList.remove("active"));
  document.querySelectorAll(".memory").forEach(x=>x.classList.remove("active"));
}
function renderMemories(){
  memoryOrder.forEach((photoIndex,pageIndex)=>{
    const img=document.getElementById("memimg"+pageIndex);
    if(img) img.src=PHOTOS[photoIndex];
  });
  document.getElementById("finalPhoto").src=PHOTOS[memoryOrder[24]];
}
function startMemories(){
  renderMemories(); hideAll();
  document.querySelector('.memory[data-page="0"]').classList.add("active"); window.scrollTo(0,0);
}
function nextMemory(i){
  if(i<24){
    document.querySelector('.memory[data-page="'+i+'"]').classList.remove("active");
    document.querySelector('.memory[data-page="'+(i+1)+'"]').classList.add("active");
  } else {
    hideAll(); document.getElementById("puzzle").classList.add("active"); buildPuzzle();
  }
  window.scrollTo(0,0);
}

let puzzleCards=[];
let puzzleSelected=null;
function buildPuzzle(){
  const grid=document.getElementById("puzzleGrid"); if(!grid)return;
  grid.innerHTML="";
  const shuffled=[...puzzleOrder].sort(()=>Math.random()-.5);
  puzzleCards=[];
  shuffled.forEach((photoIndex,n)=>{
    const c=document.createElement("button");c.className="puzzle-card";c.draggable=true;c.dataset.photo=photoIndex;
    c.innerHTML='<img src="'+PHOTOS[photoIndex]+'"><b>'+(n+1)+'</b>';
    c.addEventListener("dragstart",e=>e.dataTransfer.setData("photo",photoIndex));
    c.addEventListener("dragover",e=>e.preventDefault());
    c.addEventListener("drop",e=>{e.preventDefault();const from=Number(e.dataTransfer.getData("photo"));const to=Number(c.dataset.photo);swapPuzzleCards(from,to);});
    c.addEventListener("click",()=>{
      if(puzzleSelected===null){puzzleSelected=photoIndex;c.classList.add("selected");}
      else if(puzzleSelected!==photoIndex){swapPuzzleCards(puzzleSelected,photoIndex);puzzleSelected=null;}
      else {puzzleSelected=null;c.classList.remove("selected");}
    });
    grid.appendChild(c);puzzleCards.push(c);
  });
  document.querySelectorAll(".slot").forEach(s=>{s.innerHTML=(Number(s.dataset.pos)+1);delete s.dataset.photo;});
}
function swapPuzzleCards(a,b){
  const A=puzzleCards.find(x=>Number(x.dataset.photo)===a),B=puzzleCards.find(x=>Number(x.dataset.photo)===b);
  if(A&&B){const marker=document.createElement("span");A.parentNode.insertBefore(marker,A);B.parentNode.insertBefore(A,B);A.parentNode.insertBefore(B,marker);marker.remove();}
}
let slots=[...document.querySelectorAll(".slot")];
slots.forEach(s=>{
  s.addEventListener("dragover",e=>e.preventDefault());
  s.addEventListener("drop",e=>{
    e.preventDefault();const photo=Number(e.dataTransfer.getData("photo"));const card=puzzleCards.find(c=>Number(c.dataset.photo)===photo);
    if(card&&!s.dataset.photo){s.dataset.photo=photo;s.innerHTML='<img src="'+PHOTOS[photo]+'">';card.classList.add("hidden");}
  });
});
function submitPuzzle(){
  const order=slots.map(s=>Number(s.dataset.photo));
  const ok=order.length===5&&order.every((x,i)=>x===puzzleOrder[i]);
  hideAll();document.getElementById(ok?"correct":"wrong").classList.add("active");window.scrollTo(0,0);
}
function resetPuzzle(){hideAll();document.getElementById("puzzle").classList.add("active");buildPuzzle();window.scrollTo(0,0);}
function showFinal(){renderMemories();hideAll();document.getElementById("final").classList.add("active");window.scrollTo(0,0);}

renderMemories();
buildPuzzle();
