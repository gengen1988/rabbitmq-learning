#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://127.0.0.1', function(err, conn) {
  if (err) return console.error(err);

  conn.createChannel(function(err, ch) {

    var q = 'hello';

    var msg = process.argv.slice(2).join(' ') || 'hello world';
    ch.assertQueue(q, {durable: true});
    ch.sendToQueue(q, new Buffer(msg), {persistent: true});

    console.log(`[x] sent '${msg}'`);

  });
});
