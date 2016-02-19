#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://127.0.0.1', function(err, conn) {
  if (err) return console.error(err);

  conn.createChannel(function(err, ch) {
    if (err) return console.error(err);

    var ex = 'logs';

    ch.assertExchange(ex, 'fanout', {durable: false});
    ch.assertQueue('', {exclusive: true}, function(err, q) {

      ch.bindQueue(q.queue, ex, '');
      ch.consume(q.queue, function(msg) {

        console.log(`[x] ${msg.content.toString()}`);

      }, {noAck: true});
    });

  });

});
