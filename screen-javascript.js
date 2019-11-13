var scene = document.getElementById("theBody");

var runners = [
  {
    "Image":"Images/runner2.gif",
    "Speed":20,
    "Direction":1
  },
  {
    "Image":"Images/runner2.gif",
    "Speed":25,
    "Direction":1
  },
  {
    "Image":"Images/runner2.gif",
    "Speed":10,
    "Direction":1
  },
  {
    "Image":"Images/runner2.gif",
    "Speed":23,
    "Direction":1
  }
];

var chase = {
  "Image":"Images/runner7.gif",
  "Speed":15,
  "Direction":1
};

var light = {
    "Image":"Images/streetLight.png",
    "Speed":30
  };


document.addEventListener('DOMContentLoaded', function(event) {

  createGround();

  createLight(light);

  createChase(chase);

  for(var i = 0; i < runners.length; i++){
    createRunner(runners[i]);
  }


  window.setInterval(moveObjects,100);
})

function createGround(){
  let ground = document.createElement("DIV");
  ground.classList.add("Ground");
  ground.style.top = window.innerHeight - 90 + "px";
  ground.style.left = 0 + "px";
  ground.style.padding = window.innerWidth + "px";
  scene.appendChild(ground);
}

function createLight(newlight, num){
  let light = document.createElement("DIV");
  light.classList.add("ObjectPropsLight");
  light.setAttribute("id", "light");
  light.style.left = window.innerWidth + "px";
  light.style.top = window.innerHeight - 370 + "px";

  let lightImg = document.createElement("IMG");
  lightImg.setAttribute("src", newlight["Image"]);
  light.appendChild(lightImg);

  scene.appendChild(light);
}

function createChase(newChase){
  let chased = document.createElement("DIV");
  chased.classList.add("ObjectPropsChase");
  chased.setAttribute("id", "chased");
  chased.style.left = window.innerWidth/2 + "px";
  chased.style.bottom = 50 + "px";

  let chasedImg = document.createElement("IMG");
  chasedImg.setAttribute("src", newChase["Image"]);
  chased.appendChild(chasedImg);

  scene.appendChild(chased);
}

function createRunner(newRun) {
  let runner = document.createElement("DIV");
  runner.classList.add("ObjectProps");
  runner.setAttribute("id", "runner");
  runner.style.left = 0;
  runner.style.bottom = 10 + "px";

  let runnerPos = document.createElement("H1");
  runner.appendChild(runnerPos);

  let runnerImg = document.createElement("IMG");
  runnerImg.setAttribute("src", newRun["Image"]);
  runner.appendChild(runnerImg);

  scene.appendChild(runner);
}

function moveObjects(){
  var allElements = document.getElementsByClassName("ObjectProps");
  var chaseElement = document.getElementById("chased");
  var lightElements = document.getElementById("light");

  //Move Runners
  for(var i = 0; i < allElements.length; i++){
    var oldTop = parseInt(allElements[i].style.left);

    if(oldTop >= window.innerWidth - window.innerWidth/2){
      runners[i]["Direction"] = -1;
    }
    if(oldTop <= 50){
      runners[i]["Direction"] = 1;
    }

    var newTop = oldTop + (runners[i]["Speed"] * runners[i]["Direction"]);
    allElements[i].style.left = newTop + 'px';
  }

  //Move Light
  var oldTopL = parseInt(lightElements.style.left);
  var newTopL = 0;
  if(oldTopL <= light["Speed"]){
    newTopL = window.innerWidth;
  }
  else{
    newTopL = Math.abs(oldTopL - light["Speed"]);
  }
  lightElements.style.left = newTopL + 'px';

  //Move Chased
  var oldTopC = parseInt(chaseElement.style.left);
  if(oldTopC >= window.innerWidth - 80){
    chase["Direction"] = -1;
  }
  if(oldTopC <= 3 * window.innerWidth/4){
    chase["Direction"] = 1;
  }
  var newTopC = oldTopC + (chase["Speed"] * chase["Direction"]);
  chaseElement.style.left = newTopC + 'px';
}
