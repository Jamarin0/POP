 //código JavaScript a seguir analisa corretamente o salt e a subchave armazenados e, a seguir, verifica a senha fornecida fazendo hash com o salt armazenado. Existem, sem dúvida, ajustes melhores / mais limpos / mais seguros, portanto, comentários são bem-vindos.

var crypto = require('crypto');
var hashedPwd = "ADOEtXqGCnWCuuc5UOAVIvMVJWjANOA/LoVy0E4XCyUHIfJ7dfSY0Id+uJ20DTtG+A==";
var hashedPasswordBytes = new Buffer(hashedPwd, 'base64');

var hexChar = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
var saltString = "";
var storedSubKeyString = "";

for (var i = 1; i < hashedPasswordBytes.length; i++) {
    if (i > 0 && i <= 16) {
        saltString += hexChar[(hashedPasswordBytes[i] >> 4) & 0x0f] + hexChar[hashedPasswordBytes[i] & 0x0f]
    }
    if (i > 0 && i > 16) {
        storedSubKeyString += hexChar[(hashedPasswordBytes[i] >> 4) & 0x0f] + hexChar[hashedPasswordBytes[i] & 0x0f];
    }
}

var password = 'welcome1';
console.log('cleartext: ' + password);
console.log('saltString: ' + saltString);
console.log('storedSubKeyString: ' + storedSubKeyString);

var nodeCrypto = crypto.pbkdf2Sync(new Buffer(password), new Buffer(saltString, 'hex'), 1000, 256, 'sha1');
var derivedKeyOctets = nodeCrypto.toString('hex').toUpperCase();
console.log("hex of derived key octets: " + derivedKeyOctets);
if (derivedKeyOctets.indexOf(storedSubKeyString) === 0) {
    console.info("passwords match!");
} else {
    console.warn("passwords DO NOT match!");
}