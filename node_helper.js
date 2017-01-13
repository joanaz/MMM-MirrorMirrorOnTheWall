'use strict';
const NodeHelper = require('node_helper');
const awsIot = require('aws-iot-device-sdk');

var app = {
  TOPIC_IMAGES: "MagicMirror:new-images",
  TOPIC_TEXT: "MagicMirror:new-text",
  LAST_TIMESTAMP: 0
}

// Callbacks that will be invoked when a message is received
app.callbacks = [];

app.onMessage = function(callback) {
  app.callbacks.push(callback);
}

// Setup our AWS IoT device and receive messages
app.setup = function() {
  app.device = awsIot.device({
    keyPath: "./certs/9bb009c929-private.pem.key",
    certPath: "./certs/9bb009c929-certificate.pem.crt",
    caPath: "./certs/rootCA.pem.crt",
    clientId: "MagicMirror" + (new Date().getTime()),
    region: "us-east-1"
  });

  /**
   * AWS IoT - Connecting MagicMirror as a device to our AWS IoT topics
   */
  console.log("Attempt to connect to AWS ");
  app.device.on("connect", function() {
    console.log("Connected to AWS ");
    app.device.subscribe(app.TOPIC_TEXT);
    app.device.subscribe(app.TOPIC_IMAGES);
    console.log("Subscribed: " + app.TOPIC_TEXT);
    console.log("Subscribed: " + app.TOPIC_IMAGES);
  });

  // Listeners
  app.device.on("message", function(topic, payload) {
    var JSONpayload = JSON.parse(payload.toString());

    // Drop old messages
    if (!JSONpayload.timestamp || JSONpayload.timestamp <= app.LAST_TIMESTAMP) {
      console.log("Dropping: " + JSONpayload.displayText + " => " + JSONpayload.timestamp);
      console.log("====================================================");
      console.log("====================================================");
      return;
    } else {
      // We have a new message
      app.LAST_TIMESTAMP = JSONpayload.timestamp;
    }

    console.log("Message: " + topic + " => " + JSON.stringify(JSONpayload));
    console.log("====================================================");
    console.log("====================================================");

    // If successfull, let's let our application know
    for (i = 0; i < app.callbacks.length; i++) {
      app.callbacks[i](topic, JSONpayload);
    }
  })
}

module.exports = NodeHelper.create({
  awsIoTStart: function() {
    var self = this

    // Setup AWS IoT
    app.setup();

    // Listener for IoT event
    // Let's broadcast via Socket.io
    app.onMessage(function(topic, payload) {

      self.sendSocketNotification("RESULT", {
        topic: topic,
        result: payload
      });
    });

  },

  // Subclass socketNotificationReceived received.
  socketNotificationReceived: function(notification, payload) {
    if (notification === 'START_ALEXA') {
      this.config = payload
      this.awsIoTStart();
    }
  }
});