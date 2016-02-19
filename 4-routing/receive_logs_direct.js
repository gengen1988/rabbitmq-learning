#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

var args = process.argv.slice(2);

if (args.length === 0) {
  console.log('Usage: receive_logs_direct.js [info] [warning] [error]');
  process.exit(1);
}

amqp.connect('amqp://127.0.0.1', function(err, conn) {

  if (err) return console.error(err);

  conn.createChannel(function(err, ch) {

    var ex = 'direct_logs';
    ch.assertExchange(ex, 'direct', {durable: false});
    ch.assertQueue('', {exclusive: true}, function(err, q) {

      console.log('[x] waiting for logs. To exit press CTRL+C');

      args.forEach(function(severity) {
        ch.bindQueue(q.queue, ex, severity);
      });

      ch.consume(q.queue, function(msg) {
        console.log(`[x] ${msg.fields.routingKey}: ${msg.content.toString()}`);
      }, {noAck: true});

    });

  });

});
