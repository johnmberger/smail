<template>
  <div class="bg-background">
    <h1 class="p-3 text-4xl">{{ selectionGroup }}</h1>
  </div>
  <div
    class="toolbar px-3 py-2 border-2 border-gray-400 flex h-full items-center"
  >
    <input
      @change="
        (e) =>
          selectAllMessages(
            // @ts-ignore
            e.target.checked || false,
          )
      "
      :checked="allSelected"
      type="checkbox"
      class="form-checkbox h-4 w-4 text-gray-600 cursor-pointer"
    />
    <span v-show="selectedMessageIds.length">
      <button @click="starSelectedMessages">
        <FontAwesomeIcon icon="star" class="ml-4 button star" color="gray" />
      </button>
      <button @click="deleteSelectedMessages">
        <FontAwesomeIcon icon="trash" class="ml-4 button star" color="gray" />
      </button>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { key } from '../store';

export default defineComponent({
  name: 'ToolBar',
  setup() {
    const store = useStore(key);

    const selectAllMessages = (isSelected: boolean) => {
      store.dispatch('selectAllMessages', { isSelected });
    };

    const starSelectedMessages = () => {
      store.dispatch('toggleStarred', { isStarred: true });
    };

    const deleteSelectedMessages = () => {
      store.dispatch('toggleDeleted', { isDeleted: true });
    };

    return {
      selectAllMessages,
      starSelectedMessages,
      deleteSelectedMessages,
      allSelected: computed(() => store.getters.allSelected),
      selectionGroup: computed(() => store.state.selectionGroup),
      selectedMessageIds: computed(() => store.state.selectedMessageIds),
    };
  },
});
</script>