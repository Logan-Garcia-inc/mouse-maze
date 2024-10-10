
function initHTML(width, height){
	var container=document.querySelector(".container");
  container.style["grid-template-rows"]=`repeat(${height}, 50px`;
  container.style["grid-template-columns"]=`repeat(${width}, 50px`;
  for (var i=0; i<height; i++){
  for (var o=0; o<width; o++){
  	var cell=document.createElement("div");
    cell.classList.add("cell");
    cell.id=`${i};${o}`;
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
    
    for (var i=0; i<height; i++){
    	data[i]=[];
			for (var o=0; o<width;o++){
      data[i][o]=new Cell(i,o);
      }
    }
    this.data=data;
    createMouse();
    update
  }
  createMouse(x=this.height-1,y=Math.floor((this.width-1)/2)){
  	this.data[x][y]=new Mouse([x,y])
  }
  updateDisplay(){
  var color;
  	for (var i=0; i<this.height; i++){
		for (var o=0; o<this.width;o++){
      switch (this.data[i][o]){
      case ("wall"):
      color="black";
      case ("red"):
     color="red";
     default:
     break
      }
      }
    }
  }
}
class Cell{
state="wall";
mouse=false;
constructor(x, y){
	this.position=[x, y];
}
	changeState(state){
  let y=this.position[0];
  let x=this.position[1];
  	switch (state){
 	case "wall": 
  this.state="wall"
  document.getElementById(`#${x};${y}`).style.backgroundColor="black";
  	break;
 case "red":
 	this.state="red";
  document.getElementById(`${x};${y}`).style.backgroundColor="red";
  break;
  case "green":
  this.state="green";
  document.getElementById(`${x};${y}`).style.backgroundColor="green";
  break;
  case "path":
  this.state="path";
  document.getElementById(`${x};${y}`).style.backgroundColor="gray";
  break;
  default:
  return false;
  
    }
  }
}

class Mouse extends Cell{
rotation=180;
html=document.querySelector(".mouse");
	constructor(startingPos){
  super();
  this.mouse=true;
  this.position=startingPos //[y, x]
  let position = this.position;
  this.html.id=`${position[0]};${position[1]}`; //[y,x]
  document.getElementById(`${position[0]};${position[1]}`).appendChild(this.html);
 
  }
  checkCells(){
    //console.log(this.position[0]+degreeTranslator[this.rotation]);
    console.log(grid.data[this.position[1]+degreeTranslator[this.rotation/2]][this.position[0]+degreeTranslator[this.rotation]]);
  }
  move(dx, dy){
  	let y = this.position[0]
    let x = this.position[1];
    
    if (x+dx>=grid.width-1){
    	dx=grid.width-x;
    }
    if (y+dy>=grid.height-1){
    	dy=grid.height-y;
    }
    this.pos=[x,y]
    this.moveHTML(dy, dx);
  }
  rotate(deg){
  	this.html.style.transform=`rotate(${deg}deg)`;
    this.rotation=deg;
  }
  moveHTML(dy, dx){
  var y=this.position[1];
  var x=this.position[0];
    document.getElementById(`${y};${x}`).appendChild(this.html)
    
   // .appendChild(this.html);
    
  }
}

function main(){
	var grid=new Grid(10,10);
  initHTML(10,10)
  grid.data[4][8].changeState("green");
}

main();
