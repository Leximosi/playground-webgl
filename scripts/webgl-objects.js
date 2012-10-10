(function($) {
	"use strict";

	var availableObjectsKeys	= [],
	    availableObjects		= {},
	    webGLContext			= null;

	function init()
	{
		webGLContext = $.webgl.getContext();

		// Add the cube
		availableObjectsKeys.push('cube');
		availableObjects.cube = _cube();

		// Add the triangle
		// availableObjectsKeys.push('triangle');
		// availableObjects.triangle = _triangle();
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
	function _cube()
	{
		return {
			buffers: {
				colour: {
					data: [
							// Front face
							1.0, 0.0, 0.0, 1.0,
							0.0, 1.0, 0.0, 1.0,
							0.0, 0.0, 1.0, 1.0,
							0.0, 0.0, 0.0, 1.0,
				
							// Back face
							1.0, 0.5, 1.0, 1.0,
							1.0, 1.0, 1.0, 1.0,
							1.0, 0.0, 0.0, 1.0,
							0.0, 0.0, 0.0, 1.0,
				
							// Top face
							1.0, 1.0, 1.0, 1.0,
							0.0, 0.0, 0.0, 1.0,
							0.0, 0.0, 1.0, 1.0,
							1.0, 0.0, 0.0, 1.0,
				
							// Bottom face
							1.0, 0.5, 1.0, 1.0,
							0.0, 0.0, 0.0, 1.0,
							0.0, 1.0, 0.0, 1.0,
							1.0, 0.0, 0.0, 1.0,
				
							// Right face
							0.0, 0.0, 0.0, 1.0,
							1.0, 0.0, 0.0, 1.0,
							0.0, 0.0, 1.0, 1.0,
							0.0, 1.0, 0.0, 1.0,
				
							// Left face
							1.0, 0.5, 1.0, 1.0,
							1.0, 0.0, 0.0, 1.0,
							0.0, 0.0, 0.0, 1.0,
							1.0, 1.0, 1.0, 1.0
						],
					itemSize: 4,
					numItems: 24,
				},
				index: {
					data: [
							0, 1, 2,		0, 2, 3,    // Front face
							4, 5, 6,		4, 6, 7,    // Back face
							8, 9, 10,		8, 10, 11,  // Top face
							12, 13, 14,		12, 14, 15, // Bottom face
							16, 17, 18,		16, 18, 19, // Right face
							20, 21, 22,		20, 22, 23  // Left face
					],
					itemSize: 1,
					numItems: 36
				},
				vertices: {
					data: [
							// Front face
							-1.0, -1.0,  1.0,
							 1.0, -1.0,  1.0,
							 1.0,  1.0,  1.0,
							-1.0,  1.0,  1.0,
				
							// Back face
							-1.0, -1.0, -1.0,
							-1.0,  1.0, -1.0,
							 1.0,  1.0, -1.0,
							 1.0, -1.0, -1.0,
				
							// Top face
							-1.0,  1.0, -1.0,
							-1.0,  1.0,  1.0,
							 1.0,  1.0,  1.0,
							 1.0,  1.0, -1.0,
				
							// Bottom face
							-1.0, -1.0, -1.0,
							 1.0, -1.0, -1.0,
							 1.0, -1.0,  1.0,
							-1.0, -1.0,  1.0,
				
							// Right face
							 1.0, -1.0, -1.0,
							 1.0,  1.0, -1.0,
							 1.0,  1.0,  1.0,
							 1.0, -1.0,  1.0,
				
							// Left face
							-1.0, -1.0, -1.0,
							-1.0, -1.0,  1.0,
							-1.0,  1.0,  1.0,
							-1.0,  1.0, -1.0,
						],
					itemSize: 3,
					numItems: 24
				}
			},
			drawOptions: {
				type:		webGLContext.TRIANGLES,
				callback:	'drawElements'
			},
			animation: {
				rotation: [
					{
						cur: 0,
						deg: 75,	// Rotation per second
						dir: "-",	// Apply positive ("+") or negative ("-")
						vec: [1, 0, 0],
					},
					{
						cur: 0,
						deg: 5,
						dir: "+",
						vec: [0, 1, 0],
					},
					{
						cur: 0,
						deg: 5,
						dir: "-",
						vec: [-1, -1, 0],
					}
				]
			},
			translate: [1.5, 0.0, -6.0],
		};
	}

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
				rotation: [
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
