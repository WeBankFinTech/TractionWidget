<template>
  <FDrawer v-model:show="isShow" title="Playground" displayDirective="show" width="90%" @ok="isShow = false">
    <Repl :store="store" :showImportMap="true" :showCompileOutput="false" :clearConsole="false" />
  </FDrawer>
</template>
<script setup lang="ts">
import {
    version,
    watch,
    ref
} from 'vue';

import { FDrawer } from '@fesjs/fes-design';
import {
    Repl,
    ReplStore
} from '@vue/repl';
import data from './demoCode.json';
import '@vue/repl/style.css';

const props = defineProps({
    codeName: String
});

const mainFile = 'App.vue';
const demoFile = 'demo.vue';

const store = new ReplStore({
    defaultVueRuntimeURL: `https://npm.elemecdn.com/vue@${version}/dist/vue.esm-browser.js`
});

const fesDesignSetup = `
        // 不要修改此文件!!!
        import { getCurrentInstance } from 'vue';
        import Space from './space.vue';
        import FesDesign from '@fesjs/fes-design';
        import * as Icons from '@fesjs/fes-design/icon';
        export function loadStyle() {
          const hasLinks = document.querySelectorAll('link');
          for(let l of hasLinks) {
            if (/fes-design.min.css/.test(l.href)) return;
          }
        
          const link = document.createElement('link')
            link.rel = 'stylesheet'
            link.href = 'https://npm.elemecdn.com/@fesjs/fes-design@latest/dist/fes-design.min.css';
            document.head.appendChild(link)
        }
        
        export function setupFesDesign() {
          loadStyle();
          const instance = getCurrentInstance()
          instance.appContext.app.use(FesDesign);
          Object.keys(Icons).forEach((iconName) => {
              instance.appContext.app.component(iconName, Icons[iconName]);
          });
          instance.appContext.app.component('Space', Space)
        }
        `;

function resolveSFCExample (demo) {
    const files = {
        [mainFile]: data.app,
        'space.vue': data.space,
        [demoFile]: data[demo],
        'fes-design.js': fesDesignSetup,
        'import-map.json': JSON.stringify({
            imports: {
                '@fesjs/fes-design': 'https://npm.elemecdn.com/@fesjs/fes-design@latest/dist/fes-design.esm-browser.js',
                '@fesjs/fes-design/icon': 'https://npm.elemecdn.com/@fesjs/fes-design@latest/dist/fes-design.icon-browser.js'
            }
        })
    };
    return files;
}

function updateExample (fileName) {
    store.setFiles(resolveSFCExample(fileName), mainFile).then(() => {
        store.setActive(demoFile);
    });
}

const isShow = ref(true);
const handleShow = (val) => {
    isShow.value = val;
};

defineExpose({
    isShow,
    handleShow
});

watch(props.codeName, () => {
    updateExample(props.codeName);
}, {
    immediate: true
});
</script>
<style lang="less" scoped>
.vue-repl {
  border-right: 1px solid var(--vt-c-divider-light);
  height: calc(100vh - 88px);
}
</style>
