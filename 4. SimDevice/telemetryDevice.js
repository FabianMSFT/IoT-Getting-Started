'use strict';
var dotenv = require('dotenv').config({
    path: "C:\\code\\TroopControl\\.iot.env"
});
dotenv.load;

var Client = require('azure-iot-device').Client;
var Protocol = require('azure-iot-device-mqtt').Mqtt;

var connectionString = process.env.IOT_CONNECTION + ";" + process.env.DEVICEID + ";" + process.env.DEVICEKEY;
var client = Client.fromConnectionString(connectionString, Protocol);

var initConfigChange = function(twin) {
    
    var currentTelemetryConfig = twin.properties.reported.telemetryConfig;
    currentTelemetryConfig.pendingConfig = twin.properties.desired.telemetryConfig;
    currentTelemetryConfig.status = "Pending";

    var patch = {
    telemetryConfig: currentTelemetryConfig
    };

    twin.properties.reported.update(patch, function(err) {
        if (err) {
            console.log('Could not report properties');
        } else {
            console.log('Reported pending config change: ' + JSON.stringify(patch));
            setTimeout(function() {completeConfigChange(twin);}, 60000);
        }
    });
}

var completeConfigChange =  function(twin) {
    var currentTelemetryConfig = twin.properties.reported.telemetryConfig;
    currentTelemetryConfig.configId = currentTelemetryConfig.pendingConfig.configId;
    currentTelemetryConfig.sendFrequency = currentTelemetryConfig.pendingConfig.sendFrequency;
    currentTelemetryConfig.status = "Success";
    delete currentTelemetryConfig.pendingConfig;

    var patch = {
        telemetryConfig: currentTelemetryConfig
    };
    patch.telemetryConfig.pendingConfig = null;

    twin.properties.reported.update(patch, function(err) {
        if (err) {
            console.error('Error reporting properties: ' + err);
        } else {
            console.log('Reported completed config change: ' + JSON.stringify(patch));
        }
    });
};

client.open(function(err) {
    if (err) {
        console.error('could not open IotHub client');
    } else {
        client.getTwin(function(err, twin) {
            if (err) {
                console.error('could not get twin');
            } else {
                console.log('retrieved device twin');
                
                // hard coded initial config. In 'real-life' this default config is read from a file
                twin.properties.reported.telemetryConfig = {
                    configId: "0",
                    sendFrequency: "24h"
                }
                // see if there is a change in config required.
                twin.on('properties.desired', function(desiredChange) {
                    console.log("received change: "+JSON.stringify(desiredChange));
                    var currentTelemetryConfig = twin.properties.reported.telemetryConfig;
                    if (desiredChange.telemetryConfig &&desiredChange.telemetryConfig.configId !== currentTelemetryConfig.configId) {
                        initConfigChange(twin);
                    }
                }); 
            }
        });
    }
});
