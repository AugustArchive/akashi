export default class AkashiUtil {
    static rgbToInt(a: number, b: number, c: number) {
        // Credit: https://stackoverflow.com/a/8468879
        return (a & 0xff) << 16 + (b & 0xff) << 8 + (c & 0xff);
    }

    static resolveString(str: string | string[]) {
        if (str instanceof Array) return str.join('\n');
        if (typeof str === 'string') return str;
        return String(str);
    }

    static resolveColor(color: number | number[]) {
        if (color instanceof Array) color = AkashiUtil.rgbToInt(color[0], color[1], color[2]);
        if (color < 0 || color > 0xFFFFFF) throw new RangeError('Color cannot be less then 0 and over #FFFFFF (White)');
        if (color && isNaN(color)) throw new TypeError('Color wasn\'t a number.');
        return Number(color);
    }

    static clone<T>(obj: any): T {
        const cloned = Object.create(obj);
        return Object.assign<any, T>(obj, cloned);
    }

    static randomNumber(o: number, s: number) {
        return Math.floor(Math.random() * (s - o + 1)) + o;
    }

    static parsePlatform(platform: NodeJS.Platform) {
        switch (platform) {
            case 'aix': return 'Linux';
            case 'sunos': return 'Linux';
            case 'win32': return 'Windows';
            case 'linux': return 'Linux';
            case 'darwin': return 'Macintosh';
            case 'freebsd': return 'Linux';
            case 'openbsd': return 'Linux';
            case 'android': return 'Android';
            default: return 'Unknown';
        }
    }

    static formatBytes(bytes: number) {
        const kb = bytes / 1024;
        const mb = kb / 1024;
        const gb = mb / 1024;
        if (kb < 1024) return `${kb.toFixed().toLocaleString()}KB`;
        if (kb > 1024 && mb < 1024) return `${mb.toFixed().toLocaleString()}MB`;
        return `${gb.toFixed().toLocaleString()}GB`;
    }
}