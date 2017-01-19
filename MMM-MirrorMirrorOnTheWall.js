/* global Module */

/* Magic Mirror
 * Module: MMM-Smile
 *
 * 
 * MIT Licensed.
 */

Module.register('MMM-MirrorMirrorOnTheWall', {

  defaults: {},

  start: function() {
    Log.info('Starting module: ' + this.name);
    this.sendSocketNotification('ALEXA_START', {});
  },

  getStyles: function() {
    return ["MMM-MirrorMirrorOnTheWall.css", "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"]
  },

  // Override socket notification handler.
  socketNotificationReceived: function(notification, payload) {
    Log.info(this.name + "received a socket notification:\n" + notification);
    Log.info(payload);

    if (notification === "RESULT") {
      this.result = payload;
      this.updateDom()
    } else if (notification === "MODULE") {
      MM.getModules.withClass(payload.moduleName).enumerate(function(module) {
        if (payload.turnOn) {
          module.show(1000, function() {
            Log.log(module.name + ' is shown.');
          });
        } else {
          module.hide(1000, function() {
            Log.log(module.name + ' is hidden.');
          });
        }
      });
    }
  },

  getDom: function() {
    wrapper = document.createElement("div");
    wrapper.className = 'thin large bright';

    if (this.result) {
      if (this.result.images) {
        var row = document.createElement("div")
        row.className = "row"

        for (var i = 0; i < this.result.images.length; i++) {
          var img = document.createElement("img");
          img.src = this.result.images[i].url
          row.appendChild(img)
        }
        wrapper.appendChild(row)
      }

      if (this.result.displayText) {
        var h1 = document.createElement('h1')
        h1.className = "animated fadeIn"

        var t = document.createTextNode(this.result.displayText)
        h1.appendChild(t)
        wrapper.appendChild(h1)
      }
    }

    return wrapper;
  }
});