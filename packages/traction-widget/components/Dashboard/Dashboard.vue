<template>
    <div class="wd-dashboard">
      <div v-for="(item, index) in sections" :key="index" class="wd-dashboard-section">
        <div class="wd-dashboard-section__header">
          <h3 class="wd-dashboard-section__title" style="margin:0">{{ item.title }}</h3>
        </div>
        <div class="wd-dashboard-section__content">
          <slot :name="item.name"></slot>
        </div>
      </div>
    </div>
  </template>

<script lang="ts">
export default {
    name: 'BDashboard',
    props: {
        sections: {
            type: Array<{ title: string; name: string }>,
            required: true,
            default: () => []
        }
    }
};
</script>
