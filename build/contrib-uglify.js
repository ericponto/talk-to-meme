module.exports = function(grunt) {
	grunt.config.set("uglify", {
		prod: {
			options: {
				mangle: {
					except: ['$scope', '$http']
				}
			},
			files: {
				"site/js/app.js": "src/js/app.js"
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-uglify");
};