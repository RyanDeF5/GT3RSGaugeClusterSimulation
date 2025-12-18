import { carMetrics } from "./controlModule.js";

export class Needle {
    // Creates the needle within the gauge cluster 
    constructor(elementId, offPos, maxPos, gaugeMin = 0, gaugeMax = 180) {
      // Creates the element object by looking through the document by ID
        this.el = document.getElementById(elementId);

        // Uses angle mapping from the main file via arguments passed in
        this.OFF_POS = offPos;
        this.MAX_POS = maxPos;
        this.GAUGE_MIN = gaugeMin;
        this.GAUGE_MAX = gaugeMax;

        // Set the current value of the gauge to 0 
        this.currentValue = 0; 
    }

    // Normalizes the angle so that it is within 0 and 180 (Necessary for angle normality)
    normalizedToAngle(value) {
        return this.OFF_POS +
            ((value - this.GAUGE_MIN) / (this.GAUGE_MAX - this.GAUGE_MIN)) *
            (this.MAX_POS - this.OFF_POS);
    }

    // Determines the directional factor given the target location. If target is up then will return +1 if the target is down then will return -1
    getDirection(current, target) {
        if (current < target) return 1;
        if (current > target) return -1;
        return 0;
    }

    // Sleep function 
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    

    // "Stiffly" jumps to the angle value passed in  
    setStiff(value) {
        const angle = this.normalizedToAngle(value);
        this.el.style.transition = "none";
        this.el.style.transform = `translateX(-50%) rotate(${angle}deg)`;

        // Restore transitions
        setTimeout(() => {
            this.el.style.transition = "transform 0.15s ease-out";
        }, 10);

        // After transition set the current value to the value the gauge is now at 
        this.currentValue = value;
    }

    // Moves to the angle value passed in "smoothly" 
    async setSmooth(value) {
        // step one unit at a time
        while (this.currentValue !== value) {
            const dir = this.getDirection(this.currentValue, value);
            this.currentValue += dir;
            await this.sleep(1);  
        }

        const angle = this.normalizedToAngle(this.currentValue);
        this.el.style.transform = `translateX(-50%) rotate(${angle}deg)`;
    }

    // DIRECT angle setter bypassing normalized scale
    setAngle(angleDegrees) {
        angleDegrees = this.normalizedToAngle(angleDegrees);
        this.el.style.transform = `translateX(-50%) rotate(${angleDegrees}deg)`;
    }

    // Set needle animation speed
    setAnimationSpeed(speed=0.15, type="ease-out") {
      this.el.style.transition = `transform ${speed}s ${type}`;
    } 

}