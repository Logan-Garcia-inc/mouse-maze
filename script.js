function main(){
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
    initHTML(width, height);
  }
}
class Cell{
state="wall";
constructor(x, y){
	this.position=[x, y];
  
}
	changeState(state){
  var y=this.position[0];
  var x=this.position[1];
  
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
rotation=0;
	constructor(){
  super();
  this.state="mouse";
  this.position=[grid.height-1, Math.floor((grid.width-1)/2)];
  console.log(this.position)
  grid.data[this.position[0]][this.position[1]]=this;
  
  console.log(grid.data[9][4])
  document.getElementById(`${this.position[0]};${this.position[1]}`).classList.add("mouse");
  }
  
}


	var grid=new Grid(10,10);
  initHTML()
  var mouse=new Mouse();
}

main();
