'use strict'
// make sure that openssl is in path or you run this in the openssl directory

var pem = require('pem');
var fs = require('fs');

var certFile = 'test-cert.pem';
var keyFile = 'test-key.pem';

var thumbprint = null;
var deviceInfo;

var certOptions = {
  selfSigned: true,
  days: 365
};

pem.createCertificate(certOptions, function (err, result) {
  if (err) {
    console.log ('You must have OpenSSL installed in your path for iothub-explorer to be able to generate x509 certificates');
  } else {
    fs.writeFileSync(certFile, result.certificate);
    fs.writeFileSync(keyFile, result.clientKey);

    console.log('Certificate File: ' + certFile);
    console.log('Key File: ' + keyFile);
    
    pem.getFingerprint(result.certificate, function (err, result) {
      //need to replace all :
      thumbprint = result.fingerprint.replace(/:/g, '');
      
      deviceInfo.authentication = {
        x509Thumbprint: {
          primaryThumbprint: thumbprint
        }
      };
    });
  }
});

console.log(thumbprint);