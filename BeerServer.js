const http = require('http');
const app = require('./app');
//const https = require('https');
//const fs = require('fs');



const hostname = '192.168.1.123';
const port = 3000;


//var options = {
//key: fs.readFileSync('test/fixtures/keys/agent2-key.pem'),
//certificate: fs.readFileSync('test/fixtures/keys/agent2-cert.pem')
//};

const server = http.createServer(app);
//const secureserver = https.createServer(options, app);


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

//secureserver.listen(port, hostname, () => {
//  console.log(`Server running at https://${hostname}:${port}/`);
//});