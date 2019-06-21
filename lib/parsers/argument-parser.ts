export default class ArgumentParser {
    public raw: string[];

    constructor(raw: string[]) {
        this.raw = raw;
    }

    get(i: number) {
        return this.raw[i];
    }

    has(i: number) {
        return !this.raw[i];
    }

    slice(i: number, start?: number, end?: number) {
        const arg = this.get(i);
        return arg.slice(start, end);
    }

    join(sep: string = ' ') {
        return this.raw.join(sep);
    }
}