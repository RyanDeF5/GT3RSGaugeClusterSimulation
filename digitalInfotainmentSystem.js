import { carMetrics } from "./controlModule.js";
export class InfotainmentSystem{
  constructor(){
    this.gaugeL = document.getElementById("GaugeLeftContainer")
    this.gaugeR = document.getElementById("GaugeRightContainer")
    this.infoRPM = document.getElementById("infographicRPM")
    this.infoGEAR = document.getElementById("infographicGEAR")
    this.infoSHIFTER = document.getElementById("infographicShifterPos")
    this.logoRight = document.getElementById("porscheLogoRight")
    this.logoLeft = document.getElementById("porscheLogoLeft")
    this.carModel1 = document.getElementById("carModel1");
    this.displayingMessage = false;
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
    this.infoRPM.style.color = "#cfd3d4"
    this.infoGEAR.style.color = "#cfd3d4"
    this.infoSHIFTER.style.color = "#cfd3d4"
    this.carModel1.style.opacity = 1;
    this.carModel1.play(); 
    this.setAlert("Car Is In Park!", 1500);
    }, 3500)
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
    this.infoSHIFTER.style.color = "black"
  }

  update(){
    this.infoRPM.textContent = `RPM: ${Math.round(carMetrics.scaledRPM)}`

    let shifterPosition; 
    if (carMetrics.shifterPosition == "P") {shifterPosition = "Park"}
    else if (carMetrics.shifterPosition == "R") {shifterPosition = "Reverse"}
    else if (carMetrics.shifterPosition == "N") {shifterPosition = "Neutral"}
    else if (carMetrics.shifterPosition == "D") {shifterPosition = "Drive (Normal)"}
    else if (carMetrics.shifterPosition == "M") {shifterPosition = "Drive (Manual)"}

    this.infoSHIFTER.textContent = `Gear Mode: ${shifterPosition}`

    // document.getElementById(`${shifterPosition.toLowerCase}Button`).borderColor = "red"
    
    if (carMetrics.gear === 1)
      this.infoGEAR.textContent = `Gear: ${carMetrics.gear}st`
    else if (carMetrics.gear === 2)
      this.infoGEAR.textContent = `Gear: ${carMetrics.gear}nd`
    else
      this.infoGEAR.textContent = `Gear: ${carMetrics.gear}rd`
  }

  setAlert(message, timeDisplayed){
    if (this.displayingMessage === false) {
      this.displayingMessage = true;
      document.getElementById("warningSign").style.opacity = 1;
      document.getElementById("warningMessage").style.opacity = 1;
      document.getElementById("warningMessage").textContent = `${message}`; 
      this.infoRPM.style.color = "black"
      this.infoGEAR.style.color = "black"
      this.infoSHIFTER.style.color = "black"

      setTimeout(() => {
        document.getElementById("warningSign").style.opacity = 0;
        document.getElementById("warningMessage").style.opacity = 0;;
        document.getElementById("warningMessage").textContent = "none"; 
        this.infoRPM.style.color = "white"
        this.infoGEAR.style.color = "white"
        this.infoSHIFTER.style.color = "white"
        setTimeout(() => {this.displayingMessage = false;}, 500)
      }, timeDisplayed)
    }
  }

}

