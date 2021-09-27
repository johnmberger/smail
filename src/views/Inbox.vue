<script lang="ts">
// vue and vuex
import { defineComponent, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { key } from '../store';
// components
import InboxTable from '../components/InboxTable.vue';
import ToolBar from '../components/ToolBar.vue';

export default defineComponent({
  name: 'InboxComponent',
  components: {
    InboxTable,
    ToolBar,
  },
  setup() {
    const store = useStore(key);

    onMounted(() => {
      store.dispatch('getMessages');
      // TODO: add some sort of interval to refresh fetching
    });

    return {
      messages: computed(() => store.getters.getFilteredMessages),
      loading: computed(() => store.state.loading),
      error: computed(() => store.state.error),
    };
  },
});
</script>

<template>
  <div class="mt-14 ml-14 md:ml-64">
    <div class="shadow border-b border-gray-200 .inbox-wrapper">
      <ToolBar />
      <InboxTable />
    </div>
  </div>
</template>

<style>
.inbox-wrapper {
  width: calc(100vw - 48px);
}
</style>