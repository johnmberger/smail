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
      <button
        @click="starSelectedMessages"
        class="hover:text-opacity-60 text-gray-600 button"
      >
        <FontAwesomeIcon icon="star" class="ml-4" color="gray" />
        Star
      </button>
      <button
        @click="unstarSelectedMessages"
        class="hover:text-opacity-60 text-gray-600 button"
      >
        <FontAwesomeIcon icon="star-half" class="ml-4" color="gray" />
        Unstar
      </button>
      <button
        @click="deleteSelectedMessages"
        class="hover:text-opacity-60 text-gray-600 button"
      >
        <FontAwesomeIcon icon="trash" class="ml-4" color="gray" />
        Delete
      </button>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, inject } from 'vue';
import { useStore } from 'vuex';
import { key } from '../store';

export default defineComponent({
  name: 'ToolBar',
  setup() {
    const store = useStore(key);
    const toast: any = inject('toast');

    const selectedMessageIds = computed(() => store.state.selectedMessageIds);
    const numberOfMessagesSelected = computed(
      () => selectedMessageIds.value.length,
    );

    const selectAllMessages = (isSelected: boolean) => {
      store.dispatch('selectAllMessages', { isSelected });
    };

    const starSelectedMessages = () => {
      store.dispatch('toggleStarred', { isStarred: true });
      toast.show(
        `${numberOfMessagesSelected.value} message${
          numberOfMessagesSelected.value === 1 ? '' : 's'
        } starred`,
      );
    };

    const unstarSelectedMessages = () => {
      store.dispatch('toggleStarred', { isStarred: false });
      toast.show(
        `${numberOfMessagesSelected.value} message${
          numberOfMessagesSelected.value === 1 ? '' : 's'
        } unstarred`,
      );
    };

    const deleteSelectedMessages = () => {
      store.dispatch('toggleDeleted', { isDeleted: true });
      toast.show(
        `${numberOfMessagesSelected.value} message${
          numberOfMessagesSelected.value === 1 ? '' : 's'
        } deleted`,
      );
    };

    return {
      selectAllMessages,
      starSelectedMessages,
      unstarSelectedMessages,
      deleteSelectedMessages,
      allSelected: computed(() => store.getters.allSelected),
      selectionGroup: computed(() => store.state.selectionGroup),
      selectedMessageIds,
    };
  },
});
</script>