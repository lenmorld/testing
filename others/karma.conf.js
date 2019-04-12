module.exports = function (config) {
	config.set({
		basePath: './',
		frameworks: ['jasmine'],
		autoWatch: true,
		// browsers: ['Firefox', 'Chrome'],
		files: [
			// simple pattern to load the needed testfiles
			// equal to {pattern: 'test/unit/*.spec.js', watched: true, served: true, included: true}
			'app/*.js',
			'test/*.spec.js'
		],
		//...
	})
}