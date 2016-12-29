var dotenv = require('dotenv').config({path:"C:\\code\\TroopControl\\.iot.env"});
dotenv.load; 

var iotcon = process.env.IOT_CONNECTION;
console.log(iotcon);