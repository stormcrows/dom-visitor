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
  var hasChildren = function(node, childrenProp) {
    return Array.isArray(Object(node)[childrenProp]);
  };

  var breadthFirst = (function() {
    var Node = function(value) {
      return {
        value: value,
        prev: null
      };
    };

    var Queue = function() {
      this.head = null;
      this.tail = null;
      this.len = 0;
    };

    Queue.prototype.enqueue = function(value) {
      var node = Node(value);
      if (!this.head) {
        this.head = this.tail = node;
      } else {
        this.tail.prev = node;
        this.tail = this.tail.prev;
      }
      this.len += 1;
    };

    Queue.prototype.dequeue = function() {
      if (!this.head) return undefined;
      var value = this.head.value;
      this.head = this.head.prev;
      this.len -= 1;
      return value;
    };

    Queue.prototype.length = function() {
      return this.len;
    };

    var visit = function(node, fn, q, childrenProp) {
      if (!node) return node;
      fn(node);
      if (hasChildren(node, childrenProp)) {
        var children = node[childrenProp];
        var len = children.length;
        for (var i = 0; i < len; i += 1) {
          q.enqueue(children[i], fn, childrenProp);
        }
      }
      while (q.length() > 0) {
        visit(q.dequeue(), fn, q, childrenProp);
      }
    };

    return function(node, fn, childrenProp) {
      visit(node, fn, new Queue(), childrenProp);
    };
  })();

  var preOrder = (function() {
    var visit = function(node, fn, childrenProp) {
      if (!node) return;
      fn(node);
      if (hasChildren(node, childrenProp)) {
        var children = node[childrenProp];
        var len = children.length;
        for (var i = 0; i < len; i += 1) {
          visit(children[i], fn, childrenProp);
        }
      }
    };

    return function(node, fn, childrenProp) {
      visit(node, fn, childrenProp);
    };
  })();

  return function DOMVisitor(node, fn, options) {
    var opt = options || {};
    var method = opt.method || "preorder";
    var childrenProp = opt.childrenProp || "childNodes";
    method = ["preorder", "breadth"].indexOf(method) > -1 ? method : "preorder";

    return method === "preorder"
      ? preOrder(node, fn, childrenProp)
      : breadthFirst(node, fn, childrenProp);
  };
});
