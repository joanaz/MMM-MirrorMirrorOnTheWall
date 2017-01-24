# MMM-MirrorMirrorOnTheWall

This is a module for the [MagicMirror](https://github.com/MichMich/MagicMirror). It uses AWS IoT Device Gateway to receive commands from Alexa, then displays text/images on the Magic Mirror, and turn on/off Magic Mirror Modules according to the commands.

It is complementary to the [MirrorMirrorOnTheWall Alexa Skill](https://github.com/joanaz/MirrorMirrorOnTheWallSkill).


## AWS IoT Credentials

You need to setup an AWS IoT Device, and save the credentials locally in this repo. You can use the same credentials for the above complementary Alexa Skill.

1. login to AWS Management Console
2. find __AWS IoT__ service
3. click on __Connect__ at the left menu bar
4. under _Configuring a device_, click on __Get Started__
5. choose __Linux/OSX__ platform, and __Node.JS__
6. Give your device a name
7. download credentials and run the start.sh script, which will generate a root-CA.crt
8. create a folder called __certs__ in your local copy of this repo
9. place all the credentials in the __certs__ folder
10. open MirrorMirror.js, replace the __keyPath__, __certPath__, and __host__ to your own


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

If you have setup the [complementary Alexa skill](https://github.com/joanaz/MirrorMirrorOnTheWallSkill) as instructed in its readme, you should be able to invoke it by saying "mirror mirror on the wall". Next you can say any of the following commands to trigger different actions on the Magic Mirror.

### Display text

`say {hello}`
`say {good morning}`
`say {you are the fairest of them all}`

The text in {} will be displayed on Magic Mirror in bold.

### Display images

`find {snow white}`
`find images of {hunter}`
`find pictures of {dwarfs}`
`show me {snow white}`
`show me pictures of {hunter}`
`show me images of {dwarfs}`
`show pictures of {hunter}`
`show images of {snow white}`
`display pictures of {dwarfs}`
`display images of {dwarfs}`

The text in {} will be searched by Google Image Search API, and the returned images will be displayed on Magic Mirror, with the text.

### Turn on/off Magic Mirror Modules

To turn on/off a Magic Mirror Module, it has to be installed and configured in the main project already. You also have to map its official module name to a transcribable spoken name in ModuleNames.json. For example, Module [MMM-Globe](https://github.com/LukeSkywalker92/MMM-Globe) maps to "globe", [currentweather](https://github.com/MichMich/MagicMirror/tree/master/modules/default/currentweather) maps to "current weather".

To turn on a Magic Mirror Module, say:
`start {newsfeed}`
`start {compliments}`
`turn on {current weather}`
`open {smile test}`

To turn off a Magic Mirror Module, say:
`close {newsfeed}`
`close {compliments}`
`turn off {current weather}`
`finish {smile test}`

