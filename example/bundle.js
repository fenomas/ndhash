(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){



// instantiate hash

var hash = require('..')
window.hash = hash



// function to give a hashed value for a given (x,y)
// second param overrides to use random, for sanity comparison

var style = 0
var styles = 4

function getPixel(x,y,useRandom) {
  // hash
  var h = hash(x,y)
  // optionally override with random
  if (useRandom) h = Math.random()
  // several output styles
  if (style==0) {
    // hash into 32 buckets, draw pixel if bucket 0
    return (Math.floor(h*32)==0) ? 0 : 255
  }
  if (style==1) {
    // draw depending on parity
    return (Math.floor(h*2)==0) ? 0 : 255
  }
  if (style==2) {
    // 250 buckets - sparse
    return (Math.floor(h*150)==0) ? 0 : 255
  }
  if (style==3) {
    // map hash float to 0..255
    return Math.floor(h*255)
  }
} 



// set up canvas and draw function

var size = 800

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = size
canvas.height = size
var canvasData = ctx.createImageData(size,size)

var xoff = 0
var yoff = 0




// draw hashed output at offsets.
// as a sanity check, upper-left 100x100 pixels use
// Math.random instead of the hash function

function draw() {
  var t = performance.now()
  for (var x=0; x<size; ++x) {
    for (var y=0; y<size; ++y) {
      // Index of the pixel in the array
      var xt = x-size/2 + xoff
      var yt = y-size/2 + yoff
      var useRandom = (x<100 && y<100)
      var col = getPixel(xt,yt,useRandom)

      var byte = (x + y*size) * 4
      canvasData.data[byte+0] = col
      canvasData.data[byte+1] = col
      canvasData.data[byte+2] = col
      canvasData.data[byte+3] = 255

    }
  }
  t = performance.now()-t
  ctx.putImageData(canvasData, 0, 0);
  var out = document.getElementById('output')
  out.innerHTML = 'Style '+style+': '+(size*size) + ' hashes in ' + 
    t.toFixed(2) + 'ms. (' + (t/size/size*1000).toFixed(3) + 'us avg.)'
}



// key event handlers to move offsets around

window.onkeydown = function(e) {
  var c = e.keyCode
  if (c==37) xoff -= 100               // left
  if (c==38) yoff -= 100               // up
  if (c==39) xoff += 100               // right
  if (c==40) yoff += 100               // down
  if (c==83) style = (style+1)%styles  // s
  draw()
}


// kick things off

draw()



},{"..":2}],2:[function(require,module,exports){

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


},{}]},{},[1]);
