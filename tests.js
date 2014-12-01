var test = require('tape');
var fuzzyColor = require('./index.js');

console.log(fuzzyColor('rgb(34,256,222)'));



test('RGB test', function (t) {
	t.plan(1);
	var rgb = fuzzyColor('rgb(34,210,222)');

	t.deepEqual(rgb, {
		string: 'rgb(34,210,222)',
		raw: [34,210,222],
		type: 'rgb'
	});
});


test('RGB test - w/ number over 255', function (t) {
	t.plan(1);
	var rgb = fuzzyColor('rgb(34,256,222)');

	t.equal(rgb, false);
});


test('RGBA test', function (t) {
	t.plan(1);
	var rgb = fuzzyColor('rgba(0,0,0,1)');

	t.deepEqual(rgb, {
		string: 'rgba(0,0,0,1)',
		raw: [0, 0, 0, 1],
		type: 'rgba'
	});
});

test('RGBA test with .5 opacity', function (t) {
	t.plan(1);
	var rgb = fuzzyColor('rgba(0,0,0,.5)');

	t.deepEqual(rgb, {
		string: 'rgba(0,0,0,.5)',
		raw: [0, 0, 0,.5],
		type: 'rgba'
	});
});

test('assumeType=rgb with valid rgb value test - "0, 0, 0"', function (t) {
	t.plan(1);
	var rgb = fuzzyColor('0, 0, 0', 'rgb');

	t.deepEqual(rgb, {
		string: 'rgb(0,0,0)',
		raw: [0, 0, 0],
		type: 'rgb'
	});
});

test('assumeType=rgb with valid rgb value test and no commas - "0 0 0"', function (t) {
	t.plan(1);
	var rgb = fuzzyColor('0 0 0', 'rgb');

	t.deepEqual(rgb, {
		string: 'rgb(0,0,0)',
		raw: [0, 0, 0],
		type: 'rgb'
	});
});

test('assumeType=rgb with valid rgbA value test - "0, 0, 0, .5"', function (t) {
	t.plan(1);
	var rgb = fuzzyColor('0, 0, 0, .5', 'rgb');

	t.deepEqual(rgb, {
		string: 'rgba(0,0,0,.5)',
		raw: [0, 0, 0, .5],
		type: 'rgba'
	});
});


test('3 char HEX test', function (t) {
	t.plan(1);
	var rgb = fuzzyColor('#000');

	t.deepEqual(rgb, {
		string: '#000',
		raw: [0, 0, 0],
		type: 'hex'
	});
});


test('6 char HEX test', function (t) {
	t.plan(1);
	var rgb = fuzzyColor('#000000');

	t.deepEqual(rgb, {
		string: '#000000',
		raw: [0, 0, 0],
		type: 'hex'
	});
});


test('Adobe format #1 test eg R:252 G:252 B:252', function (t) {
	t.plan(1);
	var rgb = fuzzyColor('R:0 G:0 B:0');

	t.deepEqual(rgb, {
		string: 'rgb(0,0,0)',
		raw: [0, 0, 0],
		type: 'adobe'
	});
});


test('Adobe format #2 test eg (R145 / G145 / B149)', function (t) {
	t.plan(1);
	var rgb = fuzzyColor('(R0 / G0 / B0)');

	t.deepEqual(rgb, {
		string: 'rgb(0,0,0)',
		raw: [0, 0, 0],
		type: 'adobe'
	});
});