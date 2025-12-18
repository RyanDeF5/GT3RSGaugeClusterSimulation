export class RpmIndicatorRow {
  constructor(x, leftSide=true){
    this.indicatorBlocks = [];
    this.attentionValue = 0;
    this.x = x;
    this.needle = document.getElementById("needle")
    if (leftSide){
      this.rpmb1 = new RpmIndicatorBlock("rpmIndicator1");
      this.rpmb2 = new RpmIndicatorBlock("rpmIndicator2");
      this.rpmb3 = new RpmIndicatorBlock("rpmIndicator3");
      this.rpmb4 = new RpmIndicatorBlock("rpmIndicator4");
      this.rpmb5 = new RpmIndicatorBlock("rpmIndicator5");
      this.rpmb6 = new RpmIndicatorBlock("rpmIndicator6");
      this.rpmb7 = new RpmIndicatorBlock("rpmIndicator7");
      this.rpmb8 = new RpmIndicatorBlock("rpmIndicator8");
      this.rpmb9 = new RpmIndicatorBlock("rpmIndicator9");
      this.rpmb10 = new RpmIndicatorBlock("rpmIndicator10");
      this.rpmb11 = new RpmIndicatorBlock("rpmIndicator11");
      this.rpmb12 = new RpmIndicatorBlock("rpmIndicator12");
      this.rpmb13 = new RpmIndicatorBlock("rpmIndicator13");
      this.rpmb14 = new RpmIndicatorBlock("rpmIndicator14");
      this.rpmb15 = new RpmIndicatorBlock("rpmIndicator15");
      this.rpmb16 = new RpmIndicatorBlock("rpmIndicator16");
      this.rpmb17 = new RpmIndicatorBlock("rpmIndicator17");
      this.rpmb18 = new RpmIndicatorBlock("rpmIndicator18");
    } else {
      this.rpmb1 = new RpmIndicatorBlock("rpmIndicator19");
      this.rpmb2 = new RpmIndicatorBlock("rpmIndicator20");
      this.rpmb3 = new RpmIndicatorBlock("rpmIndicator21");
      this.rpmb4 = new RpmIndicatorBlock("rpmIndicator22");
      this.rpmb5 = new RpmIndicatorBlock("rpmIndicator23");
      this.rpmb6 = new RpmIndicatorBlock("rpmIndicator24");
      this.rpmb7 = new RpmIndicatorBlock("rpmIndicator25");
      this.rpmb8 = new RpmIndicatorBlock("rpmIndicator26");
      this.rpmb9 = new RpmIndicatorBlock("rpmIndicator27");
      this.rpmb10 = new RpmIndicatorBlock("rpmIndicator28");
      this.rpmb11 = new RpmIndicatorBlock("rpmIndicator29");
      this.rpmb12 = new RpmIndicatorBlock("rpmIndicator30");
      this.rpmb13 = new RpmIndicatorBlock("rpmIndicator31");
      this.rpmb14 = new RpmIndicatorBlock("rpmIndicator32");
      this.rpmb15 = new RpmIndicatorBlock("rpmIndicator33");
      this.rpmb16 = new RpmIndicatorBlock("rpmIndicator34");
      this.rpmb17 = new RpmIndicatorBlock("rpmIndicator35");
      this.rpmb18 = new RpmIndicatorBlock("rpmIndicator36");

      this.rotateValue = -5;

      this.adjustX = 0;
    }
    this.indicatorBlocks.push(this.rpmb1, this.rpmb2, this.rpmb3, this.rpmb4, this.rpmb5, this.rpmb6, this.rpmb7, this.rpmb8, this.rpmb9, this.rpmb10, this.rpmb11, this.rpmb12, this.rpmb13, this.rpmb14, this.rpmb15, this.rpmb16, this.rpmb17, this.rpmb18);

    this.initializeBlocks();
    
  }

  startUpTest(speed=50){
    let delay = 0;
    for (let block of this.indicatorBlocks) {
      setTimeout(() => { block.turnOn(); }, delay);
      setTimeout(() => { block.turnOff(); }, delay + 250);
      delay += speed; 
    }
    delay = 600;
      setTimeout(() => {
        for (let i = this.indicatorBlocks.length; i >= 0; i--) {
        let block = this.indicatorBlocks[i];
        setTimeout(() => { block.turnOn(); }, delay);
        setTimeout(() => { block.turnOff(); }, delay + 250);
        delay += speed;
      }
    }, 500)
  }

  initializeBlocks(){
    this.rpmb1.nudgePosition(this.x, 120);
    this.rpmb2.nudgePosition(this.x, 108);
    this.rpmb3.nudgePosition(this.x, 96);
    this.rpmb4.nudgePosition(this.x, 84);
    this.rpmb5.nudgePosition(this.x, 72);
    this.rpmb6.nudgePosition(this.x, 60);
    this.rpmb7.nudgePosition(this.x, 48);
    this.rpmb8.nudgePosition(this.x, 36);
    this.rpmb9.nudgePosition(this.x, 24);
    this.rpmb10.nudgePosition(this.x, 12);
    this.rpmb11.nudgePosition(this.x, 0);
    this.rpmb12.nudgePosition(this.x, -12);
    this.rpmb13.nudgePosition(this.x, -24);
    this.rpmb14.nudgePosition(this.x, -36);
    this.rpmb15.nudgePosition(this.x, -48);
    this.rpmb16.nudgePosition(this.x, -60);
    this.rpmb17.nudgePosition(this.x, -72);
    this.rpmb18.nudgePosition(this.x, -84);
  }


  turnOnRange(number){
    for (let i = 0; i < number; i++){
      let block = this.indicatorBlocks[i];
      block.turnOn(); 
    }
    for (let i = number; i < this.indicatorBlocks.length; i++){
      let block = this.indicatorBlocks[i];
      block.turnOff(); 
    }
  }

  turnOffAll(){
    for (let i = 0; i < this.indicatorBlocks.length; i++){
      let block = this.indicatorBlocks[i];
      block.turnOff(); 
    }
  }

  updateRow(value){
    this.attentionValue = Math.abs(value);

    if (this.attentionValue >= 160) {
      this.turnOnRange(18);
      return;
    } else if (this.attentionValue >= 155) {
      this.turnOnRange(17);
      return;
    } else if (this.attentionValue >= 150) {
      this.turnOnRange(16);
      return;
    } else if (this.attentionValue >= 145) {
      this.turnOnRange(15);
      return;
    } else if (this.attentionValue >= 140) {
      this.turnOnRange(14);
      return;
    } else if (this.attentionValue >= 135) {
      this.turnOnRange(13);
      return;
    } else if (this.attentionValue >= 130) {
      this.turnOnRange(12);
      return;
    } else if (this.attentionValue >= 125) {
      this.turnOnRange(11);
      return;
    } else if (this.attentionValue >= 120) {
      this.turnOnRange(10);
      return;
    } else if (this.attentionValue >= 115) {
      this.turnOnRange(9);
      return;
    } else if (this.attentionValue >= 110) {
      this.turnOnRange(8);
      return;
    } else if (this.attentionValue >= 105) {
      this.turnOnRange(7);
      return;
    } else if (this.attentionValue >= 100) {
      this.turnOnRange(6);
      return;
    } else if (this.attentionValue >= 95) {
      this.turnOnRange(5);
      return;
    } else if (this.attentionValue >= 90) {
      this.turnOnRange(4);
      return;
    } else if (this.attentionValue >= 85) {
      this.turnOnRange(3);
      return;
    } else if (this.attentionValue >= 80) {
      this.turnOnRange(2);
      return;
    }
    else if (this.attentionValue >= 75) {
      this.turnOnRange(1);
      return;
    } 

    this.turnOffAll();
    }

  }



// ================================================================

class RpmIndicatorBlock{
  constructor (elementID) {
    this.el = document.getElementById(elementID);
    this.turnOff();
  }

  rotate(angle){
    this.el.style.transform = `translateX(-50%) rotate(${angle}deg)`;
  }

  nudgePosition(x=0, y=0){
    this.el.style.left = `${this.getLeftX() + x}px`
    this.el.style.top = `${this.getTopY() + y}px`
  }

  getLeftX(){
    const computedStyle = window.getComputedStyle(this.el);
    const leftValue = computedStyle.getPropertyValue('left');
    return parseFloat(leftValue)
  }

  getTopY(){
    const computedStyle = window.getComputedStyle(this.el);
    const topValue = computedStyle.getPropertyValue('top');
    return parseFloat(topValue)
  }

  turnOn(){
    this.el.style.backgroundColor = "#fde020ff"
  }

  turnOff(){
    this.el.style.backgroundColor = "gray"
  }


}

