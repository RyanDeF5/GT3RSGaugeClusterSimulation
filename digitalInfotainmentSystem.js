import { carMetrics } from "./controlModule.js";
export class InfotainmentSystem{
  constructor(){
    this.gaugeL = document.getElementById("GaugeLeftContainer")
    this.gaugeR = document.getElementById("GaugeRightContainer")
    this.infoRPM = document.getElementById("infographicRPM")
    this.infoGEAR = document.getElementById("infographicGEAR")
    this.logoRight = document.getElementById("porscheLogoRight")
    this.logoLeft = document.getElementById("porscheLogoLeft")
  }

  turnOn(){
    this.gaugeL.style.transition = "border-color 1s ease-out"; 
    this.gaugeR.style.transition = "border-color 1s ease-out"; 
    this.logoRight.style.transition = "opacity 1.3s linear"; 
    this.logoLeft.style.transition = "opacity 1.3s linear"; 
    this.logoRight.style.opacity = 1.0;
    this.logoLeft.style.opacity = 1.0;

    setTimeout(()=>{
      this.gaugeL.style.borderColor = "#cfd3d4"
      this.gaugeR.style.borderColor = "#cfd3d4"
    }, 1100)
    setTimeout(()=>{
      this.logoRight.style.transition = "opacity 0.0s linear"; 
    this.logoLeft.style.transition = "opacity 0.0s linear"; 
      this.logoRight.style.opacity = 0.0;
    this.logoLeft.style.opacity = 0.0;
      this.infoRPM.style.color = "white"
      this.infoGEAR.style.color = "white"
    }, 3400)
  }

  turnOff(){
    this.gaugeL.style.transition = "border-color 0.0s ease-out"; 
    this.gaugeR.style.transition = "border-color 0.0s ease-out"; 
    this.gaugeL.style.borderColor = "#444747ff" 
    this.gaugeR.style.borderColor = "#444747ff" 
    this.infoRPM.style.color = "#132227"
    this.infoGEAR.style.color = "#132227"
  }

  update(){
    this.infoRPM.textContent = `RPM: ${Math.round(carMetrics.scaledRPM)}`

    // if (carMetrics.scaledRPM > 9000) this.infoRPM.style.color = "red"
    // else this.infoRPM.style.color = "white"
    
    if (carMetrics.gear === 1)
      this.infoGEAR.textContent = `Gear: ${carMetrics.gear}st`
    else if (carMetrics.gear === 2)
      this.infoGEAR.textContent = `Gear: ${carMetrics.gear}nd`
    else
      this.infoGEAR.textContent = `Gear: ${carMetrics.gear}rd`
  }
}