import { carMetrics } from "./controlModule.js";
export class DigitalGauge {

  constructor(elementID, gaugeMin, gaugeMax) {
    this.el = document.getElementById(elementID);
    this.GAUGE_MIN = gaugeMin;
    this.GAUGE_MAX = gaugeMax;
    this.value = 0;
    this.currentValue = 0; 
    this.setOff();
  }

  // Change the digital gauge value
  update(){
    this.value = Math.round(Math.abs(carMetrics.needleAngle));
    if (this.value >= 10 && this.value <= 99){this.el.style.left = "63px";} 
    else if (this.value >= 100) {this.el.style.left = "37px";}
    else {this.el.style.left = "88px";}
    this.el.textContent = `${this.value}`

    document.getElementById("gearNumber").textContent = `${carMetrics.gear}`
  }

  setOff(){
    this.el.style.color = "black"
    this.el.style.transition = `color 1s ease-out`
    document.getElementById("mphSymbol").style.color = "black"
    document.getElementById("gearNumber").style.transition = `color 1s ease-out` 
    document.getElementById("gearNumber").style.color = "black"
  }

  setOn(){
    this.el.style.color = "white"
    this.el.style.transition = `color 0.25s ease-out`
    document.getElementById("mphSymbol").style.color = 'white'
    document.getElementById("gearNumber").style.transition = `color 0s ease-out` 
    document.getElementById("gearNumber").style.color = "white"
  }
}
