<template>
    <span class="wd-column-tip">
        <FTooltip mode="popover">
            <InfoCircleOutlined class="wd-hint-icon-column" />
            <template #content>
                <div style="width: 300px;">
                    {{tipText}}
                </div>
            </template>
        </FTooltip>
    </span>
</template>
<script setup>
import {
    defineProps
} from 'vue';
import { InfoCircleOutlined } from '@fesjs/fes-design/icon';
import { FTooltip } from '@fesjs/fes-design';

defineProps({
    tipText: {
        type: String,
        default: ''
    }
});
</script>
