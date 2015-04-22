ndhash
==========
Javascript library to hash integer inputs into random-looking output.


This is a fast, simple (non-crypto) deterministic JS hash function that takes one 
or more integer inputs and returns a float in the range 0..1 (like `Math.random`). 
Its purpose is to produce output which (A) is reasonably well-distributed and 
(B) doesn't show any obvious patterns when graphed over the inputs.


(It has not been tested for any other characteristics desirable to hash functions.)


### Demo

[Here](http://andyhall.github.io/ndhash/example/).



### Usage

    var hash = require('ndhash')
    
    hash(5)           // 0.8459388134141277
    hash(0,5)         // 0.176296778517182
    hash(5)==hash(5)  // true


### Motivation

(i.e. "why are you writing a hash function instead of using one made by 
people smarter than you?")

I wanted a way to deterministically popluate a map (e.g. with trees),
without any obvious visual patterns in the result. 
All of the existing hash functions I tried (e.g. FNV) seemed to produce
obvious patterns  when graphing the output of `hash(x,y)` over (x,y).



### Algorithm

The algorithm is based on the one described 
[here](http://www.cs.hmc.edu/~geoff/classes/hmc.cs070.200101/homework10/hashfuncs.html) 
as the "Multiplication Method", attributed to Cormen, Leiserson, & Rivest (1990).
This version additionally offsets the inputs (so 0 doesn't clobber the output)
and repeats the process on each input, and then finally on a value 
accumulated from all inputs. There is no theory underlying this; 
it just seems to work (and seems not to work if I omit any steps).



### License

MIT. Improvements/suggestions most welcome.

