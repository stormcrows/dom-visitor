# dom-visitor

Visitor designed for DOM crawling and node modification.

If you'd like a sensible way of collecting information about nodes,
then I'd recommend using the dom-reducer:

- https://www.npmjs.com/package/dom-reducer
- https://github.com/stormcrows/dom-reducer


DOMVisitor takes 2 arguments:

  - startingNode
      ex.: document.body,

  - fn, a function called on every node,
      ex.: node => node => (node["onclick"] ? delete node["onclick"] : void 0)


DOMVisitor supports Browser, Node.js & AMD.

## USAGE

Refer to index.spec.js for Node.js fakeDOM example

In browser: inject DOMVisitor code unto a website through devtools or script tag,
then:

```javascript
const removeAttribute = (attr, node) =>
  DOMVisitor(node, node => (node[attr] ? delete node[attr] : void 0), 0);

removeAttribute("onclick", document.body);
```

Happy DOM crawling!
