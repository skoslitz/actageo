var framework = require('total.js');
var http = require('http');
 
var port = 8000;
var ip = '127.0.0.1';
var debug = true;
 
framework.run(http, debug, port, ip);