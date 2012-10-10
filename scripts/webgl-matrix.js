(function($) {
	"use strict"

	var
		mvMatrix		= mat4.create(),
		mvMatrixStack	= [],
		pMatrix			= mat4.create(),

		webGLContext		= null,
		webGLShaderProgram	= null;

	function init()
	{
		webGLContext		= $.webgl.getContext();
		webGLShaderProgram	= $.webglshaders.getProgram();
	}

    function setMatrixUniforms()
    {
		webGLContext.uniformMatrix4fv(webGLShaderProgram.pMatrixUniform, false, pMatrix);
		webGLContext.uniformMatrix4fv(webGLShaderProgram.mvMatrixUniform, false, mvMatrix);
	}

	function push()
	{
		var _copy = mat4.create();
		mat4.set(mvMatrix, _copy);
		mvMatrixStack.push(_copy);
	}

	function pop()
	{
		if (mvMatrixStack.length == 0)
		{
			$.error("Invalid popMatrix!");
		}

		mvMatrix = mvMatrixStack.pop();
	}

	$.extend({
		webglmatrix: {
			init: init,
			setMatrixUniforms: setMatrixUniforms,
			push: push,
			pop: pop,

			//-- Getters/Setters
			getmvMatrix: function() { return mvMatrix; },
			getpMatrix: function() { return pMatrix; }
		}
	});
})(jQuery);
