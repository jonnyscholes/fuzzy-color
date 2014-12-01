fuzzy-color
===========

Fuzzy color is a utility that takes a string and does its absolute best to parse a meaningful color value from it.
It takes all the everyday color formats plus a few rarer ones that are (unfortunately) out there.

Supported formats
-----------------

- RGB - ``` rgb(0, 0, 0) ```
- RGBA - ``` rgba(0, 0, 0, 0) ```
- HEX 3 Char - ``` #000 ```
- HEX 6 Char - ``` #000000 ```
- HEX 6 Char - ``` #000000 ```
- Adobe #1 - ``` R:0 G:0 B:0 ```
- Adobe #2 - ``` (R0 / G0 / B0) ```

There is also an 'assume' mode. When the assume parameter is passed we can parse values like ``` 0 0 0 ``` and assume they
are a certain color format. Some examples would be ``` rgb ```, ``` hsl ```, ``` hsv ```. If there are 4 numbers 
(``` 0 0 0 0.5 ```) it will always assume it is ``` rgba ```.

Install
-------

``` npm install fuzzy-color ```

Usage
-----

``` 
var fuzzycolor = require('fuzzy-color');

var color1 = fuzzycolor('rgb(34,210,222)');
console.log(color1); 
// { string: 'rgb(34,210,222)', raw: [ 34, 210, 222 ], type: 'rgb' }

var color2 = fuzzycolor('34, 210, 222', 'hsv');
console.log(color2);
// { string: 'hsv(34,210,222)', raw: [ 34, 210, 222 ], type: 'hsv' }
```

License
-------

MIT