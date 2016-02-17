#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://192.168.1.251', function(err, conn) {

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
