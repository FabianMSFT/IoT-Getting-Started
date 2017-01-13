'use strict';

var iothub = require('azure-iothub');

var connectionString = 'stringy';
var registry = iothub.Registry.fromConnectionString(connectionString);
var device = {
  deviceId: 'myFirstnodeNodeDevice',
  status: 'enabled',
  authentication: {
    x509Thumbprint: {
      primaryThumbprint: "89:AE:A1:05:F4:AA:6A:DC:D3:71:36:D3:0B:E2:DB:EE:52:35:A5:1F",
      secondaryThumbprint: ""
    }
  }
};

registry.create(device, function (err) {
  if(err) {
    console.error('Could not create device: ' + err.message);
  } else {
    registry.get(device.deviceId, function(err, deviceInfo) {
      if(err) {
        console.error('Could not get device: ' + err.message);
      } else {
        console.log(JSON.stringify(deviceInfo));
      }
    });
  }
});