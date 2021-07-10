class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;

        this._element = document.querySelector(containerSelector);
    }

    renderItems(cards) {
        cards.forEach((item) => this._renderer(item))
    }

    addItem(card) {
        this._element.prepend(card);
    }
}

export default Section