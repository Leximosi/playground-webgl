(function($) {
	"use strict";

	function animate(object)
	{
		if (typeof object.animation.rotation !== "undefined")
		{
			_rotate(object);
		}
	}

	function run()
	{
		// Register to frame
		requestAnimFrame(run);

		// Load all the buffers
		$.webglbuffers.init(true);

		// Paint it
		$.webgldraw.paint();
	}

	var
		rotationLastTime = 0;

	function _rotate(object)
	{
		var _current = $.now(),
		    _elapsed = _current - rotationLastTime,
		    _r = 0;

		if (rotationLastTime > 0)
		{
			for (var i in object.animation.rotation)
			{
				_r = (object.animation.rotation[i].deg * _elapsed) / 1000.0;
	
				object.animation.rotation[i].cur =
					(object.animation.rotation[i].dir == "-")
						? object.animation.rotation[i].cur - _r
						: object.animation.rotation[i].cur + _r;

				// Actual action
				mat4.rotate(
					$.webglmatrix.getmvMatrix(),
					$.webglhelpers.degToRad(object.animation.rotation[i].cur),
					object.animation.rotation[i].vec
				);
			}
		}

		rotationLastTime = _current;
	}

	$.extend({
		webglanimation: {
			animate: animate,
			run: run
		}
	});
})(jQuery);
