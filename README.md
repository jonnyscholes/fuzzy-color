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

Install
-------

``` npm install fuzzy-color ```

Usage
-----

``` 
var fuzzycolor = require('fuzzy-color');
var rgb = fuzzycolor('rgb(34,210,222)');
console.log(rgb); 
// { string: 'rgb(34,210,222)', raw: [ 34, 210, 222 ], type: 'rgb' }
```

License
-------

MIT