var trickShown=0;
var trickShowable=0;
var players=[];

/*function submitNames() { 
  hide(names);

  show(move);

for(let j=0;j<10;j++){

  for(let i = 0; i < 8; i++){
    var p=document.getElementById("p"+(i+1));
    if (p.value!=""){
      const para = document.createElement("p");
      const node = document.createElement("div");
      node.textContent=p.value;
      node.className="nameElement";
      para.appendChild(node);
      var element = document.createElement("input");
      element.setAttribute("type", "number");
      element.setAttribute('min',0);
      element.setAttribute("max",j+1);
      element.setAttribute("id","bet"+i+j)
      element.setAttribute("value", "");
      element.className = "bet";
      var element2 = document.createElement("input");
      element2.setAttribute("type", "number");
      element2.setAttribute('min',0);
      element2.setAttribute("max",j+1);
      element2.setAttribute("id","get"+i+j)
      element2.setAttribute("value", "");
      element2.className = "get";
      var element3 = document.createElement("label");
      element3.setAttribute("id","score"+i+","+j);
      element3.className="score";
      element3.textContent="";
      para.appendChild(element);
      para.appendChild(element2);
      para.appendChild(element3);
      addEventListeners(element,element2,element3);
      var trick=document.getElementById("trick"+j);
      trick.className="trick";
      trick.appendChild(para);   
      if (j==0){ 
      players.push(i);
    }
    }
  }
}*/

function submitNames(){
  hide(names);
  show(move);
  for(let j=0;j<10;j++){
    for (let i=0;i<8;i++){
      var p=document.getElementById("p"+(i+1));
      if (p.value!=""){
        const row = document.createElement("div");
        row.classList.add("row");
        row.classList.add("justify-content-center");
        const col0 = document.createElement("div");
        col0.classList.add("col-5");
        col0.classList.add("text-end");
        const col1 = document.createElement("div");
        col1.classList.add("col-1");
        const col2 = document.createElement("div");
        col2.classList.add("col-1");
        const col3 = document.createElement("div");
        col3.classList.add("col-5");
        col3.classList.add("text-start")
        var name=document.createElement("label");
        name.setAttribute("id",p.value+j);
        name.className=("name");
        name.textContent=p.value;
        col0.appendChild(name);
        var bet = document.createElement("input");
        bet.setAttribute("type", "number");
        bet.setAttribute('min',0);
        bet.setAttribute("max",j+1);
        bet.setAttribute("id","bet"+i+j)
        bet.setAttribute("value", "");
        bet.className = "bet";
        col1.appendChild(bet);
        var get = document.createElement("input");
        get.setAttribute("type", "number");
        get.setAttribute('min',0);
        get.setAttribute("max",j+1);
        get.setAttribute("id","get"+i+j)
        get.setAttribute("value", "");
        get.className = "get";
        col2.appendChild(get);
        var score = document.createElement("label");
        score.setAttribute("id","score"+i+","+j);
        score.className="score";
        score.textContent="";
        col3.appendChild(score);
        row.appendChild(col0);
        row.appendChild(col1);
        row.appendChild(col2);
        row.appendChild(col3);
        addEventListeners(bet,get,score);
        var trick=document.getElementById("trick"+j);
        trick.classList.add("trick");
        trick.appendChild(row);  
        if (j==0){ 
          players.push(i);
      }
    }
  }
}

moveTrick();

console.log(players);
}

function addEventListeners(element,element2,element3){
  element.addEventListener("input",function() {updateScore(element,element2,element3)});
  element2.addEventListener("input",function() {updateScore(element,element2,element3)});
}

function moveTrick(){
  for(let j=0;j<10;j++){
    var trick=document.getElementById("trick"+j);
    hide(trick);
  }
  var trick=document.getElementById("trick"+trickShown);
  show(trick);
  var trickNum=document.getElementById("trickNum");
  trickNum.textContent="Round "+(trickShown+1);
}

function plusTrick(){


  if (trickShown>=trickShowable){
    trickShown=trickShowable;
  } else{
    trickShown+=1;
  }
  updateAllScores();
  moveTrick();
}

function minusTrick(){
  if (trickShown<=0){
    trickShown=0;
  } else{
    trickShown-=1;
  }
  moveTrick();
}


function hide(element){
  element.classList.remove("d-block");
  element.classList.add("d-none");
}
function show(element){
  element.classList.remove("d-none");
  element.classList.add("d-block");
}

function updateScore(bet,get,score){


  if (trickShown==0){
    score.textContent="0";
  }

  var currentScoreId=score.id;
  var previousScoreId="";
  var previousScore=Object();
  if(currentScoreId.substring(7,8)!="0"){
    previousScoreId=currentScoreId.substring(0,7)+(parseInt(currentScoreId.substring(7,8))-1).toString();
    previousScore=document.getElementById(previousScoreId);
  }else{
    previousScore.textContent="0";
  }

  lockTrick(bet,get,score);
  if(bet.value!=""&&get.value!=""){
    if (bet.value==0){
      if(get.value==0){
        score.textContent=10*(trickShown+1)+parseInt(previousScore.textContent);
      }else{
        score.textContent=-10*(trickShown+1)+parseInt(previousScore.textContent);
      }
    }else if(bet.value==get.value){
      score.textContent=+20*bet.value+parseInt(previousScore.textContent);
    }else{
      score.textContent=-10*Math.abs(get.value-bet.value)+parseInt(previousScore.textContent);
    }
 
  trickDone(trickShown);
}
}
function trickDone(t){
  for (const i of players){
    if (document.getElementById("score"+i+","+t).textContent==""){
      return;
    } 
  }
    if (t==trickShowable){
      trickShowable++;
      trickDone(t+1);
    
  }
}

function lockTrick(get,bet,score){
  if (get.value==""||bet.value==""||score.textContent==""){
    trickShowable=trickShown;
    score.textContent=""
  }
}

function updateAllScores(){
  var addScore=0;
  for(const j of players){
    for(i=0;i<trickShown+1;i++){
      bet=parseInt(document.getElementById("bet"+j+i).value);
      get=parseInt(document.getElementById("get"+j+i).value);
      if (isNaN(bet)||isNaN(get)){
        continue;
      }
      if (i==0){
        previousScore=0;
      } else{
        previousScore=parseInt(document.getElementById("score"+j+","+(i-1)).textContent);
      }
      if(bet==0){
        if(bet==get){
          addScore=10*(i+1);
        }else{
          addScore=-10*(i+1);
        }
      }else{
        if (bet==get){
          addScore=20*bet;
        }else{
          addScore=-10*Math.abs(bet-get);
        }
      }

      document.getElementById("score"+j+","+i).textContent= (addScore+previousScore).toString();

    }
  }
}