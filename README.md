# dom-visitor

[![CircleCI](https://circleci.com/gh/stormcrows/dom-visitor/tree/master.svg?style=svg)](https://circleci.com/gh/stormcrows/dom-visitor/tree/master)

Visitor designed for DOM crawling and node modification.
It can be used for VDOM traversal with "breadth" and custom "childrenProp".


If you'd like a sensible way of collecting information about nodes,
then I'd recommend using the dom-reducer:

- https://www.npmjs.com/package/dom-reducer
- https://github.com/stormcrows/dom-reducer


DOMVisitor takes 2 arguments:

- startingNode
    ex.: document.body,

- fn, a function called on every node,
    ex.: node => (node["onclick"] ? delete node["onclick"] : void 0)

- options:
  - method: "preOrder" | "breadth"
    * defaults to "preOrder",

  - childrenProp: string
    * defaults to "childNodes"


DOMVisitor supports Browser, Node.js & AMD.

## USAGE

Refer to index.spec.js for "breadth-first" traversal.

In browser: inject DOMVisitor code unto a website through devtools or script tag,
then:

```javascript
const removeAttribute = (attr, node) =>
  DOMVisitor(
    node, 
    node => (node[attr] ? delete node[attr] : void 0)
  );

removeAttribute("onclick", document.body);
```

Happy DOM crawling!
