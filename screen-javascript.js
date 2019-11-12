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

var light = [
  {
    "Image":"Images/streetLight.png",
    "Speed":20
  },
  {
    "Image":"Images/streetLight.png",
    "Speed":20
  },
  {
    "Image":"Images/streetLight.png",
    "Speed":20
  },
  {
    "Image":"Images/streetLight.png",
    "Speed":20
  }
]

document.addEventListener('DOMContentLoaded', function(event) {

  createGround();

  for(var i = 0; i < light.length; i++){
    createLights(light[i], i);
  }

  createChase(chase);

  for(var i = 0; i < runners.length; i++){
    createRunner(runners[i]);
  }


  window.setInterval(moveRunner,100);
  // window.setInterval(moveChase,100);
})

function createGround(){
  let ground = document.createElement("DIV");
  ground.classList.add("Ground");
  ground.style.top = 80 + "vmin";
  ground.style.left = 0 + "px";
  ground.style.padding = window.innerWidth + "px";
  scene.appendChild(ground);
}

function createLights(newlight, num){
  let light = document.createElement("DIV");
  light.classList.add("ObjectPropsLight");
  light.setAttribute("id", "light");
  light.style.right = num * (window.innerWidth/4) + "px";
  light.style.bottom = 85 + "px";

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

function moveRunner(){
  var allElements = document.getElementsByClassName("ObjectProps");
  var chaseElement = document.getElementById("chased");
  var lightElements = document.getElementsByClassName("ObjectPropsLight");

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

  for(var i = 0; i < lightElements.length; i++){
    var oldTopL = parseInt(lightElements[i].style.left);

    if(oldTopL < 0){
      oldTopL += 10000;
    }
    else{
      var newTopL = Math.abs(oldTopL + light[i]["Speed"]);
      lightElements[i].style.right = newTopL + 'px';
    }

    // var newTopL = Math.abs(oldTopL - light[i]["Speed"]);
    // lightElements[i].style.left = newTopL + 'px';
  }


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
