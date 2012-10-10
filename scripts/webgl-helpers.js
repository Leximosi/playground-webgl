(function($) {
	"use strict";

	function degToRad(degrees)
	{
		return degrees * Math.PI / 180;
	}

	$.extend({
		webglhelpers: {
			degToRad: degToRad
		}
	});
})(jQuery);
