// Car Control Module 
export const carMetrics = {
  needleAngle: 0,
  scaledRPM: 0,
  gear: 1,
  throttleValue: 6
}

export function update(){
  carMetrics.scaledRPM = ((Math.abs(carMetrics.needleAngle)) / 180) * 10000
}

export function setRPM(newValue){
  carMetrics.scaledRPM = newValue;
  carMetrics.needleAngle = ((Math.abs(carMetrics.scaledRPM)) / 10000) * 180
}

export function getRPM(newValue){
  return carMetrics.scaledRPM;
}
