var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

var app = angular.module("TextToMeme", []);

app.controller("MemeCtrl", function($scope, $http) {

	// the actual data for the meme images
	$scope.memes = [];
	
	// initial state
	$scope.started = false;
	$scope.tempTranscript = "Press Start, then just talk";
	$scope.error = "";

	// set up voice recognition
	if (typeof SpeechRecognition === "undefined") {
		$scope.error = "Talk to Meme requires the Speech Recognition API, which is not supported by your browser. Right now Google Chrome is the only supported browser.";
	} else {

		var recognition = new SpeechRecognition();
		recognition.continuous = true;
		recognition.interimResults = true;

		var createMeme = function (words) {
			var firstHalf = Math.floor( words.length / 2 );
			var topWords = words.slice(0, firstHalf).join(" ");
			var bottomWords = words.slice(firstHalf).join(" ");
			var longestWord = words.sort(function (a, b) { return b.length - a.length; })[0];

			// get meme
			$http.get("/search/" + longestWord).success(function(data) {
				$scope.memes.unshift({
					topText: topWords,
					bottomText: bottomWords,
					imageUrl: data.result[0].imageUrl
				});
			});
		};

		// process the results
		recognition.onresult = function(event) {
			var i = event.resultIndex;
			var l = event.results.length;
			var tempTranscript = "";
			var finalTranscript = "";

			for ( ; i < l; i++ ) {
				if ( event.results[i].isFinal ) {
					finalTranscript += event.results[i][0].transcript;
				} else {
					tempTranscript += event.results[i][0].transcript;
				}
			}

			if (tempTranscript.length) {
				$scope.tempTranscript = tempTranscript;
			}

			if (finalTranscript.length) {
				var words = finalTranscript.split(" ");
				if (words.length > 7) {
					var firstHalf = Math.floor( words.length / 2 );
					createMeme(words.slice(firstHalf));
					createMeme(words.slice(0, firstHalf));
				} else {
					createMeme(words);
				}
			}
			
		};

		recognition.onerror = function(event) {
			$scope.error = "Error: " + event.error;
			$scope.started = false;
		};

		recognition.onend = function(event) {
			$scope.started = false;
		};

		$scope.startRecording = function() {
			recognition.start();
			$scope.started = true;
			$scope.error = "";
		};

		$scope.stopRecording = function() {
			recognition.stop();
			$scope.started = false;
		};

	}

});