<template>
  <v-app>
    <v-main>
      <SuperHeroesDisplay headerMsg="Super heroes olympics" />
    </v-main>
  </v-app>
</template>

<script>
import SuperHeroesDisplay from "./components/SuperHeroesDisplay.vue";

export default {
  name: "App",

  components: {
    SuperHeroesDisplay,
  },

  data: () => ({
    //
  }),
};
</script>

<style lang="css">
/* Your custom styles here */
</style>
