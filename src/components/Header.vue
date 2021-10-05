<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { key } from '../store';
import SearchIcon from '../icons/SearchIcon.vue';

export default defineComponent({
  name: 'HeaderComponent',
  components: {
    SearchIcon,
  },
  setup() {
    const store = useStore(key);

    return {
      searchQuery: computed({
        get: () => store.state.searchQuery,
        set: (query: string) => store.dispatch('setSearchQuery', query),
      }),
    };
  },
});
</script>

<template>
  <div
    class="
      fixed
      w-full
      flex
      items-center
      justify-between
      h-14
      text-white
      z-10
      border-b-2 border-gray-400
    "
  >
    <div
      class="
        flex
        items-center
        justify-start
        md:justify-center
        md:w-64
        pl-3
        w-14
        h-14
        bg-background
        font-bold
        text-blue-500 text-xs
      "
    >
      <img src="/assets/smail_logo.png" alt="Smail" class="h-8 md:h-12" />
    </div>
    <div
      class="
        flex
        items-center
        justify-center
        h-14
        bg-true-gray-200
        header-right
        bg-background
        w-full
      "
    >
      <div
        class="
          bg-white
          rounded
          flex
          items-center
          w-full
          max-w-xl
          mr-4
          p-2
          shadow-sm
          border border-gray-200
        "
      >
        <button class="outline-none focus:outline-none">
          <SearchIcon />
        </button>
        <input
          v-model="searchQuery"
          type="search"
          name="search"
          placeholder="Crawl Through Messages"
          class="
            w-full
            pl-3
            text-sm text-black
            outline-none
            focus:outline-none
            bg-transparent
          "
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
