class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renederer = renderer;

        this._element = document.querySelector(containerSelector);
    }

    renderItems() {
        this._items.forEach((item) => {
            const htmlElement = this._renederer(item);
            this.addItem(htmlElement);
        })
    }

    addItem(htmlElement) {
        this._element.append(htmlElement);
    }
}

export default Section