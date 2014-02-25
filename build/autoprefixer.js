module.exports = function(grunt) {
	grunt.config.set("autoprefixer", {
		prod: {
			src: "site/css/app.css"
		}
	});

	grunt.loadNpmTasks("grunt-autoprefixer");
};