class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renederer = renderer;

        this._element = document.querySelector(containerSelector);
        
        this.renderItems();
    }

    renderItems() {
        this._items.forEach((item) => {
            const card = this._renederer(item);
            this._element.append(card);
        })
    }

    addItem(item) {
        this._element.prepend(this._renederer(item));
    }
}

export default Section