#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

ammqp.connect('amqp://127.0.0.1', function(err, conn) {

  conn.createChannel(function(err, ch) {

    var q = 'rpc_queue';

    ch.assertQueue(q, {durable: false});
    ch.prefetch(1);

    console.log('[x] awiting rpc requests');
    ch.consume(q, function(msg) {

      var n = parseInt(msg.content.toString());

      console.log(`[x] fib(${n})`);

      var r = fibonacci(n);

      ch.sendToQueue(msg.properties.replyTo, new Buffer(r.toString()), {
        correlationId: msg.properties.correlationId
      });
      ch.ack(msg);

    });

  });

});

function fibonacci(n) {
  if (n === 0 || n === 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
