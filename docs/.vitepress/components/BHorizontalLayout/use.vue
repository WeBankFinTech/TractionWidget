<template>
    <div style="height: 500px">
        <BHorizontalLayout v-model:curPath="currentPath" :menus="menus" @menuChange="onMenuClick" @sideBarCollapse="onSideBarCollapse" footText="自定义注脚">
            <template v-slot:top>
                    顶部内容
            </template>
            <template v-slot:container>
                <div>
                    右侧容器内容使用slot插槽,
                    当前选择菜单路径：{{currentPath}}
                </div>
            </template>
        </BHorizontalLayout>
    </div>
</template>
<script setup lang="ts">
import { ref, h} from 'vue';
import { BHorizontalLayout } from '@fesjs/traction-widget';
import { AppstoreOutlined, DateOutlined,ClusterOutlined, SettingOutlined } from '@fesjs/fes-design/icon';

const currentPath = ref<string>('/tasks');
const menus = ref([{
    label: '任务查询',
    value: '/tasks',
    icon: () => h(AppstoreOutlined),
}, {
    label: '我的项目',
    value: '/rules',
    icon: () => h(SettingOutlined),
    children: [{
        label: '规则查询一个很长想看下省略效果的标题',
        value: '/rules/query',
        icon: () => h(DateOutlined),
    }, {
        label: '规则模板',
        value: '/rules/template',
        icon: () => h(ClusterOutlined),
    }]
},{
    label: '我的项目2',
    value: '/rules2',
    icon: () => h(SettingOutlined),
    children: [{
        label: '规则查询一个很长想看下省略效果的标题2',
        value: '/rules2/query',
        icon: () => h(DateOutlined),
    }, {
        label: '规则模板2',
        value: '/rules2/template',
        icon: () => h(ClusterOutlined),
    }]
},
{
    label: '任务查询1',
    value: '/tasks1',
    icon: () => h(AppstoreOutlined),
},{
    label: '任务查询2',
    value: '/tasks2',
    icon: () => h(AppstoreOutlined),
},{
    label: '任务查询3',
    value: '/tasks3',
    icon: () => h(AppstoreOutlined),
},{
    label: '任务查询4',
    value: '/tasks4',
    icon: () => h(AppstoreOutlined),
},{
    label: '任务查询5',
    value: '/tasks5',
    icon: () => h(AppstoreOutlined),
},{
    label: '任务查询6',
    value: '/tasks6',
    icon: () => h(AppstoreOutlined),
},{    label: '任务查询7',
    value: '/tasks7',
    icon: () => h(AppstoreOutlined),
},{    label: '任务查询8',
    value: '/tasks8',
    icon: () => h(AppstoreOutlined),
},{    label: '任务查询9',
    value: '/tasks9',
    icon: () => h(AppstoreOutlined),
},{
    label: '任务查询10',
    value: '/tasks10',
    icon: () => h(AppstoreOutlined),
}]);

const onMenuClick = (v: any) => {
    currentPath.value = v.value;
    console.log('onMenuClick-菜单跳转', currentPath.value);
};

const onSideBarCollapse = (v:Boolean) => {
    if (v) {
        console.log('侧边栏折叠')
    } else {
        console.log('侧边栏展开')
    }
}
</script>