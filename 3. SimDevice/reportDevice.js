'use strict';
// for dev purposes
var dotenv = require('dotenv').config({
    path: "C:\\code\\TroopControl\\.iot.env"
});
dotenv.load;

var Client = require('azure-iot-device').Client;
var Protocol = require('azure-iot-device-mqtt').Mqtt;

var connectionString = process.env.IOT_CONNECTION + ";" + process.env.DEVICEID + ";" + process.env.DEVICEKEY;
var client = Client.fromConnectionString(connectionString, Protocol);

client.open(function(err) {
if (err) {
    console.error('could not open IotHub client');
}  else {
    console.log('client opened');

    client.getTwin(function(err, twin) {
    if (err) {
        console.error('could not get twin');
    } else {
        var patch = {
            connectivity: {
                type: 'cellular'
            }
        };

        twin.properties.reported.update(patch, function(err) {
            if (err) {
                console.error('could not update twin');
            } else {
                console.log('twin state reported');
                process.exit();
            }
        });
    }
    });
}
});