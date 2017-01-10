'use strict';
// for dev purposes
var dotenv = require('dotenv').config({
    path: "C:\\code\\TroopControl\\.iot.env"
});
dotenv.load;

var clientFromConnectionString = require('azure-iot-device-amqp').clientFromConnectionString;
var Message = require('azure-iot-device').Message;

// IoT Stuff
var iothub = require('azure-iothub');
var connectionString = process.env.IOT_CONNECTION + ";" + process.env.DEVICEID + ";" + process.env.DEVICEKEY;
var client = clientFromConnectionString(connectionString);

function printResultFor(op) {
    return function printResult(err, res) {
        if (err) console.log(op + ' error: ' + err.toString());
        if (res) console.log(op + ' status: ' + res.constructor.name);
    };
}

var connectCallback = function (err) {
   
    if (err) {
        console.log('Could not connect: ' + err);
    } else {

        console.log('Client connected');

        // Create a message and send it to the IoT Hub every second
        setInterval(function () {
            var windSpeed = 10 + (Math.random() * 4);

            // payload for message to IoT Hub
            var data = JSON.stringify({
                deviceId: 'myFirstNodeDevice',
                windSpeed: windSpeed
            });

            var message = new Message(data);

            console.log("Sending message: " + message.getData());
            client.sendEvent(message);
        }, 1000);
    }
};

client.open(connectCallback);