(function($) {
	"use strict";

	var webGLContext = null;

	function init(canvasElementID)
	{
		var _canvas = $(canvasElementID)[0];
		setWebGLContext(_canvas);

		return webGLContext;
	}

	function setWebGLContext(canvas)
	{
		try
		{
			webGLContext = canvas.getContext("experimental-webgl");
			webGLContext.viewportWidth	= canvas.width;
			webGLContext.viewportHeight	= canvas.height;
		}
		catch(e)
		{
			$.error("Couldn't initialise WebGL [" + e.message + "]");
		}
	}

	$.extend({
		webgl: {
			init: init,

			//-- Getters/Setters
			getContext: function() { return webGLContext; }
		}
	});
})(jQuery);
