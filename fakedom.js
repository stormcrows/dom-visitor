const element = (tagName, childNodes = [], attributes = []) => {
  const elem = { tagName, childNodes };
  attributes.forEach(([prop, value]) => (elem[prop] = value));

  return elem;
};

const html = (childNodes, attributes) =>
  element("html", childNodes, attributes);

const body = (childNodes, attributes) =>
  element("body", childNodes, attributes);

const div = (childNodes, attributes) => element("div", childNodes, attributes);

const span = (childNodes, attributes) =>
  element("span", childNodes, attributes);

module.exports = {
  html,
  body,
  div,
  span
};
