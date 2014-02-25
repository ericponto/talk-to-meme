# Talk To Meme

Talk To Meme was inspired by a talk at [jQuery Conference](http://events.jquery.org/2014/san-diego/) by John Dimm ([@jdimm](https://twitter.com/jdimm)). It is taking his idea to the logical internet conclusion...memes.

## Browser support

The main thing powering this app is the Web Speech API for speech recognition. Currently, as far as I know, it is only implemented in Chrome. So support is very limitted.

## About the app

Right now Talk To Meme is using `SpeechRecognition` from the Web Speech API. The app is built using Angular, basically for it's easy data binding/templating. The memes are provided via the [Meme Generator API](http://version1.api.memegenerator.net/) using [memegenclient](https://github.com/phillro/memegenclient).
