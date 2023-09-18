<template>
    <div class="wrapper">
        <FSpace>
            <FRadioGroup v-model="actionType">
                <FRadio value="loading">loading</FRadio>
                <FRadio value="emptyInitResult">emptyInitResult</FRadio>
                <FRadio value="emptyQueryResult">emptyQueryResult</FRadio>
                <FRadio value="noPermissions">noPermissions</FRadio>
            </FRadioGroup>
        </FSpace>
        <FSpace
            style="margin: 20px 0;"
            vertical
        >
            loading: <FInput v-model="loadingText.loading"></FInput>
            emptyInitResult: <FInput v-model="loadingText.emptyInitResult"></FInput>
            emptyQueryResult: <FInput v-model="loadingText.emptyQueryResult"></FInput>
            noPermissions: <FInput v-model="loadingText.noPermissions"></FInput>
        </FSpace>
        <BPageLoading
            :actionType="actionType"
            :loadingText="loadingText"
            @logout="logout"
        ></BPageLoading>
    </div>
</template>
<script setup lang="ts">
import { FRadioGroup, FSpace, FRadio, FInput, FMessage } from '@fesjs/fes-design';
import { ref } from 'vue';
import { BPageLoading } from '@fesjs/traction-widget';

const actionType = ref()
const loadingText = ref({
    loading: 'Loading. . .',
    emptyInitResult: '这里还没有数据. . .',
    emptyQueryResult: '没有符合条件的结果. . .',
    noPermissions: '暂无权限'
})
const logout = () => {
    FMessage.info('logout');
}

</script>

<style>
.switch {
    position: relative;
    z-index: 999;
}
</style>
