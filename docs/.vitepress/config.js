
import { defineConfig } from 'vitepress';
import vueJsx from '@vitejs/plugin-vue-jsx';

import path from 'path';

import { genComponentDoc } from './scripts/genComponentDoc.js';
genComponentDoc();

const ssrTransformCustomDir = () => ({
    props: [],
    needRuntime: true
});

const BASE_URL = process.env.NODE_ENV === 'production' ? '/p/traction-widget/' : '/';

export default defineConfig({
    base: BASE_URL,
    lang: 'zh-CN',
    title: '@fesjs/traction-widget',
    description: '集合大型中台前端使用的通用组件和工具函数',
    vite: {
        define: {
            __VUE_OPTIONS_API__: false
        },
        server: {
            watch: {
                ignored: ['**/docs/.vueepress/components/**']
            }
        },
        optimizeDeps: {
            exclude: ['@vue/repl']
        },
        ssr: {
            // lodash-es 模块是 esm，ssr 渲染的时候编译成 cjs 的引入方式，会引发 nodejs 的模块加载异常错误
            noExternal: ['lodash-es', '@fesjs/fes-design', '@fesjs/fes-design/icon'],
            external: ['@vue/repl']
        },
        resolve: {
            extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
            alias: {
                '@fesjs/traction-widget': path.resolve(
                    __dirname,
                    '../../packages/traction-widget/es/components'
                )
            }
        },
        json: {
            stringify: true
        },
        plugins: [vueJsx({})]
    },
    vue: {
        template: {
            ssr: true,
            compilerOptions: {
                directiveTransforms: {
                    drag: ssrTransformCustomDir,
                    mousewheel: ssrTransformCustomDir,
                    sticky: ssrTransformCustomDir
                }
            }
        }
    },
    themeConfig: {
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © webank'
        },
        nav: [{
            text: '快速上手',
            link: '/start'
        }, {
            text: '组件',
            link: '/components/BTagsPanel'
        },
        {
            text: '函数',
            link: '/utils/isIE'
        },
        {
            text: 'Easy Code',
            link: 'https://mumblefe.cn/p/easycode/#/chat'
        }
    ],
        sidebar: {
            '/components/': [
                {
                    text: '数据操作组件',
                    items: [
                        { text: 'BTagsPanel', link: '/components/BTagsPanel' },
                        { text: 'BTagSelector', link: '/components/BTagSelector' },
                        { text: 'BTableHeaderConfig', link: '/components/BTableHeaderConfig' },
                        { text: 'BSearch', link: '/components/BSearch' },
                        { text: 'BDynamicForms', link: '/components/BDynamicForms'},
                    ]
                },
                {
                    text: '布局组件',
                    items: [
                        { text: 'BPageLoading', link: '/components/BPageLoading' },
                        { text: 'BHorizontalLayout', link: '/components/BHorizontalLayout' },
                        { text: 'BVerticalLayout', link: '/components/BVerticalLayout' },
                        { text: 'BTablePage', link: '/components/BTablePage' },
                        { text: 'BNavBar', link: '/components/BNavBar'},
                        { text: 'BNavHeader', link: '/components/BNavHeader'},
                    ]
                }
            ],
            '/utils/': [{
                text: '函数',
                items: [
                    { text: 'isIE', link: '/utils/isIE' },
                    { text: 'getUrlParams', link: '/utils/getUrlParams' },
                    { text: 'forceDownload', link: '/utils/forceDownload' },
                    { text: 'formatterEmptyValue', link: '/utils/formatterEmptyValue' },
                    { text: 'validate', link: '/utils/validate'},
                    { text: 'format', link: '/utils/format'}
                ]
            }]
        }
    }
});
