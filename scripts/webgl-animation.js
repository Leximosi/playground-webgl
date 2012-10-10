(function($) {
	"use strict";

	function animate(object)
	{
		if (typeof object.animation.rotations !== "undefined")
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
			for (var i in object.animation.rotations)
			{
				_r = (object.animation.rotations[i].deg * _elapsed) / 1000.0;
	
				object.animation.rotations[i].cur =
					(object.animation.rotations[i].dir == "-")
						? object.animation.rotations[i].cur - _r
						: object.animation.rotations[i].cur + _r;

				// Actual action
				mat4.rotate(
					$.webglmatrix.getmvMatrix(),
					$.webglhelpers.degToRad(object.animation.rotations[i].cur),
					object.animation.rotations[i].vec
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
