const DOMVisitor = require("./index");
const { html, body, div } = require("./fakedom");

describe("removeAttribute", () => {
  const removeAttribute = (attr, node) =>
    DOMVisitor(node, node => (node[attr] ? delete node[attr] : void 0), 0);

  const DOM = html([
    body([
      div([], [["onclick", () => {}]]),
      div([div([], [["onclick", () => {}]]), []])
    ])
  ]);

  it("should remove onclick attributes from all nodes", () => {
    let count = 0;
    const attributeCount = (attr, node) =>
      DOMVisitor(node, node => (count += node[attr] ? 1 : 0));

    removeAttribute("onclick", DOM);

    expect(attributeCount("onclick", DOM)).toBe(0);
  });

  it("should be resilient to incorrect values passed as nodes", () => {
    expect(() => removeAttribute("onclick", [])).not.toThrow();
    expect(() => removeAttribute("onclick", {})).not.toThrow();
    expect(() => removeAttribute("onclick", "abc")).not.toThrow();
    expect(() => removeAttribute("onclick", 1)).not.toThrow();
    expect(() => removeAttribute("onclick", null)).not.toThrow();
    expect(() => removeAttribute("onclick", undefined)).not.toThrow();
  });
});
