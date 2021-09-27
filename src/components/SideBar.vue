<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { key } from '../store';
import InboxIcon from '../icons/InboxIcon.vue';

export default defineComponent({
  name: 'SideBarComponent',
  components: {
    InboxIcon,
  },
  setup() {
    const store = useStore(key);

    const setSelectionGroup = (group: string) => {
      store.dispatch('setSelectionGroup', group);
    };

    return {
      setSelectionGroup,
      selectionGroup: computed(() => store.state.selectionGroup),
      allTags: computed(() => store.getters.getAllTags),
    };
  },
});
</script>

<template>
  <div
    class="
      fixed
      flex flex-col
      top-14
      left-0
      w-14
      hover:w-64
      md:w-64
      bg-background
      h-full
      text-gray
      transition-all
      duration-300
      border-none
      z-10
      sidebar
    "
  >
    <div
      class="
        overflow-y-auto overflow-x-hidden
        flex flex-col
        justify-between
        flex-grow
      "
    >
      <!-- TODO: componentize these sidebar selectors -->
      <ul class="flex flex-col py-4 space-y-1 mr-1">
        <li class="hover:text-blue-600">
          <a
            class="
              cursor-pointer
              flex flex-row
              items-center
              h-12
              rounded
              text-blue-400
              font-bold
              pr-6
            "
          >
            <span class="inline-flex justify-center items-center ml-4">
              <FontAwesomeIcon
                icon="plus-circle"
                class="ml-1 button text-blue-400"
              />
            </span>
            <span class="ml-2 text-sm tracking-wide truncate">Compose</span>
          </a>
        </li>
        <!-- inbox -->
        <li @click="setSelectionGroup('Inbox')">
          <a
            class="
              cursor-pointer
              relative
              flex flex-row
              items-center
              h-11
              focus:outline-none
              hover:bg-white
              hover:border-gray-800
              rounded
              text-white-600
              hover:text-white-800
              border-l-4 border-transparent
              pr-6
            "
            :class="{ active: selectionGroup === 'Inbox' }"
          >
            <span class="inline-flex justify-center items-center ml-4">
              <InboxIcon />
            </span>
            <span class="ml-2 text-sm tracking-wide truncate">Inbox</span>
          </a>
        </li>
        <li
          :class="{ selected: selectionGroup === 'Starred' }"
          @click="setSelectionGroup('Starred')"
        >
          <a
            href="#"
            class="
              cursor-pointer
              relative
              flex flex-row
              items-center
              h-11
              focus:outline-none
              hover:bg-white
              hover:border-gray-800
              rounded
              text-white-600
              border-l-4 border-transparent
              pr-6
            "
            :class="{ active: selectionGroup === 'Starred' }"
          >
            <span class="inline-flex justify-center items-center ml-4">
              <FontAwesomeIcon icon="star" class="ml-1 button" color="black" />
            </span>
            <span class="ml-2 text-sm tracking-wide truncate">Starred</span>
          </a>
          <!-- Trash -->
        </li>
        <li @click="setSelectionGroup('Trash')">
          <a
            href="#"
            class="
              cursor-pointer
              relative
              flex flex-row
              items-center
              h-11
              focus:outline-none
              hover:bg-white
              hover:border-gray-800
              rounded
              text-white-600
              border-l-4 border-transparent
              pr-6
            "
            :class="{ active: selectionGroup === 'Trash' }"
          >
            <span class="inline-flex justify-center items-center ml-4">
              <FontAwesomeIcon icon="trash" class="ml-1 button" color="black" />
            </span>
            <span class="ml-2 text-sm tracking-wide truncate">Trash</span>
          </a>
        </li>
        <!-- tags -->
        <li class="px-5 hidden md:block">
          <div class="flex flex-row items-center mt-5 h-8">
            <div
              class="text-sm font-light tracking-wide text-gray-400 uppercase"
            >
              Tags
            </div>
          </div>
        </li>
        <li
          v-for="tag in allTags"
          :key="tag"
          :class="{ selected: selectionGroup === tag }"
          @click="setSelectionGroup(tag)"
        >
          <!-- TODO: a tooltip would be nice here when in mobile view -->
          <a
            href="#"
            class="
              cursor-pointer
              relative
              flex flex-row
              items-center
              h-11
              focus:outline-none
              hover:bg-white
              hover:border-gray-800
              rounded
              text-white-600
              border-l-4 border-transparent
              pr-6
            "
            title=""
            :class="{ active: selectionGroup === tag }"
          >
            <span class="inline-flex justify-center items-center ml-4">
              <FontAwesomeIcon icon="tag" class="ml-1 button" color="black" />
            </span>
            <span class="ml-2 text-sm tracking-wide truncate">{{ tag }} </span>
          </a>
        </li>
      </ul>
      <p class="mb-14 px-5 py-3 hidden md:block text-center text-xs">
        A Salesloft Interview Project.
      </p>
    </div>
  </div>
</template>

<style>
.active {
  background: white;
  border-color: rgba(31, 41, 55, var(--tw-border-opacity));
}
</style>