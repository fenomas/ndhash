
/*
 *  ndhash
 * 
 *  simple n-D hash function with random-looking output
 * 
*/


var A = Math.sqrt(5)
var B = Math.sqrt(7)
var h, accum, i, k

var floor = Math.floor
function frac(n) {
  return n-floor(n)
}

function hash() {
  h = A
  accum = B

  for (i=0; i<arguments.length; ++i) {
    k = arguments[i]
    h = frac( h * (k+B) )
    accum *= (k+A)
  }

  h = frac( h * accum )
  return h
}

module.exports = hash

