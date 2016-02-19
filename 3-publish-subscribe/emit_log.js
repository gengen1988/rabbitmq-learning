#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://127.0.0.1', function(err, conn) {
  if (err) return console.error(err);
  conn.createChannel(function(err, ch) {
    if (err) return console.error(err);

    var ex = 'logs';
    var msg = process.argv.slice(2).join(' ') || 'helloworld';

    ch.assertExchange(ex, 'fanout', {durable: false});
    ch.publish(ex, '', new Buffer(msg));
    console.log(`[x] sent ${msg}`);
  });

  setTimeout(function() {
    conn.close();
    process.exit(0);
  }, 500);
});
