
/* Returns a promise that will resolve on the next AnimationFrame */
function nextFrame() {
  return new Promise(function(resolve, reject) {
    requestAnimationFrame(resolve);
  });
}

/* Applies `fn` to each element of `collection`, iterating once per frame */
nextFrame.mapInFrames = function(collection, fn) {
  var results = [];
  function processEntry () {
    if (results.length === collection.length) {
      return new Promise(function (resolve) { resolve(results); });
    }
    return nextFrame().then(function () {
      results.push(fn(collection[results.length]));
      return processEntry();
    });
  }
  return processEntry();
}

module.exports = nextFrame;
