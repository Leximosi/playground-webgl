$(document).ready(function()
{
	// Load the required files
	$.loadJSFile('webgl-core');
	$.loadJSFile('webgl-animation');
	$.loadJSFile('webgl-buffers');
	$.loadJSFile('webgl-draw');
	$.loadJSFile('webgl-helpers');
	$.loadJSFile('webgl-matrix');
	$.loadJSFile('webgl-objects');
	$.loadJSFile('webgl-shaders');
	$.loadJSFile('webgl-utils');

	// Init WebGL core
	var webGLContext = $.webgl.init('#webgl-canvas');

	// Init shaders
	$.webglshaders.init('shader-fs', 'shader-vs');

	// Init Objects
	$.webglobjects.init();

	// Init matrix object
	$.webglmatrix.init();

	// Prepare draw object
	$.webgldraw.init();

	// Fill the canvas
	webGLContext.clearColor(0.3, 0.3, 0.3, 1.0);
	webGLContext.enable(webGLContext.DEPTH_TEST);

	// Run animation
	$.webglanimation.run();
});


/**
 * Allow .js files to be included from javascript calls
 */
(function($) {
	"use strict";

	$.extend({
		_filesIncluded: [],

		loadJSFile: function(fileName)
		{
			if ($.inArray(fileName, this._filesIncluded) > -1)
			{
				return;
			}

			$("body").append('<script src="./scripts/' + fileName + '.js"></script>');
			this._filesIncluded.push(fileName);
		}
	});
})(jQuery);
