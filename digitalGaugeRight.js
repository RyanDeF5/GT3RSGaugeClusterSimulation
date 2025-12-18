import { carMetrics } from "./controlModule.js";
export class InfotainmentSystem{
  constructor(){
    this.gaugeL = document.getElementById("GaugeLeftContainer")
    this.gaugeR = document.getElementById("GaugeRightContainer")
    this.infoRPM = document.getElementById("infographicRPM")
    this.infoGEAR = document.getElementById("infographicGEAR")
  }

  openGauge(){
    this.gaugeL.style.transition = "border-color 1s ease-out"; 
    this.gaugeR.style.transition = "border-color 1s ease-out"; 
    setTimeout(()=>{
      this.gaugeL.style.borderColor = "#cfd3d4"
      this.gaugeR.style.borderColor = "#cfd3d4"
    }, 1100)
    setTimeout(()=>{
      this.infoRPM.style.color = "white"
      this.infoGEAR.style.color = "white"
    }, 2400)
  }

  closeGauge(){
    this.gaugeL.style.transition = "border-color 2s ease-out"; 
    this.gaugeR.style.transition = "border-color 2s ease-out"; 
    this.gaugeL.style.borderColor = "#132227" 
    this.gaugeR.style.borderColor = "#132227" 
    this.infoRPM.style.color = "#132227"
    this.infoGEAR.style.color = "#132227"
  }

  update(){
    this.infoRPM.textContent = `RPM: ${Math.round(carMetrics.scaledRPM)}`
    if (carMetrics.gear === 1)
      this.infoGEAR.textContent = `Gear: ${carMetrics.gear}st`
    else if (carMetrics.gear === 2)
      this.infoGEAR.textContent = `Gear: ${carMetrics.gear}nd`
    else
      this.infoGEAR.textContent = `Gear: ${carMetrics.gear}rd`
  }
}