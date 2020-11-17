<template>
  <div class="container h-screen mx-auto px-2">
    <div class="flex justify-center items-center pt-3">
      <img :src="ICON_UNIQLO" class="w-48" alt="Uniqlo" />
      <i class="fas fa-times text-3xl text-gray-500"></i>
      <img :src="ICON_HANDSUP" class="w-48 mx-3" alt="HandsUP" />
    </div>
    <Uniqlo />
  </div>
</template>

<script>
import Uniqlo from "./components/Uniqlo.vue";

import ICON_HANDSUP from "@/assets/handsup.svg";
import ICON_UNIQLO from "@/assets/uniqlo.png";

export default {
  name: "App",
  components: {
    Uniqlo,
  },

  data() {
    return {
      ICON_HANDSUP,
      ICON_UNIQLO,
    };
  },
};
</script>

<style>
@import "tailwindcss/base";

@import "tailwindcss/components";

@import "tailwindcss/utilities";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
