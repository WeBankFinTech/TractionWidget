const path = require('path');
const fse = require('fs-extra');
const csso = require('csso');
const { compilerCss } = require('./compilerCss.js');
const { OUTPUT_DIR } = require('./build-shard');

function getProjectRootDir () {
    return process.cwd();
}
const rootDir = getProjectRootDir();
const STYLE_SOURCE = path.join(rootDir, './packages/traction-widget/components/_style.ts');

fse.mkdirsSync(OUTPUT_DIR);

async function main () {
    const outputFilePath = path.join(OUTPUT_DIR, 'traction-widget.css');
    await compilerCss(STYLE_SOURCE, outputFilePath);
    const compressResult = csso.minify(
        fse.readFileSync(outputFilePath, 'utf-8')
    );
    fse.outputFileSync(
        path.join(OUTPUT_DIR, 'traction-widget.min.css'),
        compressResult.css
    );
}

main();
