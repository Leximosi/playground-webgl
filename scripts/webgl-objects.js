(function($) {
	"use strict";

	var availableObjectsKeys	= [],
	    availableObjects		= {},
	    webGLContext			= null;

	function init()
	{
		webGLContext = $.webgl.getContext();

		// Add the triangle
		availableObjectsKeys.push('triangle');
		availableObjects.triangle = _triangle();
	}

	/**
	 * Allows you to set options for a given object,
	 * *no* validation is performed so checing the
	 * values first is your own responisibility!
	 */
	function setOptions(object, options)
	{
		if (typeof availableObjects[object] === "undefined")
		{
			$.error("Tried to set options for a non-existing object [" + object + "]");
		}

		availableObjects[object] = $.extend(availableObjects[object], options);
	}

	// Private constructors for default objects
	function _triangle()
	{
		return {
			buffers: {
				colour: {
					data: [
							1.0, 0.0, 0.0, 1.0,
							0.0, 1.0, 0.0, 1.0,
							0.0, 0.4, 1.0, 1.0
						],
					itemSize: 4,
					numItems: 3,
				},
				vertices: {
					data: [
							 0.0,  1.0,  0.0,
							 2.0, -1.0,  0.0,
							-2.0, -1.0,  0.0
						],
					itemSize: 3,
					numItems: 3
				}
			},
			drawOptions: {
				type:		webGLContext.TRIANGLES,
				callback:	'drawArrays'
			},
			animation: {
				rotations: [
					{
						cur: 0,
						deg: 75,	// Rotation per second
						dir: "+",	// Apply positive ("+") or negative ("-")
						vec: [1, 0, 0]
					},
					{
						cur: 0,
						deg: 5,
						dir: "-",
						vec: [0, 1, 0]
					}
				]
			},
			translate: [0.0, 0.0, -4.0]
		};
	}

	$.extend({
		webglobjects: {
			init: init,

			//-- Getters/Setters
			getKeys: function() { return availableObjectsKeys; },
			getObjects: function() { return availableObjects; },
			getObject: function(object) { return availableObjects[object]; },
			setOptions: setOptions,
		}
	});
})(jQuery);
