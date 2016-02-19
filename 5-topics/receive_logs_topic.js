#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

var args = process.argv.slice(2);

if (args.length === 0) {
  console.log('Usage: receive_logs_topic.js <facility>.<severity>');
  process.exit(1);
}

amqp.connect('amqp://localhost', function(err, conn) {
  if (err) return console.error(err);

  conn.createChannel(function(err, ch) {
    if (err) return console.error(err);

    var ex = 'topic_logs';

    ch.assertExchange(ex, 'topic', {durable: false});
    ch.assertQueue('', {exclusive: true}, function(err, q) {
      console.log('[*] waiting for logs. to exit press ctrl+c');
      args.forEach(function(key) {
        console.log(`[*] key: ${key}`);
        ch.bindQueue(q.queue, ex, key);
      });
      ch.consume(q.queue, function(msg) {
        console.log(`[*] ${msg.fields.routingKey}:${msg.content.toStinrg()}`);
      }, {noAck: true});
    });
  });

});
