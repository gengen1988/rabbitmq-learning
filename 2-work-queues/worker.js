#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://127.0.0.1', function(err, conn) {
  if (err) return console.error(err);

  conn.createChannel(function(err, ch) {
    if (err) return console.error(err);

    var q = 'task_queue';

    ch.assertQueue(q, {durable: true});
    ch.prefetch(1);
    ch.consume(q, function(msg) {
      var secs = msg.content.toString().split('.').length - 1;

      console.log(`[x] (${secs}) received ${msg.content.toString()}`);

      setTimeout(function() {
        console.log('[x] done');
        ch.ack(msg);
      }, secs * 1000);

    }, {noAck: false});

  });

});
