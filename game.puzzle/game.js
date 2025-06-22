const board = document.getElementById('board');
const reset = document.getElementById('reset');

let rows = 3; 
let columns = 3;
let turn = 0;
let currentTile;
let otherTile;

let imageOrderInit =["3","1","6","8","2","4","7","5","blank"];
let ImageOrder = [...imageOrderInit];



// for initialize board

 function initBoard(){
board.innerHTML = '';
ImageOrder = [...imageOrderInit];

shuffle(ImageOrder)


    for(let r=0; r<rows; r++){
          for(let c=0; c<columns; c++){
 //create element 
let tile = document.createElement('img');
tile.id = r + '-' + c;
tile.src = ImageOrder.shift() + ".jpg";
board.appendChild(tile);

    // drag function 
    tile.addEventListener('dragstart', dragStart);
    tile.addEventListener('dragover', dragOver);
    tile.addEventListener('dragenter', dragEnter);
    tile.addEventListener('dragleave', dragLeave);
    tile.addEventListener('drop', dragDrop);
    tile.addEventListener('dragend', dragEnd);
     
      }
                                                                                                                  
    }
  
}
//define shuffle function for randomize value after every time reset 
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}


//onload function
 window.onload =function(){
   initBoard();
 };
  function dragStart (){
    if(!this.src.includes("blank")){
        currentTile = this;
    }
}
 function dragOver(e){
    e.preventDefault();
}
 function dragEnter(e){
    e.preventDefault();
}
 function dragLeave(e){
   e.preventDefault()
}
 function dragDrop(){
   if(this.src.includes("blank")){
    otherTile = this;
   }
}
 function dragEnd(){
if (!currentTile || !otherTile ) return;

let currCoords = currentTile.id.split("-").map(Number);
let otherCoords = otherTile.id.split("-").map(Number);// NOTE 
// → "2-1" (a string)

// .split("-")
// → ["2", "1"] (an array of strings)

// .map(Number)
// → [2, 1] (converts each string to a number)


let rowDiff = Math.abs(currCoords[0] - otherCoords[0]);
let colDiff = Math.abs(currCoords[1] - otherCoords[1]);
 
//Math.abs(...) ensures the result is always positive (since the difference could be negative depending on drag direction).


// only allow if tiles are adjacent
if((rowDiff ===1 && colDiff === 0) || (rowDiff === 0 && colDiff == 1)){
    let tempSrc = currentTile.src;
    currentTile.src = otherTile.src;
    otherTile.src = tempSrc;

    turn += 1;
  document.getElementById("span").innerHTML = turn;

checkWin();

 currentTile = null;
 otherTile = null;
}


// win conditional function
function checkWin() {
  let tiles = document.querySelectorAll('#board img');
  let currentOrder = Array.from(tiles).map(tile => {
    return tile.src.includes("blank") ? "blank" : tile.src.split("/").pop().replace(".jpg", "");
  });

  const winningOrder = ["1", "2", "3", "4", "5", "6", "7", "8", "blank"];

  if (currentOrder.join() === winningOrder.join()) {
    setTimeout(() => {
      alert("😍 You Win!");
    }, 150); // slight delay to allow final image swap to render
  }
}


// reset board
reset.addEventListener('click',()=>{
  turn = 0 ;
  currentTile = null;
  otherTile = null;
  document.getElementById('span').innerHTML = turn;
  initBoard();

     }
  )

}


