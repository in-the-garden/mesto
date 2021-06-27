class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;

        this._element = document.querySelector(containerSelector);
        this.renderItems();
    }

    renderItems() {
        this._items.forEach((item) => this.addItem(item))
    }

    addItem(card) {
        this._element.prepend(this._renderer(card));
    }
}

export default Section