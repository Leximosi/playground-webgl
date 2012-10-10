(function($) {
	"use strict";

	var webGLContext		= null,
	    webGLShaderProgram	= null;

	function init()
	{
		// Setup dependencies
		webGLContext		= $.webgl.getContext();
		webGLShaderProgram	= $.webglshaders.getProgram();
	}

	function paint()
	{
		webGLContext.viewport(0, 0, webGLContext.viewportWidth, webGLContext.viewportHeight);
		webGLContext.clear(webGLContext.COLOR_BUFFER_BIT | webGLContext.DEPTH_BUFFER_BIT);

		mat4.perspective(45, webGLContext.viewportWidth / webGLContext.viewportHeight, 0.1, 100.0, $.webglmatrix.getpMatrix());
		mat4.identity($.webglmatrix.getmvMatrix());

		// Draw the objects
		var _cB = null,	// Current colour buffer
		    _iB = null, // Current index buffer
		    _vB = null, // Current position buffer
		    _o  = null, // Current draw object
		    _objectKeys = $.webglobjects.getKeys();

		for (var oKey in _objectKeys)
		{
			_cB = $.webglbuffers.getBufferByTypeAndObject('colour', _objectKeys[oKey]);
			_iB = $.webglbuffers.getBufferByTypeAndObject('index', _objectKeys[oKey]);
			_vB = $.webglbuffers.getBufferByTypeAndObject('vertices', _objectKeys[oKey]);
			_o  = $.webglobjects.getObject(_objectKeys[oKey]);

			mat4.translate($.webglmatrix.getmvMatrix(), _o.translate);

			$.webglmatrix.push();

			// Rotate the object
			if (typeof _o.animation !== "undefined")
			{
				$.webglanimation.animate(_o);
			}

			webGLContext.bindBuffer(webGLContext.ARRAY_BUFFER, _vB);
			webGLContext.vertexAttribPointer(
				webGLShaderProgram.vertexPositionAttribute,
				_vB.itemSize,
				webGLContext.FLOAT,
				false,
				0,
				0
			);

			if (typeof _cB !== "undefined")
			{
				webGLContext.bindBuffer(webGLContext.ARRAY_BUFFER, _cB);
				webGLContext.vertexAttribPointer(
					webGLShaderProgram.vertexColourAttribute,
					_cB.itemSize,
					webGLContext.FLOAT,
					false,
					0,
					0
				);
			}

			$.webglmatrix.setMatrixUniforms();
			webGLContext.drawArrays(_o.drawOptions.type, 0, _vB.numItems);

			$.webglmatrix.pop();
		}
	}

	$.extend({
		webgldraw: {
			init: init,
			paint: paint
		}
	});
	
})(jQuery);
