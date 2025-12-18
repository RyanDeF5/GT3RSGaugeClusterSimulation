function throttle(){
  if (on && !gaugeBusy){
    adjustment = carMetrics.needleAngle - carMetrics.throttleValue
    if (adjustment <= -180) {carMetrics.needleAngle = -180;} 
    else {carMetrics.needleAngle -= carMetrics.throttleValue}
  }
}