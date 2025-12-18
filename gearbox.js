import { carMetrics } from "./controlModule.js";
// Transmission Gearbox Class 
export class GearBox {
  constructor(){
    this.rpm = 0;
    this.manualGearbox = true;
    this.GEAR_COUNT = 6; 
    // this.UPPER_RPM_BOUNDS = 6000;
    // this.LOWER_RPM_BOUNDS = 1200;
    this.UPPER_RPM_BOUNDS = -120;
    this.LOWER_RPM_BOUNDS = -20;

    this.downShiftButton = document.getElementById("DownShiftButton")
    this.upShiftButton = document.getElementById("UpShiftButton")
  }

  update(){
    if (!this.manualGearbox){
      if (carMetrics.needleAngle <= this.UPPER_RPM_BOUNDS){
        this.upShift();
      }
      else if (carMetrics.needleAngle >= this.LOWER_RPM_BOUNDS) {
        this.downShift();
      }
      
    }
  }

  downShift(){
    // console.log("Downshift pressed");
    const nextAngle = carMetrics.needleAngle - 30;
    
    if (carMetrics.gear <= 1) {
        return; 
    }

    if (nextAngle <= 0) { 
        carMetrics.needleAngle = nextAngle;
        carMetrics.gear -= 1;
        this.DownShiftButtonAnimation();
    } 
  }

  upShift(){
    // console.log("Upshift pressed");
    let nextAngle;
    if (this.manualGearbox) {nextAngle = carMetrics.needleAngle + 40}
    else {nextAngle = carMetrics.needleAngle + 60}
    // nextAngle = -40;

    if (carMetrics.gear >= this.GEAR_COUNT || carMetrics.needleAngle > -10) {
        return;
    }

    if (nextAngle >= -180){
      carMetrics.needleAngle = nextAngle;
      carMetrics.gear += 1; 
      this.UpShiftButtonAnimation();
    }
  }

  UpShiftButtonAnimation(){
    this.upShiftButton.style.color = "white";
    this.upShiftButton.style.backgroundColor = "green"; 
    setTimeout (()=>{
      this.upShiftButton.style.color = ""; this.upShiftButton.style.backgroundColor = "";
    }, 300);
  }

  DownShiftButtonAnimation(){
    this.downShiftButton.style.color = "white";
    this.downShiftButton.style.backgroundColor = "red"; 
    setTimeout (()=>{
      this.downShiftButton.style.color = ""; this.downShiftButton.style.backgroundColor = "";
    }, 300);
  }

  setAutomatic(){
    this.manualGearbox = false
  }

  setManual(){
    this.manualGearbox = true
  }

}

// Fix weird glitches in the gearbox:

// Includes needle glitching and fidgiting after shifting up and down 
