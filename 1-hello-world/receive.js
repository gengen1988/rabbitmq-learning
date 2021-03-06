#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://127.0.0.1', function(err, conn) {

  if (err) return console.error(err);

  conn.createChannel(function(err, ch) {

    var q = 'hello';

    ch.assertQueue(q, {durable: false});

    console.log('[*] wating');
    ch.consume(q, function(msg) {
      console.log('[*] received', msg.content.toString());

    }, {noAck: true});

  });

});
