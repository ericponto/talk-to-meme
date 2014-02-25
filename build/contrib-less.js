module.exports = function(grunt) {
	grunt.config.set("less", {
		prod: {
			files: {
				"site/css/app.css": "src/css/app.less"
			},
			options: {
				cleancss: true
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-less");
};