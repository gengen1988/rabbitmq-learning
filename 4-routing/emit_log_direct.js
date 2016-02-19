#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

var args = process.argv.slice(2);

var msg = args.slice(1).join(' ') || 'helloworld';
var severity = (args.length > 0) ? args[0] : 'info';

amqp.connect('amqp://127.0.0.1', function(err, conn) {

  if (err) return console.error(err);

  conn.createChannel(function(err, ch) {

    var ex = 'direct_logs';
    ch.assertExchange(ex, 'direct', {durable: false});
    ch.publish(ex, severity, new Buffer(msg));

    console.log(`[x] sent ${severity}: '${msg}'`);

  });

});
