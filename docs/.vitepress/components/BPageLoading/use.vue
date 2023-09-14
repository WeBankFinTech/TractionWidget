<template>
    <div class="wrapper">
        <FSwitch v-model="val" @change="handleChange" class="switch">
            <template #active>page</template>
            <template #inactive>normal</template>
        </FSwitch>
        <BPageLoading :type="type"></BPageLoading>
    </div>
</template>
<script setup lang="ts">
import { FSwitch } from '@fesjs/fes-design';
import { ref } from 'vue';
import { BPageLoading } from '@webank/bdp-design';

const type = ref('normal')
const val = ref(false);
const handleChange = (value: boolean) => {
    if(value) {
        type.value = 'page';
    } else {
        type.value = 'normal';
    }
};

</script>

<style>
.switch {
    position: relative;
    z-index: 999;
}
</style>