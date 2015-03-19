/* jshint devel:true, esnext: true */
import io from 'socket.io-client';

// You are importing the default value exported from the every.js file.
// You can bind it to whatever local name you like.
// For this example, we are binding it to the name `recur`.
import recur from './every';

const SOCKET_URL = 'http://localhost:8080/';
let socket = io.connect(SOCKET_URL);

// The `socket` object is an event emitter.
// We can add listeners to it, and these listeners look for .
// Specifically, the socket.io API  provides an `on` method for attaching
// callbacks to a particular websockets message.
socket.on('connect', () => {
  'use strict';

  console.log('connected!');

  // Every 3 seconds, do the following...
  recur(3000, () => {
    let timeStamp = ((new Date()).getTime());
    console.log(`sending: ${timeStamp}`);
    socket.emit('message', { data: `received: ${timeStamp}` });
  });


  // before:
  // socket.on('message', function (e) {
  //   console.log(e.data);
  // });
  //
  // after:
  // And, just for fun, we are using a default param that references a value destructured out of the incoming object.
  socket.on('message', ({data: msg, jank: stuff=msg.length}) => {
    console.log(msg);
    // console.log(stuff);
  });


  // Destructure the incoming object, pulling out the `data` property.
  // Then, grab the `x` and `y` values using default param values, referencing the destructured value.
  socket.on('coords', ({data: d, x=d.x, y=d.y}) => {
    console.log(`${x}, ${y}`);

    // Gratuitous let-scoping
    {
      let dx = (x * 10),
          dy = (y * 10);

      // jQuery, for a quick and dirty CSS transform.
      $('.jumbotron').css('transform', `translate(${dx}px, ${dy}px)`);
    }
  });

  // This is the ES5 equivalent
  /*
  socket.on('coords', function (obj) {
    var x = obj.data.x;
    var y = obj.data.y;

    var dx = (x * 10);
    var dy = (y * 10);

    $('.jumbotron').css('transform', 'translate(' + dx + 'px, ' + dy + 'px)');
  });
  */
});


