(function(name, definition) {
  if (typeof define === "function") {
    // AMD
    define(definition);
  } else if (typeof module !== "undefined" && module.exports) {
    // Node.js
    module.exports = definition();
  } else {
    // Browser
    var theModule = definition(),
      global = this,
      old = global[name];

    theModule.noConflict = function() {
      global[name] = old;
      return theModule;
    };
    global[name] = theModule;
  }
})("DOMVisitor", function() {
  return function DOMVisitor(node, fn) {
    return [].reduce.call(
      node && Object(node).childNodes ? node.childNodes : [],
      function(_, node) {
        return DOMVisitor(node, fn);
      },
      node ? fn(node) : void 0
    );
  };
});
