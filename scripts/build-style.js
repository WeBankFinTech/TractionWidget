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
    const tempFilePath = path.join(OUTPUT_DIR, 'temp.css');
    await compilerCss(STYLE_SOURCE, tempFilePath);

    let cssContent = fse.readFileSync(tempFilePath, 'utf-8');

    // 替换路径
    cssContent = cssContent.replace(/(\.\.\/\.\.\/assets\/)/g, './assets/');

    fse.outputFileSync(tempFilePath, cssContent);

    const outputFilePath = path.join(OUTPUT_DIR, 'traction-widget.css');
    fse.moveSync(tempFilePath, outputFilePath, { overwrite: true });

    const compressResult = csso.minify(cssContent);

    fse.outputFileSync(
        path.join(OUTPUT_DIR, 'traction-widget.min.css'),
        compressResult.css
    );
}

main();
