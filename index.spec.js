const DOMVisitor = require("./index");
const { html, body, div } = require("./fakedom");

describe("removeAttribute", () => {
  it("should remove onclick attributes from all nodes", () => {
    let count = 0;
    const attributeCount = (attr, node) =>
      DOMVisitor(node, node => (count += node[attr] ? 1 : 0));

    const removeAttribute = (attr, node) =>
      DOMVisitor(node, node => (node[attr] ? delete node[attr] : void 0), 0);

    const DOM = html([
      body([
        div([], [["onclick", () => {}]]),
        div([div([], [["onclick", () => {}]]), []])
      ])
    ]);

    removeAttribute("onclick", DOM);

    expect(attributeCount("onclick", DOM)).toBe(0);
  });
});
