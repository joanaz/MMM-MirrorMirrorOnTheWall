/* global Module */

/* Magic Mirror
 * Module: MMM-Smile
 *
 * 
 * MIT Licensed.
 */

Module.register('MMM-MirrorMirrorOnTheWall', {

  defaults: {
    // recognition interval in ms, default to 8 hours
    interval: 8 * 60 * 60 * 1000,
    // smile time in seconds
    smileLength: 5,
    // use pi camera by default
    usePiCam: true,
    // test running time in seconds
    testRunTime: 60
  },

  start: function() {
    Log.info('Starting module: ' + this.name);
    var self = this
    this.message = 'Starting Alexa...'
    this.gifUrl = ''
    this.clearDom = false
    this.startAlexa()

    setTimeout(function() {
      self.start()
    }, this.config.interval);
  },

  getStyles: function() {
    return ["MMM-Alexa.css"]
  },

  startAlexa: function() {
    Log.info("Start Alexa.");

    this.sendSocketNotification('START_ALEXA', this.config);
  },

  // Override socket notification handler.
  socketNotificationReceived: function(notification, payload) {
    var self = this
    var endTest = false

    if (notification === "RESULT") {
      var state = payload.state;
      var html = "";
      if (state.images) {
        resizer = "http://i.embed.ly/1/image/resize?key=cb0afdc785b947b0b862d215349fe973&height=300&grow=true&url=";
        htmlImages = '<div class="row">';

        for (i = 0; i < state.images.length; i++) {
          encodedUrl = encodeURIComponent(state.images[i].unescapedUrl);
          htmlImages += '<div class="image-holder">\
                            <img src="' + resizer + encodedUrl + '">\
                        </div>';
        }

        htmlImages += '</div>';
      } else {
        htmlImages = "";
      }

      if (state.displayText) {
        html = "<h1>" + state.displayText + "</h1>";
      }


      this.updateDom()
    }


    //   if (endTest) {
    //   setTimeout(function() {
    //     self.clearDom = true;
    //     self.updateDom()
    //   }, 1000);
    // }
  },

  getDom: function() {
    wrapper = document.createElement("div");
    wrapper.className = 'thin large bright';

    var h = document.createElement("p")
    var t = document.createTextNode(this.message);
    h.appendChild(t)
    wrapper.appendChild(h)

    if (this.gitUrl != '') {
      var img = document.createElement("img");
      img.src = this.gifUrl

      // image.width = this.config.imageSize.toString();
      // image.height = this.config.imageSize.toString();

      wrapper.appendChild(img);
    }

    progressBar = document.createElement("div")
    progressBar.id = "progress-bar"
    progressBar.style.width = this.progressBarWidth
    wrapper.appendChild(progressBar)

    if (this.clearDom) {
      while (wrapper.firstChild) {
        wrapper.removeChild(wrapper.firstChild);
      }
    }

    return wrapper;
  }
});