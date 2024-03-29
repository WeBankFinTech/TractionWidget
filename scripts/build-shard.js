
const path = require('path');
const json = require('@rollup/plugin-json');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const vuePlugin = require('rollup-plugin-vue');
const commonjs = require('@rollup/plugin-commonjs');
const babel = require('@rollup/plugin-babel');
const copy = require('rollup-plugin-copy');
const postcss = require('rollup-plugin-postcss');

const SOURCE_PATH = path.join(__dirname, '../packages/traction-widget/components/index.ts');
const OUTPUT_DIR = path.join(__dirname, '../packages/traction-widget/dist');
const ASSEETS_DIR = path.join(__dirname, '../packages/traction-widget/components/assets');
const extensions = ['.js', '.jsx', '.ts', '.tsx', '.vue', '.json'];

const getRollupConfig = (config = {}) => ({
    input: SOURCE_PATH,
    onwarn (warning, warn) {
        // 跳过未使用模块的警告（tree-shaking 会将其移除）
        if (warning.code === 'UNUSED_EXTERNAL_IMPORT') { return; }

        // Use default for everything else
        warn(warning);
    },
    external: ['vue'],
    plugins: [
        json(),
        nodeResolve({
            extensions
        }),
        vuePlugin({
            compileTemplate: true,
            preprocessStyles: false,
            target: 'browser'
        }),
        commonjs(),
        babel.babel({
            targets: 'defaults, Chrome >= 56, not IE 11',
            babelHelpers: 'runtime',
            extensions,
            presets: [
                '@babel/env',
                [
                    '@babel/preset-typescript',
                    {
                        allExtensions: true,
                        onlyRemoveTypeImports: true,
                        isTSX: true,
                        jsxPragma: 'h',
                        jsxPragmaFrag: 'Fragment'
                    }
                ]
            ],
            plugins: [
                [
                    '@vue/babel-plugin-jsx',
                    {
                        enableObjectSlots: false
                    }
                ],
                ['@babel/plugin-transform-runtime', { useESModules: true }]
            ]
        }),
        postcss({
            extract: false
        }),
        // asserts目录拷贝到产物
        copy({
            targets: [
                { src: ASSEETS_DIR, dest: OUTPUT_DIR }
            ]
        })
    ],
    ...config
});

module.exports = {
    OUTPUT_DIR,
    SOURCE_PATH,
    getRollupConfig,
    extensions
};
