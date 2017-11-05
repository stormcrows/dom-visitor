const DOMVisitor = require("./index");
const { html, body, div } = require("./fakedom");

describe("breadthFirst", () => {
  it("should correctly assign ids to nodes ", () => {
    let id = 1;
    const tree = {
      tagName: "body",
      childNodes: [
        {
          tagName: "section",
          childNodes: [
            {
              tagName: "section",
              childNodes: [
                {
                  tagName: "section",
                  childNodes: [
                    { tagName: "section", childNodes: [] },
                    { tagName: "span", childNodes: [] },
                    { tagName: "section", childNodes: [] }
                  ]
                },
                { tagName: "span", childNodes: [] },
                { tagName: "span", childNodes: [] }
              ]
            },
            { tagName: "section", childNodes: [] },
            { tagName: "section", childNodes: [] }
          ]
        },
        { tagName: "span", childNodes: [] },
        { tagName: "span", childNodes: [] }
      ]
    };

    DOMVisitor(tree, node => (node.id = id++), { method: "breadth" });

    expect(tree).toEqual({
      tagName: "body",
      childNodes: [
        {
          tagName: "section",
          childNodes: [
            {
              tagName: "section",
              childNodes: [
                {
                  tagName: "section",
                  childNodes: [
                    { tagName: "section", childNodes: [], id: 11 },
                    { tagName: "span", childNodes: [], id: 12 },
                    { tagName: "section", childNodes: [], id: 13 }
                  ],
                  id: 8
                },
                { tagName: "span", childNodes: [], id: 9 },
                { tagName: "span", childNodes: [], id: 10 }
              ],
              id: 5
            },
            { tagName: "section", childNodes: [], id: 6 },
            { tagName: "section", childNodes: [], id: 7 }
          ],
          id: 2
        },
        { tagName: "span", childNodes: [], id: 3 },
        { tagName: "span", childNodes: [], id: 4 }
      ],
      id: 1
    });
  });
});

describe("preOrder removeAttribute", () => {
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
    attributeCount("onclick", DOM);

    expect(count).toBe(0);
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
