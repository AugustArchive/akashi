module.exports = class PaginationBuilder {
    /**
     * Creates a new base instance of the `PaginationBuilder` interface
     * @param {any[]} [pages=[]] The pages
     * @param {number} [pageLength=10] The page length 
     */
    constructor(pages = [], pageLength = 10) {
        this.pages      = pages;
        this.pageLength = pageLength;
    }

    /**
     * Paginate the builder
     * @param {string} page THe page to go through
     */
    paginate(page) {
        let ph = parseInt(page);
        const max = Math.ceil(this.pages.length / this.pageLength);

        if (ph < 1) ph = 1;
        if (ph > max) ph = max;
        const start = (ph - 1);

        return {
            items: this.pages.length > this.pageLength? this.pages.slice(start, start + this.pageLength): this.pages,
            page: ph,
            max
        };
    }
}