'use strict';
const NodeHelper = require('node_helper');
const MirrorMirror = require('./MirrorMirror')
const ModuleNames = require('./ModuleNames.json')

module.exports = NodeHelper.create({

  alexa_start: function() {
    var self = this

    // Setup AWS IoT
    MirrorMirror.setup();

    // Listener for IoT event
    MirrorMirror.onMessage(function(topic, payload) {
      if (topic === MirrorMirror.TOPIC_IMAGES || topic === MirrorMirror.TOPIC_TEXT || topic === MirrorMirror.TOPIC_VIDEO) {
        self.sendSocketNotification("RESULT", payload);
      } else if (topic === MirrorMirror.TOPIC_MODULE) {
        let moduleName = payload.moduleName
        if (moduleName in ModuleNames) {
          moduleName = ModuleNames[moduleName]
        }

        self.sendSocketNotification("MODULE", {
          moduleName: moduleName,
          turnOn: payload.turnOn
        });
      }
    });
  },

  // Subclass socketNotificationReceived received.
  socketNotificationReceived: function(notification, payload) {
    if (notification === 'ALEXA_START') {
      this.alexa_start();
    }
  }
});