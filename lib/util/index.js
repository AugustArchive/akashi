module.exports = class AkashiUtil {
    /**
     * Turns a 3 byte int to rgb form.
     * @param {number} a The first number
     * @param {number} b The middle number
     * @param {number} c The last number
     * @returns The bytecode
     */
    static rgbToInt(a, b, c) {
        // Credit: https://stackoverflow.com/a/8468879
        return (a & 0xff) << 16 + (b & 0xff) << 8 + (c & 0xff);
    }

    /**
     * Formats number that have many zeros and humanizes it
     * @param {number} num The number
     */
    static formatNumber(num) {
        const fl = Number.parseFloat(num);
        return fl.toLocaleString(undefined, { maximumFractionDigits: 2 });
    }

    /**
     * Utility to make 1 letter of an word uppercase
     * @param {string} str The string
     * @param {string} [spl=' '] Splitting the text (optional)
     */
    static uppercase(str, spl = ' ') {
        return str
            .split(spl)
            .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
            .join(' ');
    }

    /**
     * Truncates a string longer then the `num` provided, it will truncate it.
     * @param {string} str The string to truncate
     * @param {number} [spl=2000] The splitter
     */
    static elipisis(str, spl = 2000) {
        return str.length > spl? `${str.substr(0, spl - 3)}...`: str;
    }

    /**
     * Resolves a string
     * @param {StringResolvable} str The string
     */
    static resolveString(str) {
        if (str instanceof Array) return str.join('\n');
        if (typeof str === 'string') return str;
        return String(str);
    }

    /**
     * Resolves a colour
     * @param {ColorResolvable} color The color
     */
    static resolveColor(color) {
        if (color instanceof Array) color = YamashiroUtil.rgbToInt(color[0], color[1], color[2]);
        if (color < 0 || color > 0xFFFFFF) throw new RangeError('Color cannot be less then 0 and over #FFFFFF (White)');
        if (color && isNaN(color)) throw new TypeError('Color wasn\'t a number.');
        return color;
    }

    /**
     * Clones an object
     * @param {object} obj The object
     */
    static clone(obj) {
        const cloned = Object.create(obj);
        return Object.assign(obj, cloned);
    }

    /**
     * Randomizes 2 numbers
     * @param {number} o The first number
     * @param {number} s The second number
     */
    static randomNumber(o, s) {
        return Math.floor(Math.random() * (s - o + 1)) + o;
    }

    /**
     * Parses a platfrom
     * @param {NodeJS.Platform} platform The platform to stringify
     */
    static parsePlatform(platform) {
        switch (platform) {
            case 'aix': return 'Linux';
            case 'sunos': return 'Linux';
            case 'win32': return 'Windows';
            case 'linux': return 'Linux';
            case 'darwin': return 'Macintosh';
            case 'freebsd': return 'Linux';
            case 'openbsd': return 'Linux';
            case 'android': return 'Android';
            default: return 'Unknown OS';
        }
    }

    /**
     * Formats bytes into strings
     * @param {number} bytes The bytes to format
     */
    static formatBytes(bytes) {
        const kb = bytes / 1024;
        const mb = kb / 1024;
        const gb = mb / 1024;
        if (kb < 1024) return `${kb.toFixed().toLocaleString()}KB`;
        if (kb > 1024 && mb < 1024) return `${mb.toFixed().toLocaleString()}MB`;
        return `${gb.toFixed().toLocaleString()}GB`;
    }
}