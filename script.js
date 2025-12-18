import { Needle } from "./needle.js";
import { DigitalGauge } from "./digitalGauge.js";
import { RpmIndicatorRow } from "./rpmIndicatorRow.js"
import { carMetrics, update } from "./controlModule.js";
import { GearBox } from "./gearbox.js";
import { InfotainmentSystem } from "./digitalGaugeRight.js";

let on = false; // Determines the 'car' power state
let gaugeBusy = false; // Determines whether the car is in the start animation
let intervalIDPhysics = null; // Global variable to store the timer ID for physics
let intervalIDThrottle
let intervalIDBrake
// Post-Normalized angle values 
const GAUGE_MIN = 0;
let engineIdle = 0  

 
// Instatiate a needle object for the rest of the code to use
let needle = new Needle("needle", 240, 0, 0, 180);
// Instatiate a digital gauge object for the rest of the code to use
let digitalIndicator = new DigitalGauge("digitalGauge", 0, 180);
// Instatiate the Gas Pedal 
let gasPedal = document.getElementById("pedalGas");
let brakePedal = document.getElementById("pedalBrake");

// Initiate a rpm indicator row
let rpmIndicatorLeft = new RpmIndicatorRow(20, true);
let rpmIndicatorRight = new RpmIndicatorRow(520, false);

//Initiate the infotainment system
let infotainmentSystem = new InfotainmentSystem(); 

// Create the gearbox
let gearBox = new GearBox(); 
gearBox.setAutomatic();

// Set the buttons to their respective functions
document.getElementById("carStartButton").addEventListener("click", toggleOnOff)
document.getElementById("UpButton").addEventListener("click", upTen)
document.getElementById("DownButton").addEventListener("click", downTen)
document.getElementById("TransmissionToggle").addEventListener("click", toggleTrans);
document.getElementById("carButtonOnOff").addEventListener("click", togglePhysics)
document.getElementById("DownShiftButton").addEventListener("click", shiftDown)
document.getElementById("UpShiftButton").addEventListener("click", shiftUp)
document.getElementById("carButtonTest").addEventListener("click", spanThroughGauge);
gasPedal.addEventListener('mousedown', handlePressStart);
gasPedal.addEventListener('mouseup', handlePressEnd);
gasPedal.addEventListener('mouseleave', handlePressEnd); 

brakePedal.addEventListener('mousedown', handlePressBrake);
brakePedal.addEventListener('mouseup', handlePressBrakeEnd);
brakePedal.addEventListener('mouseleave', handlePressBrakeEnd); 

// Set needle to 0 at start of program 
needle.setStiff(0);

// Set Physics on by default 
togglePhysics();

// Function that is called when "Engine Start" button is pressed 
// Manipulates the needle based on the cars state
function toggleOnOff(){
  if (on){
    on = false
    infotainmentSystem.closeGauge();
    document.getElementById("OnOffIndicator").textContent = 'Power: OFF'
    digitalIndicator.setOff(); 
    rpmIndicatorLeft.turnOffAll(); rpmIndicatorRight.turnOffAll();
    carMetrics.needleAngle = 0; // Reset the metrics angle
    carMetrics.scaledRPM = 0;   // Reset RPM
    carMetrics.gear = 1;        // Reset gear
    needle.setAnimationSpeed(0.15);
    gaugeSetValue(0);
    needle.setAngle(0);
    digitalIndicator.update(0);
    carMetrics.throttleValue = 4;
  } else {
    on = true
    infotainmentSystem.openGauge(); 
    rpmIndicatorLeft.startUpTest(); rpmIndicatorRight.startUpTest();
    rpmIndicatorLeft.turnOffAll(); rpmIndicatorRight.turnOffAll();
    document.getElementById("OnOffIndicator").textContent = 'Power: ON'
    digitalIndicator.setOn()
    startUpAnimation()
    needle.setAngle(engineIdle);
  }
}

function toggleTrans(){
  if (gearBox.manualGearbox === true) {
    gearBox.setAutomatic();
    document.getElementById("TransmissionToggle").textContent = 'Trans: Automatic'
  }
  else {
    gearBox.setManual();
    document.getElementById("TransmissionToggle").textContent = 'Trans: Manual'
  }
}

function togglePhysics() {
  if (intervalIDPhysics === null) {
    document.getElementById("carButtonOnOff").textContent = 'Physics ON'
    startPhysics()
  }
  else {
    document.getElementById("carButtonOnOff").textContent = 'Physics OFF'
    stopPhysics()
  }
}

