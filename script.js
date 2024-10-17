function main(){
function updateDisplay(){
for (var x=0; x<grid.width;x++){
for (var y=0; y<grid.height;y++){
switch (grid.data[x][y].state){
 	case "wall": 
  document.getElementById(`${x};${y}`).style.backgroundColor="black";
  	break;
 case "red":
  document.getElementById(`${x};${y}`).style.backgroundColor="red";
  break;
  case "green":
  document.getElementById(`${x};${y}`).style.backgroundColor="green";
  break;
  case "path":
  document.getElementById(`${x};${y}`).style.backgroundColor="gray";
  break;
  
    }
    }
}
}
class GameLoop{
	async start(){
  	this.paused=false;
    var mouse=this.mouse
    while (this.paused){
    	mouse.checkCells();
      updateDisplay();
    }
  }
  stop(){
  this.paused=true;
  }
	constructor(grid, mouse){
  	this.paused=true;
  }
} 
function initHTML(width, height){
	var container=document.querySelector(".container");
  container.style["grid-template-rows"]=`repeat(${height}, 50px`;
  container.style["grid-template-columns"]=`repeat(${width}, 50px`;
  for (var i=0; i<height; i++){
  for (var o=0; o<width; o++){
 
  	let cell=document.createElement("div");
 
    cell.addEventListener("click",(e)=>{
    let x=e.target.id.split(";");
    let y=Number(x[1]);
    x=Number(x[0]);
    	grid.data[x][y].setState("path");
    })
    cell.classList.add("cell");
    cell.id=`${o};${i}`;
    cell.style.backgroundColor="black";
    container.appendChild(cell);
    }
  }
}

class Grid{
	constructor(width=10, height=10){
  	this.width=width;
    this.height=height;
    var data=[];
    
    for (var i=0; i<width; i++){
    	data[i]=[];
			for (var o=0; o<height;o++){
      data[i][o]=new Cell(i,o);
      }
    }
    this.data=data;
  }
}
class Cell{
state;
position;

constructor(x, y){
	this.position=[x, y];
  this.state="wall";
}

setState=(state)=>{
		this.state=state;
    updateDisplay();
    return true
  }
}

class Mouse extends Cell{
rotation=180;
html=document.querySelector(".mouse");
	constructor(){
  super();
  this.position=[ Math.floor((grid.width-1)/2),grid.height-1]; //[y, x]
  let position = this.position;
  this.html.id=`${position[0]};${position[1]}`; //[y,x]
  this.html.style.transform=`rotate(${this.rotation}deg)`;
  document.getElementById(`${position[0]};${position[1]}`).appendChild(this.html);
  grid.data[this.position[0]][this.position[1]]=this;
 
  }
  checkCells(){
  	let degreeTranslator=()=>{
    	return {
    	180: [0, 1],
      90: [1,0],
      270: [1,0],
      0: [0,-1]
    }[this.rotation]}
    this.rotate()
    let checkedCell= grid.data[this.position[0]+degreeTranslator()[0]][degreeTranslator()[1]+this.position[1]];
    while(checkedCell.state=="wall"){
    this.rotate(-90)
    checkedCell= grid.data[this.position[0]+degreeTranslator()[0]][degreeTranslator()[1]+this.position[1]];
    
    }
    	this.move(degreeTranslator())
    updateDisplay()
  }
  move(dx, dy){
  	let x = this.position[0]
    let y = this.position[1];
    
    if (x+dx>=grid.width||x+dx<0){
    	dx=0;
    }
    if (y+dy>=grid.height||y+dy<0){
    	dy=0;
    }
    this.position[0]=x+dx
    this.position[1]=y+dy
    
    this.moveHTML(dx, dy);
  }
  rotate(deg=90){
  this.rotation+=deg;
  	this.html.style.transform=`rotate(${this.rotation}deg)`;
    
  }
  moveHTML(dx, dy){
  var y=this.position[1];
  var x=this.position[0];
    document.getElementById(`${x};${y}`).appendChild(this.html)
   // .appendChild(this.html);
    
  }
}
	var grid=new Grid(10,10);
  initHTML(10,10)
  var mouse=new Mouse();
  var gameLoop=new GameLoop(grid, mouse)
  document.querySelector(".continue").addEventListener("click",()=>{   
  	mouse.checkCells()
    console.log(mouse.position)
  })
 //document.getElementById(`5;9`).style.backgroundColor="blue"
}

main();
