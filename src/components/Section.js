//adds elements to the DOM

export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }

  addItemByAppending(item) {
    this._container.append(item);
  }

  addItemByPrepending(item) {
    this._container.prepend(item);
  }
}
