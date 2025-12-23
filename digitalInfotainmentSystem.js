import { carMetrics } from "./controlModule.js";
export class InfotainmentSystem{
  constructor(){
    this.gaugeL = document.getElementById("GaugeLeftContainer")
    this.gaugeR = document.getElementById("GaugeRightContainer")
    this.infoRPM = document.getElementById("infographicRPM")
    this.infoGEAR = document.getElementById("infographicGEAR")
    this.logoRight = document.getElementById("porscheLogoRight")
    this.logoLeft = document.getElementById("porscheLogoLeft")
    this.carModel1 = document.getElementById("carModel1");
  }

  turnOn(){
    this.logoRight.pauseGif
    this.gaugeL.style.transition = "border-color 0.0s ease-out"; 
    this.gaugeR.style.transition = "border-color 0.0s ease-out"; 
    this.logoRight.style.transition = "opacity 1.3s linear"; 
    this.logoLeft.style.transition = "opacity 1.3s linear"; 
    this.logoRight.style.opacity = 1.0;
    this.logoLeft.style.opacity = 1.0;
    this.gaugeL.style.borderColor = "#cfd3d4"
    this.gaugeR.style.borderColor = "#cfd3d4"
    setTimeout(()=>{
    this.logoRight.style.transition = "opacity 0.0s linear"; 
    this.logoLeft.style.transition = "opacity 0.0s linear"; 
    this.logoRight.style.opacity = 0.0;
    this.logoLeft.style.opacity = 0.0;
    this.infoRPM.style.color = "white"
    this.infoGEAR.style.color = "white"
    this.carModel1.style.opacity = 1;
    this.carModel1.play(); 
    }, 3400)
  }

  turnOff(){
    this.carModel1.style.opacity = 0;
    this.gaugeL.style.transition = "border-color 0.0s ease-out"; 
    this.gaugeR.style.transition = "border-color 0.0s ease-out"; 
    this.gaugeL.style.backgroundColor = "transparent"
    this.gaugeR.style.backgroundColor = "transparent"
    this.gaugeL.style.borderColor = "#444747ff" 
    this.gaugeR.style.borderColor = "#444747ff" 
    this.infoRPM.style.color = "black"
    this.infoGEAR.style.color = "black"
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