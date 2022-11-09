let body = document.querySelector("body");
let alleSpawnPoints = document.querySelectorAll("spawnPoint");
let tische = document.querySelectorAll("tisch");
let kueche = document.querySelector("kueche");
let theke = document.querySelector("theke");

function oneOf(list) {
  if(list.length==0) {
    return;
  }
  let index = Math.floor(Math.random()*list.length);
  return list[index];
}
function spawnGast() {
  let spawnPoint = oneOf(freieSpawnPoints());
  if(spawnPoint) {
    spawnPoint.classList.add("gast");
  }
}

function gastSelected() {
  body.classList.add("gastSelected");
}

function selectEssen() {
  return oneOf(["Burger", "Pizza", "Nudeln", "Brot"]);
}

function tischClicked(ev) {
  if(body.classList.contains("gastSelected")) {
    body.classList.remove("gastSelected");
    this.classList.add("gast");
  }
  if(this.classList.contains("willbestellen")) {
    let essen = selectEssen();
    console.log("ESSEN", essen);
    this.essen = essen;
    this.classList.remove("willbestellen");
    this.classList.add("bestellt");
    body.essen = essen;
    body.classList.add("bestellen");
  }
}
function spawnPointClicked(ev) {
  if(this.classList.contains("gast")) {
    gastSelected();
    this.classList.remove("gast");
  }
}

function kuecheClicked(ev) {
  console.log("KUECHE clicked");
  if(body.classList.contains("bestellen")) {
    let essen = body.essen;
    setTimeout(function() {
      gekocht(essen);
    },2000);
    body.classList.remove("bestellen");
  }
}

function essenClicked(ev) {
  body.classList.add("essentragen");
  body.essen = ev.target.textContent;
  console.log("ESSEN genommen", body.essen);
}

function gekocht(was) {
  console.log("GEKOCHT", was);
  let essenElement = document.createElement("essen");
  essenElement.textContent = was;
  theke.appendChild(essenElement);
  essenElement.addEventListener("click", essenClicked.bind(essenElement));
}


function besetzteSpawnPoints() {
  return document.querySelectorAll("spawnPoint.gast");
}
function freieSpawnPoints() {
  return document.querySelectorAll("spawnPoint:not(.gast)");
}
function besetzteTische() {
  return document.querySelectorAll("tisch.gast");
}

function nochNichtBestelltesEssen() {
  return document.querySelectorAll("tisch.gast:not(.bestellt)");
}

function bestelleEssen() {
  let one = oneOf(nochNichtBestelltesEssen());
  if(one) {
    one.classList.add("willbestellen");
  }
}

function gameCycle() {
  if(besetzteTische().length<tische.length && besetzteSpawnPoints().length<alleSpawnPoints.length) {
    spawnGast();
  }
  
  if(besetzteTische().length>0) {
    bestelleEssen();
  }
}

setInterval(gameCycle, 500);

function initGastClick() {
  for(let spawnPoint of alleSpawnPoints) {
    spawnPoint.addEventListener("click", spawnPointClicked.bind(spawnPoint));
  }
}
function initTischClick() {
  for(let tisch of tische) {
    tisch.addEventListener("click", tischClicked.bind(tisch));
  }
}
kueche.addEventListener("click", kuecheClicked.bind(kueche));

initGastClick();
initTischClick();
