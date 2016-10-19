/*
    SensorTag IR Temperature sensor example
    This example uses Sandeep Mistry's sensortag library for node.js to
    read data from a TI sensorTag.
    The sensortag library functions are all asynchronous and there is a
    sequence that must be followed to connect and enable sensors.
      Step 1: Connect
        1) discover the tag
        2) connect to and set up the tag
      Step 2: Activate sensors
        3) turn on the sensor you want to use (in this case, IR temp)
        4) turn on notifications for the sensor
      Step 3: Register listeners
        5) listen for changes from the sensortag
      Step 4 (optional): Configure sensor update interval
*/
var SensorTag = require('sensortag');

var log = function(text) {
  if(text) {
    console.log(text);
  }
}

//==============================================================================
// Step 1: Connect to sensortag device.
//------------------------------------------------------------------------------
// It's address is printed on the inside of the red sleeve
// (replace the one below).
var ADDRESS = "b0:b4:48:d2:29:06";
var connected = new Promise((resolve, reject) => SensorTag.discoverByAddress(ADDRESS, (tag) => resolve(tag)))
  .then((tag) => new Promise((resolve, reject) => tag.connectAndSetup(() => resolve(tag))));

log(" ")
log("Press and hold both buttons on the SensorTag");
log("Trying to connect...");
log(" ")


//Listeners
var sensor = connected.then(function(tag) {
  log("connected");

  tag.enableIrTemperature(log);
  tag.notifyIrTemperature(log);

  tag.enableHumidity(log);
  tag.notifyHumidity(log);

  tag.enableGyroscope(log);
  tag.notifyGyroscope(log);

  tag.notifyAccelerometer(log);
  tag.enableAccelerometer(log);

  tag.enableLuxometer(log);
  tag.notifyLuxometer(log);

  tag.enableHumidity(log);
  tag.notifyHumidity(log);

  tag.enableMagnetometer(log);
  tag.notifyMagnetometer(log);

  tag.enableBarometricPressure(log);
  tag.notifyBarometricPressure(log);

  tag.enableMagnetometer(log);
  tag.notifyMagnetometer(log);

  

  return tag;
});



sensor.then(function(tag) {
  tag.on('magnetometerChange', callback(x, y, z)){
    log("X: " + x ", Y: " + y + ", Z: " + z);
  });
});


