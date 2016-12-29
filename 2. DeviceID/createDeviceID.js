// Node.js application to create devide ID.
// Start using node createDeviceID.js
'use strict';

// Just for development purposes
var dotenv = require('dotenv').config({
  path: "C:\\code\\TroopControl\\.iot.env"
});
dotenv.load;

// IoT Stuff
var iothub = require('azure-iothub');
var connectionString = process.env.IOT_CONNECTION;
var registry = iothub.Registry.fromConnectionString(connectionString);

//create a device id
var device = new iothub.Device(null);
device.deviceId = 'myFirstNodeDevice';
registry.create(device, function (err, deviceInfo, res) {
  if (err) {
    registry.get(device.deviceId, printDeviceInfo);
  }
  if (deviceInfo) {
    printDeviceInfo(err, deviceInfo, res)
  }
});

// just a function to get some output. 
function printDeviceInfo(err, deviceInfo, res) {
  if (deviceInfo) {
    console.log('Device id: ' + deviceInfo.deviceId);
    console.log('Device key: ' + deviceInfo.authentication.symmetricKey.primaryKey);
  }
}