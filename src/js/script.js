(function() {
	var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

	var SpeechMeme = function() {
		this.recognition = new SpeechRecognition();

		// hardcode US English for now
		this.recognition.lang = "en-US";

		// events
		this.recognition.onresult = this.processResult.bind(this);
		this.recognition.onerror = this.handleError.bind(this);
		this.recognition.onend = this.end.bind(this);
	};

	$.extend(SpeechMeme.prototype, {
		startRecording: function( event ) {
			this.recognition.start();
		},
		handleError: function( event ) {
			alert( event.error );
		},
		end: function( event ) {
			//alert("it's over");
		},
		processResult: function( event ) {
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
			console.log(finalTranscript);
			console.log(tempTranscript);
			this.update( finalTranscript, tempTranscript );
		},
		update: function( final, temp ) {
			var words = final.split(" ");
			var firstHalf = Math.floor( words.length / 2 );
			var topWords = words.slice(0, firstHalf).join(" ");
			var bottomWords = words.slice(firstHalf).join(" ");
			var longestWord = words.sort(function (a, b) { return b.length - a.length; })[0];

			$("#top").text( topWords );
			$("#bottom").text( bottomWords );

			$("#temp").text( temp );

			// get meme

			$.getJSON("http://localhost:2021/search/" + longestWord, function(data) {
				$("#meme img").attr( "src", data.result[0].imageUrl );
			});
		}
	});


	// init app
	var speechMeme = new SpeechMeme();

	$("#start").on("click", function() {
		speechMeme.startRecording();
	});

})();