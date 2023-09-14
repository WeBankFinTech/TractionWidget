const execa = require('execa');
const os = require('os');
const run = (rBin, rArgs, opts = {}) =>
    execa(rBin, rArgs, { stdio: 'inherit', ...opts });

if (['Darwin', 'Linux'].includes(os.type())) {
    run('npm', ['run', 'build.unix'], {
        stdio: 'inherit'
    });
} else if (['Windows_NT'].includes(os.type())) {
    run('npm', ['run', 'build.win'], {
        stdio: 'inherit'
    });
}
