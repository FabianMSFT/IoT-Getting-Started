'use strict';
var dotenv = require('dotenv').config({
    path: "C:\\code\\TroopControl\\.iot.env"
});
dotenv.load;

// this is an example, so we are creating vars for all protocols
var Amqp = require('azure-iot-device-amqp').Amqp;
var AmqpWs = require('azure-iot-device-amqp').AmqpWs;
var Http = require('azure-iot-device-http').Http;
var Mqtt = require('azure-iot-device-mqtt').Mqtt;

var Client = require('azure-iot-device').Client;
var Message = require('azure-iot-device').Message;

// String SharedAccessSignature in the following formats:
//  "SharedAccessSignature sr=<iothub_host_name>/devices/<device_id>&sig=<signature>&se=<expiry>"
var sas = process.env.SAS_KEY;

// fromSharedAccessSignature must specify a transport constructor, coming from any transport package.
// change protocol with relevant var
var protocol = "Mqtt";
var client = Client.fromSharedAccessSignature(sas, Mqtt);

var connectCallback = function (err) {
    if (err) {
        console.error('Could not connect: ' + err);
    } else {
        console.log('Client connected, using ' + protocol + " protocol");
        
        client.on('message', function (msg) {
            console.log('Id: ' + msg.messageId + ' Body: ' + msg.data);
            client.complete(msg, printResultFor('completed'));
            // reject and abandon follow the same pattern.
            // /!\ reject and abandon are not available with MQTT
        });

        // Create a message and send it to the IoT Hub every second
        var sendInterval = setInterval(function () {
            var windSpeed = 10 + (Math.random() * 4); // range: [10, 14]
            var data = JSON.stringify({
                deviceId: 'myFirstDevice',
                windSpeed: windSpeed
            });
            var message = new Message(data);
            message.properties.add('myproperty', 'myvalue');
            console.log('Sending message: ' + message.getData());
            client.sendEvent(message, printResultFor('send'));
        }, 2000);

        client.on('error', function (err) {
            console.error(err.message);
        });

        client.on('disconnect', function () {
            clearInterval(sendInterval);
            client.removeAllListeners();
            client.open(connectCallback);
        });
    }
};

client.open(connectCallback);

// Helper function to print results in the console
function printResultFor(op) {
    return function printResult(err, res) {
        if (err) console.log(op + ' error: ' + err.toString());
        if (res) console.log(op + ' status: ' + res.constructor.name);
    };
}