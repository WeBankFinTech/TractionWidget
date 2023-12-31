const path = require('path');
const rollup = require('rollup');
const babel = require('@rollup/plugin-babel');
const vuePlugin = require('rollup-plugin-vue');
const {
    nodeResolve
} = require('@rollup/plugin-node-resolve');
const renameExtensions = require('@betit/rollup-plugin-rename-extensions').default;

const {
    extensions
} = require('./build-shard');
const injectCss = require('./injectcss');

const fse = require('fs-extra');

const SOURCE = path.join(__dirname, '../packages/traction-widget/components');
const OUTPUT_DIR = path.join(__dirname, '../packages/traction-widget/es/components');

async function compiler (codePath, outputDir) {
    const extname = path.extname(codePath);
    const outputPath = path.join(
        outputDir,
        `${path.basename(codePath, extname)}.js`
    );
    const bundle = await rollup.rollup({
        input: codePath,
        onwarn (warning, warn) {
            // 跳过未使用模块的警告（tree-shaking 会将其移除）
            if (warning.code === 'UNUSED_EXTERNAL_IMPORT') {
                return;
            }

            // Use default for everything else
            warn(warning);
        },
        external: (id) => {
            if (id.includes(codePath)) {
                return false;
            }

            return true;
        },
        plugins: [
            nodeResolve({
                extensions
            }),
            renameExtensions({
                mappings: {
                    '.vue': '.js',
                    '.ts': '.js',
                    '.tsx': '.js'
                }
            }),
            vuePlugin({
                preprocessStyles: false,
                target: 'browser'
            }),
            injectCss(),
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
                    ['@babel/plugin-transform-runtime', {
                        useESModules: true
                    }]
                ]
            })
        ]
    });

    await bundle.write({
        file: outputPath,
        format: 'esm'
    });

    // closes the bundle
    await bundle.close();
    fse.copySync(path.join(SOURCE, 'assets'), path.join(OUTPUT_DIR, 'assets'), { overwrite: true });
}

module.exports = compiler;
