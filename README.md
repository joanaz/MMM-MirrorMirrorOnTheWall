# MMM-MirrorMirrorOnTheWall
This is an extension for the [MagicMirror](https://github.com/MichMich/MagicMirror). It does smile test for the current user.

Algorithm from [emotion-detection](https://github.com/liy9393/emotion-detection)

## Usage

The entry in config.js can look like the following. (NOTE: You only have to add the variables to config if want to change its standard value.)

```
{
	module: 'MMM-Emotion-Detection',
	config: {
		// recognition intervall in seconds
		interval: 2,
	}
}
```


## Dependencies
- [python-shell](https://www.npmjs.com/package/python-shell) (installed via `npm install`)
- [OpenCV](http://opencv.org) 
	- Linux: `sudo apt-get install libopencv-dev python-opencv` 
	- Mac: `brew install opencv`

