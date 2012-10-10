(function($) {
	"use strict";

	var program = null;

	var webGLContext = null;

	function init(fragmentShaderID, vertexShaderID)
	{
		webGLContext = $.webgl.getContext();

		var _fragmentShader	= _fetchShader(fragmentShaderID),
		    _vertexShader	= _fetchShader(vertexShaderID);

		program = webGLContext.createProgram();
		webGLContext.attachShader(program, _fragmentShader);
		webGLContext.attachShader(program, _vertexShader);
		webGLContext.linkProgram(program);

		if (!webGLContext.getProgramParameter(program, webGLContext.LINK_STATUS))
		{
			$.error("Couldn't initialise shaders");
		}

		webGLContext.useProgram(program);

		program.vertexPositionAttribute = webGLContext.getAttribLocation(program, "aVertexPosition");
		webGLContext.enableVertexAttribArray(program.vertexPositionAttribute);

		program.vertexColourAttribute = webGLContext.getAttribLocation(program, "aVertexColor");
		webGLContext.enableVertexAttribArray(program.vertexColourAttribute);

		program.pMatrixUniform	= webGLContext.getUniformLocation(program, "uPMatrix");
		program.mvMatrixUniform	= webGLContext.getUniformLocation(program, "uMVMatrix");
	}

	function _fetchShader(shaderElementID)
	{
		var _shaderElement = $("#" + shaderElementID);
		if (!_shaderElement)
		{
			$.error("Couldn't load shader [" + shaderElementID + "]");
		}

		var _shaderConstruct = null,
		    _shaderType = _shaderElement.attr('type'),
		    _shaderScript = _shaderElement.text();

		if (_shaderType == "x-shader/x-fragment")
		{
			_shaderConstruct = webGLContext.FRAGMENT_SHADER;
		}
		else if (_shaderType == "x-shader/x-vertex")
		{
			_shaderConstruct = webGLContext.VERTEX_SHADER;
		}
		else
		{
			$.error("Unsupported shader type [" + _shaderType + "]");
		}

		var _shader = webGLContext.createShader(_shaderConstruct);
		webGLContext.shaderSource(_shader, _shaderScript);
		webGLContext.compileShader(_shader);

		if (!webGLContext.getShaderParameter(_shader, webGLContext.COMPILE_STATUS))
		{
			$.error(webGLContext.getShaderInfoLog(_shader));
		}

		return _shader;
	}

	$.extend({
		webglshaders: {
			init: init,

			//-- Getters/Setters
			getProgram: function() { return program; },
		}
	});
})(jQuery);
