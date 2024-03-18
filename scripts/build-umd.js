/* eslint-disable @typescript-eslint/no-var-requires */
const fse = require('fs-extra');
const path = require('path');
const rollup = require('rollup');
const replace = require('@rollup/plugin-replace');
const { minify } = require('terser');

const { getRollupConfig, OUTPUT_DIR } = require('./build-shard');
const SOURCE = path.join(__dirname, '../packages/traction-widget/components');

fse.mkdirsSync(OUTPUT_DIR);

async function compiler () {
    const rollupConfig = getRollupConfig();
    rollupConfig.plugins.push(
        replace({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    );
    const bundle = await rollup.rollup(rollupConfig);
    const outputFilePath = path.join(OUTPUT_DIR, 'traction-widget.js');

    await bundle.write({
        file: outputFilePath,
        format: 'umd',
        name: 'TractionWidget',
        exports: 'named',
        globals: {
            vue: 'Vue'
        }
    });
    const compressResult = await minify(
        fse.readFileSync(outputFilePath, 'utf-8'),
        { sourceMap: false }
    );
    fse.outputFileSync(
        path.join(OUTPUT_DIR, 'traction-widget.min.js'),
        compressResult.code
    );
    fse.copySync(path.join(SOURCE, 'assets'), path.join(OUTPUT_DIR, 'assets'), { overwrite: true });
}

compiler();