// Plays a short startup animation where the gauge moves between 0% and 100% then back to 0% 
function startUpAnimation(){
  gaugeBusy = true;
  needle.setAnimationSpeed(1);
  setTimeout(() => {needle.setSmooth(-180)}, 200)
  setTimeout(() => {needle.setSmooth(0)}, 2200)
  setTimeout(() => {
    carMetrics.needleAngle = 0;
    needle.setAnimationSpeed(0.15);
    gaugeBusy = false;
  }, 3200)
}


function spanThroughGauge(){ 
  if (on){
    document.getElementById("carButtonTest").textContent = "Testing..."; 
    gaugeSetValue(0);
    gaugeBusy = true;
    needle.setAnimationSpeed(6, "linear");
    needle.setSmooth(-180)
    setTimeout(() => {needle.setSmooth(0)}, 6000)
    setTimeout(() => {needle.setAnimationSpeed(0.15); document.getElementById("carButtonTest").textContent = "Span Test"; gaugeBusy = false;}, 12000)
  }
}

// ================================================================
function upTen(){
  let adjustment = carMetrics.needleAngle - 10;
  if (adjustment <= -180) {
    adjustment = -180;
  }
  gaugeSetValue(adjustment);
}

function downTen(){
  let adjustment = carMetrics.needleAngle + 10;
  if (adjustment >= 0) {
    adjustment = 0;
  }
  gaugeSetValue(adjustment);
}

function shiftDown(){
  if (!gaugeBusy && on)  gearBox.downShift();
}

function shiftUp(){
  if (!gaugeBusy && on) gearBox.upShift();
}

// ================================================================


// Sets the realValue to a passed in value
function gaugeSetValue(value){
  carMetrics.needleAngle = value
}

function throttle(){
  if (on && !gaugeBusy){
    let newAngle = carMetrics.needleAngle - carMetrics.throttleValue;
    if (newAngle <= -180) { 
      carMetrics.needleAngle = -180;
    } else {
      carMetrics.needleAngle = newAngle;
    }
  }
}

function brake(){
  if (on && !gaugeBusy){
    if (carMetrics.needleAngle >= 0) carMetrics.needleAngle = 0
    else carMetrics.needleAngle += 5
  }
}

// Sets the gauge to the real value every 100ms
setInterval(set, 100)

function set(){
  infotainmentSystem.update(); 
  if (on) { // If car is on, run ALL physics/gearbox/RPM logic
      update(); 
      gearBox.update();
      
      if (!gaugeBusy) { // If car is on AND not animating, update visuals
          digitalIndicator.update();
          rpmIndicatorLeft.updateRow(carMetrics.needleAngle);
          rpmIndicatorRight.updateRow(carMetrics.needleAngle);
          if (carMetrics.needleAngle <= 0) needle.setAngle(carMetrics.needleAngle)
          else carMetrics.needleAngle = 0
      }
  }
}

function physicsSet(){
  if (!gaugeBusy && on) {
    let decayValue = 1
    if (carMetrics.needleAngle === 0){
      decayValue = 0
    } else {
      if (carMetrics.needleAngle < -170) {decayValue = 10}
      else if (carMetrics.needleAngle <= -170) { decayValue = 6; }
      else if (carMetrics.needleAngle <= -120) { decayValue = 4; }
      else if (carMetrics.needleAngle <= -100) { decayValue = 2; }
      else if (carMetrics.needleAngle <= -80) { decayValue = 2; }
    }

    carMetrics.needleAngle += decayValue;
  }
}

function startPhysics() { 
    intervalIDPhysics = setInterval(physicsSet, 50)
}

function stopPhysics() {
    clearInterval(intervalIDPhysics)
    intervalIDPhysics = null
}

function handlePressStart() {
    clearInterval(intervalIDThrottle); 
    intervalIDThrottle = setInterval(throttle, 50); // Executes 
    throttle();
    
    gasPedal.classList.add('is-active'); 
}

function handlePressEnd() {
    clearInterval(intervalIDThrottle);
    intervalIDThrottle = null;
    
    gasPedal.classList.remove('is-active');
}   


function handlePressBrake() {
    clearInterval(intervalIDBrake); 
    intervalIDBrake = setInterval(brake, 50); // Executes 
    brake();
    
    brakePedal.classList.add('is-active'); 
}

function handlePressBrakeEnd() {
    clearInterval(intervalIDBrake);
    intervalIDBrake = null;
    
    brakePedal.classList.remove('is-active');
}

// ======================================================================
// Keydown Listener

document.addEventListener('keydown', handleKeyPress);

function handleKeyPress(event){
  switch (event.key.toLowerCase()){
    case 'q':
      shiftDown();
      break;
    case 'e':
      shiftUp();
      break;
  }
}

document.addEventListener('keydown', (event) => {
    if (event.key.toLowerCase() === 'w') {
        handlePressStart();
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key.toLowerCase() === 'w') {
        handlePressEnd();
    }
});