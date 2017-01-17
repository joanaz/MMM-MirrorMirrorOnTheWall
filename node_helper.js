'use strict';
const NodeHelper = require('node_helper');
const MirrorMirror = require('./MirrorMirror')

module.exports = NodeHelper.create({

  alexa_start: function() {
    var self = this

    console.log("alexa_start.start()");

    // Setup AWS IoT
    MirrorMirror.setup();
    console.log("[" + self.name + "] setup mirrormirror")

    // Listener for IoT event
    MirrorMirror.onMessage(function(topic, payload) {
      console.log("[" + self.name + "] " + topic)

      self.sendSocketNotification("RESULT", payload);
    });
  },

  // Subclass socketNotificationReceived received.
  socketNotificationReceived: function(notification, payload) {
    if (notification === 'ALEXA_START') {
      this.alexa_start();
    }
  }
});