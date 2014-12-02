module.exports = parse;

function parse(str, assumeType) {

	return rgb(str)
		|| rgba(str)
		|| other(str)
		|| hex(str)
		|| assume(str, assumeType);
}


/**
* Parse rgb(0,0,0)
*
* @param {String} str
* @return {Object}
* @api private
*/

function rgb(str) {
	if (str.indexOf('rgb(') !== -1) {
		var rgb = str.trim()
			.replace(/rgb?\(/, '')
			.replace(/;/g, '')
			.replace(')', '')
			.split(',')
			.filter(function (elm) { return elm.replace(new RegExp(/\s/g), '').length > 0; })
			.filter(function (number) { return number <= 255; });

		if (rgb.length !== 3) {
			return false;
		}
		return {
			string: 'rgb(' + rgb.join(',') + ')',
			raw: rgb.map(function(i){ return parseInt(i, 10); }),
			type: 'rgb'
		};
	}
	return false;
}


/**
* Parse rgba(0,0,0,1)
*
* @param {String} str
* @return {Object}
* @api private
*/

function rgba(str) {
	if (str.indexOf('rgba(') !== -1) {
		var rgb = str.trim()
			.replace(/rgba?\(/, '')
			.replace(/;/g, '')
			.replace(')', '')
			.split(',')
			.filter(function (elm) { return elm.replace(new RegExp(/\s/g), '').length > 0; })
			.filter(function (number) { return number <= 255; });

		if (rgb[3] > 1 || rgb.length !== 4) {
			return false;
		}
		return {
			string: 'rgba(' + rgb.join(',') + ')',
			raw: rgb.map(function(i){ return parseFloat(i); }),
			type: 'rgba'
		};
	}
	return false;
}


/**
* Parse 0, 0, 0 | 0, 0, 0, 0 | 0 0 0 | 0 0 0 0 | 0 0 0 .6
*
* @param {String} str
* @param {String} type - the type to assume number only values are. eg 'rgb', 'hsv', 'hsl'
* @return {Object}
* @api private
*/

function assume(str, type) {
	var result = str.replace(/,/g, ' ').replace(/  /g, ' ').split(' ').filter(function(a){return a.length > 0});

	if (result.length >= 3 && str.match(/[0-9,. ]/g).length === str.length) {
		if (result.length === 4) {
			return {
				string: 'rgba(' + result.join(',') + ')',
				raw: result.map(function(i){ return parseFloat(i); }),
				type: 'rgba'
			};
		} else {
			return {
				string: type + '(' + result.join(',') + ')',
				raw: result.map(function(i){ return parseInt(i, 10); }),
				type: type
			};
		}
	}
	return false;
}


/**
* Parse #000 and #000000
*
* @param {String} str
* @return {Object}
* @api private
*/

function hex(str) {
	var hex = str.trim().replace('#', '').replace(/;/g, '');

	if ((hex.length === 3 || hex.length === 6) && hex.match(/[a-zA-Z0-9]/g).length === hex.length) {
		return {
			string: '#' + hex,
			raw: hexToRgb(hex),
			type: 'hex'
		};
	}
	return false;
}


/**
* Parse R:252 G:252 B:252 and (R0 / G0 / B0) (formats used by adobe and other design tools)
*
* @param {String} str
* @return {Object}
* @api private
*/

function other(str) {
	if (str.toLowerCase().indexOf('r') !== -1 && (str.indexOf(':') !== -1 || str.indexOf('/') !== -1) ) {
		var rgb = str.replace(/:/g, '')
			.replace(/\(/g, '')
			.replace(/\)/g, '')
			.replace(/\//g, '')
			.replace(/ /g, '')
			.toLowerCase()
			.split(/r|g|b/)
			.filter(function (elm) {
				return elm.length > 0;
			});

		return {
			string: 'rgb(' + rgb.join(',') + ')',
			raw: rgb.map(function(i){ return parseInt(i, 10); }),
			type: 'adobe'
		};
	}
	return false;
}


/**
* Convert a hex string to rgb
*
* @param {String} hex
* @param {Boolean} asString - if true returns a string version of the rgb that can be used by a browser
* @return {String|Array}
* @api private
*/

function hexToRgb(hex, asString) {
	var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	hex = hex.replace(shorthandRegex, function (m, r, g, b) {
		return r + r + g + g + b + b;
	});

	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	if (asString) {
		return result ? 'rgb(' + parseInt(result[1], 16) + ', ' + parseInt(result[2], 16) + ', ' + parseInt(result[3], 16) + ')' : null;
	} else {
		return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
	}
}