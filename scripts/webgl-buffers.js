(function($) {
	"use strict";

	var bufferKeys	= ['colour', 'index', 'vertices'],
		buffers		= {
						colour: {},
						index: {},
						vertices: {}
					  },
		webGLContext = null;

	function init(initialiseAll)
	{
		webGLContext = $.webgl.getContext();

		if (initialiseAll === true)
		{
			_initialiseAllBuffers();
		}
	}

	function _initialiseAllBuffers()
	{
		var _objectKeys = $.webglobjects.getKeys();

		for (var b in bufferKeys)
		{
			for (var k in _objectKeys)
			{
				var o = $.webglobjects.getObject(_objectKeys[k]);

				if (typeof o['buffers'][bufferKeys[b]] === "undefined")
				{
					continue;
				}

				if (buffers[bufferKeys[b]][_objectKeys[k]] === "undefined")
				{
					buffers[bufferKeys[b]][_objectKeys[k]] = null;
				}

				if (bufferKeys[b] == 'colour' || bufferKeys[b] == 'vertices')
				{
					_create_Float32Array_ARRAY_BUFFER(bufferKeys[b], _objectKeys[k], o['buffers'][bufferKeys[b]]);
				}
				else if (bufferKeys[b] == 'index')
				{
					_create_Uint16Array_ELEMENT_ARRAY_BUFFER(bufferKeys[b], _objectKeys[k], o['buffers'][bufferKeys[b]]);
				}
			}
		}
	}

	function _create_Float32Array_ARRAY_BUFFER(bufferType, name, buffer)
	{
		var _buffer = webGLContext.createBuffer();

		webGLContext.bindBuffer(webGLContext.ARRAY_BUFFER, _buffer);
		webGLContext.bufferData(
			webGLContext.ARRAY_BUFFER,
			new Float32Array(buffer.data), 
			webGLContext.STATIC_DRAW
		);

		_buffer.itemSize = buffer.itemSize;
		_buffer.numItems = buffer.numItems;

		buffers[bufferType][name] = _buffer;
	}

	function _create_Uint16Array_ELEMENT_ARRAY_BUFFER(bufferType, name, buffer)
	{
		var _buffer = webGLContext.createBuffer();

		webGLContext.bindBuffer(webGLContext.ELEMENT_ARRAY_BUFFER, _buffer);
		webGLContext.bufferData(
			webGLContext.ELEMENT_ARRAY_BUFFER,
			new Uint16Array(buffer.data), 
			webGLContext.STATIC_DRAW
		);

		_buffer.itemSize = buffer.itemSize;
		_buffer.numItems = buffer.numItems;

		buffers[bufferType][name] = _buffer;
	}

	$.extend({
		webglbuffers: {
			init: init,

			//-- Getters/Setters
			getAllBuffers: function() { return buffers; },
			getBufferByType: function(type) { return buffers[type]; },
			getBufferByTypeAndObject: function(type, object) { return buffers[type][object]; }
		}
	});
})(jQuery);
