//adds elements to the DOM

export default class Section {
  constructor(containerSelector) {
    // this._renderedItems = items;
    // this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // renderItems() {
  //   this._renderedItems.forEach((item) => {
  //     this._renderer(item);
  //   });
  // }

  appendItem(item) {
    this._container.append(item);
  }

  prependItem(item) {
    this._container.prepend(item);
  }
}
