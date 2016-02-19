#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

var args = process.argv.slice(2);

if (args.length === 0) {\
  console.log('Usage: rpc_client.js num');
  process.exit(1);
}

amqp.connect('amqp://127.0.0.1', function(err, conn) {

});
