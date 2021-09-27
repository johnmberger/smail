
<script setup lang="ts">
import InboxComponent from './views/Inbox.vue';
import SideBarComponent from './components/SideBar.vue';
import HeaderComponent from './components/Header.vue';
</script>
<template>
  <div
    class="
      min-h-screen
      flex flex-col flex-auto flex-shrink-0
      antialiased
      bg-white
      text-black
    "
  >
    <SideBarComponent />
    <HeaderComponent />
    <InboxComponent />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -moz-osx-font-smoothing: grayscale;
}
</style>
