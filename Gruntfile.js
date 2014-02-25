module.exports = function(grunt) {

	grunt.loadTasks("build");

	grunt.registerTask("build",
		"build the site",
		["less", "autoprefixer", "copy", "uglify"]
	);

	grunt.registerTask("default", ["build"]);
};