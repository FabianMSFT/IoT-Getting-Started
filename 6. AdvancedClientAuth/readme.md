Examples are based on following sample: https://github.com/Azure/azure-iot-sdk-node/blob/2047cad9224c328a2b421aae644ff23102d32f19/device/samples/simple_sample_device_x509.js

For more information on authentication see :https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-devguide-security

Quick Summary:
- Every protocal (e.g. MQTT) does have his own way carrying the tokens.
- SAS can be created with the device explorer tool (or programmaticaly)


The best way to create a x509 certificate is using iothub-explorer in combination with openssl.
- iothub-explorer: https://github.com/azure/iothub-explorer/tree/58afef6336b64ced3f6b6324cc2d13dd220b53a4 
- OpenSSL: http://slproweb.com/products/Win32OpenSSL.html
