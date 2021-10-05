<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="max-w bg-background">
    <table
      v-if="messages.length"
      class="divide-y divide-gray-200 table-auto max-w border-2 border-gray-400"
    >
      <tbody class="bg-background divide-y divide-gray-400">
        <!-- TODO: move each row to a separate component -->
        <tr
          v-for="message in messages"
          :key="message.id"
          class="cursor-pointer transition-all bg-gray-100 hover:bg-gray-200"
          :class="{ selected: isSelected(message.id) }"
        >
          <td
            class="
              px-1
              md:px-3
              py-6
              flex-1
              whitespace-nowrap
              flex flex-column
              justify-center
              items-center
            "
          >
            <input
              @change="
                (e) =>
                  toggleSelectedMessage({
                    // @ts-ignore
                    isSelected: e.target.checked,
                    id: message.id,
                  })
              "
              :checked="isSelected(message.id)"
              type="checkbox"
              class="form-checkbox h-4 w-4 text-gray-600 cursor-pointer"
            />
            <button
              @click="
                starMessage({ id: message.id, isStarred: !message.starred })
              "
            >
              <FontAwesomeIcon
                icon="star"
                class="ml-4 button star"
                :color="message.starred ? '#ffc107' : 'gray'"
              />
            </button>
          </td>
          <td class="px-6 py-4 hidden md:table-cell">
            <div class="flex items-center">
              <div class="ml-4">
                <div class="text-xs md:text-sm font-medium text-gray-900">
                  {{ message.sender }}
                </div>
              </div>
            </div>
          </td>
          <td class="px-2 md:px-6 py-4">
            <div class="text-sm font-medium text-gray-900 md:hidden">
              {{ message.sender }}
            </div>
            <div class="text-sm text-gray-900">
              {{ message.subject }}
            </div>
            <div
              class="
                text-xs
                md:text-sm
                text-gray-500
                message-body
                overflow-ellipsis
              "
              v-html="message.body"
            ></div>
          </td>
          <td
            class="
              px-1
              pr-3
              md:px-6
              md:pr-6
              py-4
              whitespace-nowrap
              text-right text-xs
              md:text-sm
              font-medium
            "
            :title="message.date"
          >
            <span>{{ formatDate(message.date) }}</span>
            <button @click="deleteMessage({ id: message.id })">
              <FontAwesomeIcon
                icon="trash"
                class="ml-3 button delete"
                color="gray"
              />
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- No Results -->
    <div
      class="flex flex-col justify-center items-center bg-white empty-container"
      v-else
    >
      <div v-if="loading">Loading...</div>
      <div v-else class="flex flex-col items-center">
        <img src="http://placekitten.com/g/200/200" class="mb-3" alt="kitty" />
        No messages. Here is a cat.
        <span v-if="searchQuery"
          >Try expanding or
          <b
            class="cursor-pointer text-blue-500 hover:text-blue-400"
            @click="clearSearch"
            >clearing</b
          >
          your search</span
        >
      </div>
    </div>
  </div>
</template>



<script lang="ts">
import { defineComponent, computed, inject } from 'vue';
import { useStore } from 'vuex';
import { key } from '../store';

import { formatRelative } from 'date-fns';

export default defineComponent({
  name: 'InboxTable',
  setup() {
    const store = useStore(key);
    const toast: any = inject('toast');

    const formatDate = (date: string) => {
      return formatRelative(new Date(date), new Date());
    };

    const toggleSelectedMessage = ({
      isSelected,
      id,
    }: {
      isSelected: boolean;
      id: string;
    }) => {
      store.dispatch('selectMessages', { ids: [id], isSelected });
    };

    const starMessage = ({
      id,
      isStarred,
    }: {
      id: string;
      isStarred: boolean;
    }) => {
      store.dispatch('toggleIndividualStar', { id, isStarred });
    };

    const deleteMessage = ({ id }: { id: string }) => {
      store.dispatch('deleteIndividualMessage', { id });
      toast.show('Message deleted');
    };

    const isSelected = (id: string) => {
      return store.getters.isSelected(id);
    };

    const clearSearch = () => {
      store.dispatch('setSearchQuery', '');
    };

    return {
      messages: computed(() => store.getters.getFilteredMessages),
      searchQuery: computed(() => store.state.searchQuery),
      loading: computed(() => store.state.loading),
      error: computed(() => store.state.error), // TODO: handle error
      formatDate,
      toggleSelectedMessage,
      starMessage,
      deleteMessage,
      isSelected,
      clearSearch,
    };
  },
});
</script>

<style>
.message-body {
  max-width: 60vw;
  overflow: hidden;
  max-height: 18px;
}
.empty-container {
  height: calc(100vh - 190px);
}
.button:hover {
  opacity: 0.6;
}
</style>