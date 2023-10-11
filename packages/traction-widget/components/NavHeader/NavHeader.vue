<template>
    <div class="wd-nav-header">
        <LeftOutlined v-if="isShowArrow" class="back" @click="handleArrowClick" />
        <div class="name">{{title}}</div>
        <div v-if="isSlot" class="suffix">
            <slot name="suffix"></slot>
        </div>
    </div>
</template>
<script setup lang="ts">
import { defineProps, defineEmits, useSlots } from 'vue';
import { LeftOutlined } from '@fesjs/fes-design/icon';

const isSlot = !!useSlots().suffix;
// eslint-disable-next-line no-unused-vars
const props = defineProps({
    title: {
        type: String,
        required: true
    },
    isShowArrow: {
        type: Boolean,
        required: false,
        default: true
    }
});

const emit = defineEmits(['back']);

const handleArrowClick = () => {
    emit('back');
};

</script>
<script lang="ts">
export default {
    name: 'BNavHeader'
};
</script>
