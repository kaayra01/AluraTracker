<template>
  <main
    class="columns is-gapless is-multiline"
    :class="{ 'dark-mode': darkModeActivated }"
  >
    <div class="column is-one-fifth">
      <SideBarComponent @forChangeTheme="changeTheme" />
    </div>
    <div class="column is-three-fifth content">
      <NotificationsComponent />
      <router-view></router-view>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SideBarComponent from "./components/SideBar.vue";
import NotificationsComponent from "./components/Notifications.vue";

export default defineComponent({
  name: "App",

  components: {
    SideBarComponent,
    NotificationsComponent,
  },

  data() {
    return {
      darkModeActivated: false,
    };
  },

  methods: {
    changeTheme(darkModeActivated: boolean) {
      this.darkModeActivated = darkModeActivated;
    },
  },
});
</script>

<style>
main {
  --primary-bg: #fff;
  --primary-text: #000;
}

main.dark-mode {
  --primary-bg: #2b2d42;
  --primary-text: #ddd;
}

.content {
  background-color: var(--primary-bg);
}
</style>
