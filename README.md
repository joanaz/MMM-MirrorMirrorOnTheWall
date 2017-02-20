# MMM-MirrorMirrorOnTheWall

This is a module for the [MagicMirror](https://github.com/MichMich/MagicMirror). It uses AWS IoT Device Gateway to receive commands from Alexa, then displays text/images/video on the Magic Mirror, and turn on/off Magic Mirror Modules according to the commands.

You have to setup Alexa, and install the [MirrorMirrorOnTheWall Alexa Skill](https://github.com/joanaz/MirrorMirrorOnTheWallSkill) before using this module. Please follow the instructions in there before continuing here.


## AWS IoT Credentials

You should have the AWS IoT Device credentials from setting up the above Alexa skill. Copy the __certs__ folder from there and paste it inside this Magic Mirror Module folder. Next, open the MirrorMirror.js in this folder, and again, replace the __keyPath__, __certPath__, and __caPath__ to your own.


## Dependencies

- [aws-iot-device-sdk](https://aws.amazon.com/iot/sdk/) (installed via `npm install`)


## Configuration

The entry in config.js can look like the following. (NOTE: You only have to add the variables to config if want to change its standard value.)

```Javascript
{
    module: 'MMM-MirrorMirrorOnTheWall',
    position: "middle_center",
    config: {}
}
```


## Usage

If you have setup the [complementary Alexa skill](https://github.com/joanaz/MirrorMirrorOnTheWallSkill) as instructed, you should be able to invoke it by saying `"Alexa, start On The Wall"`, or `"Mirror Mirror On The Wall"` if you changed your wake word to "Mirror Mirror". Next you can say any of the following commands to trigger different actions on the Magic Mirror.

### Display text

The text in {} will be displayed on Magic Mirror in bold.

- `"say {hello}"`
- `"say {good morning}"`
- `"say {you are the fairest of them all}"`
- `"display text of {hello}"`
- `"display text of {good morning}"`
- `"show text of {hello}"`
- `"show text of {good morning}"`

### Display images

The text in {} will be searched by Google Image Search API, and the returned images will be displayed on Magic Mirror, with the text.

- `"find {snow white}"`
- `"find images of {hunter}"`
- `"find pictures of {dwarfs}"`
- `"show me {snow white}"`
- `"show me pictures of {hunter}"`
- `"show me images of {dwarfs}"`
- `"show pictures of {hunter}"`
- `"show images of {snow white}"`
- `"display pictures of {dwarfs}"`
- `"display images of {dwarfs}"`

### Display video

The text in {} will be searched by Youtube Data API, and the returned video will be displayed on Magic Mirror, with the text. The Youtube video autoplays on loop.

- `"show me how to {make slime}"`
- `"show me video of {movie trailer}"`
- `"show me a video of {cats}"`
- `"show video of {volcanoes}"`
- `"show a video of {birds}"`
- `"display video of {animals}"`
- `"display a video of {rattle snakes}"`
- `"find video of {cat}"`
- `"find video of {cat and dog}"`
- `"find a video of {snow white}"`

### Turn on/off Magic Mirror Modules

To turn on/off a Magic Mirror Module, it has to be installed and configured in the main project already. You also have to map its official module name to a transcribable spoken name in ModuleNames.json. For example, ["MMM-Globe"](https://github.com/LukeSkywalker92/MMM-Globe) maps to "globe", ["currentweather"](https://github.com/MichMich/MagicMirror/tree/master/modules/default/currentweather) maps to "current weather".

To turn on a Magic Mirror Module, say:
- `"start {newsfeed}"`
- `"start {current weather}"`
- `"turn on {compliments}"`
- `"open {smile test}"`

To turn off a Magic Mirror Module, say:
- `"close {newsfeed}"`
- `"close {current weather}"`
- `"turn off {compliments}"`
- `"finish {smile test}"`

*Note: To clear the text/images/video displayed by this module, you can simply turn this module off.*

To turn on all Magic Mirror Module, say:
- `"open all"`
- `"open all modules"`
- `"open every module"`
- `"open each module"`
- `"show all modules"`
- `"show me all modules"`
- `"show every module"`
- `"show each module"`
- `"turn on all"`
- `"turn on all modules"`
- `"turn on every module"`
- `"turn on each module"`
- `"start all"`
- `"start all modules"`
- `"start every module"`
- `"start each module"`

To turn off all Magic Mirror Module, say:
- `"close all"`
- `"close all modules"`
- `"close every module"`
- `"close each module"`
- `"hide all"`
- `"hide all modules"`
- `"hide every module"`
- `"hide each module"`
- `"turn off all"`
- `"turn off all modules"`
- `"turn off every module"`
- `"turn off each module"`
