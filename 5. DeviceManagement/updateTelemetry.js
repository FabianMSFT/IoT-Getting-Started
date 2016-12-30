'use strict';
var dotenv = require('dotenv').config({
    path: "C:\\code\\TroopControl\\.iot.env"
});
dotenv.load;

var iothub = require('azure-iothub');
var uuid = require('node-uuid');

var connectionString = process.env.IOT_CONNECTION
var registry = iothub.Registry.fromConnectionString(connectionString);

var queryTwins = function() {
    var query = registry.createQuery("SELECT * FROM devices WHERE deviceId = 'myFirstNodeDevice'", 100);
    query.nextAsTwin(function(err, results) {
        if (err) {
            console.error('Failed to fetch the results: ' + err.message);
        } else {
            console.log();
            results.forEach(function(twin) {
                var desiredConfig = twin.properties.desired.telemetryConfig;
                var reportedConfig = twin.properties.reported.telemetryConfig;
                console.log("Config report for: " + twin.deviceId);
                console.log("Desired: ");
                console.log(JSON.stringify(desiredConfig, null, 2));
                console.log("Reported: ");
                console.log(JSON.stringify(reportedConfig, null, 2));
            });
        }
    });
};

registry.getTwin('myFirstNodeDevice', function(err, twin){
    if (err) {
        console.error(err.constructor.name + ': ' + err.message);
    } else {
        var newConfigId = uuid.v4();
        var newFrequency = process.argv[2] || "5m";
        var patch = {
            properties: {
                desired: {
                    telemetryConfig: {
                        configId: newConfigId,
                        sendFrequency: newFrequency
                    }
                }
            }
        }
        twin.update(patch, function(err) {
            if (err) {
                console.error('Could not update twin: ' + err.constructor.name + ': ' + err.message);
            } else {
                console.log(twin.deviceId + ' twin updated successfully');
            }
        });
        setInterval(queryTwins, 10000);
    }
});
