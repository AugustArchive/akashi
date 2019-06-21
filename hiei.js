const { Coordinator, Shell } = require('@yamashiro/hiei');
const coordinator = new Coordinator();
const shell = new Shell();

coordinator
    .register({
        name: 'build',
        run: () => {
            const tsc = shell.executeSync('tsc');
            if (!tsc) return false;
            return true;
        }
    })
    .run();