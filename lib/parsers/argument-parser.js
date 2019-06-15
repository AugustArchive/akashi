module.exports = class ArgumentParser {
    /**
     * Create a new instance of the Argument Parser
     * @param {string[]} args The arguments
     */
    constructor(args) {
        this.args = args;
    }

    /**
     * Seperates the arguments
     * @param {string} [sep=' '] The seperator
     */
    gather(sep = ' ') {
        return this.args.join(sep);
    }

    /**
     * Checks if the `index` is empty
     * @param {number} index The index to check
     */
    isEmpty(index) {
        return !this.args[index];
    }

    /**
     * Gets the argument
     * @param {number} index The index to get
     */
    get(index) {
        return this.args[index];
    }
    
    /**
     * Slices the argument
     * Equlivent to `Array<string>.slice`
     * @param {number} arg The argument to slice
     * @param {number} [start] The start of the slice
     * @param {number} [end] The end of the slicing
     */
    slice(arg, start, end) {
        return this.get(arg).slice(start, end);
    }
};