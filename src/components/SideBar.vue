<template>
  <header>
    <h1>
      <img src="../assets/logo.png" alt="Logo da Alura Track" />
    </h1>
    <div class="has-text-centered">
      <button class="button is-warning" @click="changeTheme">
        {{ buttonText }}
      </button>
    </div>
    <nav class="panel mt-5">
      <ul>
        <li>
          <router-link to="/" class="link">
            <i class="fas fa-tasks"> Tarefas </i>
          </router-link>
        </li>
      </ul>
      <ul>
        <li>
          <router-link to="/projetos" class="link">
            <i class="fas fa-project-diagram"> Projetos </i>
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SideBarComponent",

  emits: ["forChangeTheme"],

  data() {
    return {
      darkModeActivated: false,
    };
  },

  computed: {
    buttonText() {
      if (this.darkModeActivated) {
        return "Modo Claro";
      }
      return "Modo Escuro";
    },
  },

  methods: {
    changeTheme() {
      this.darkModeActivated = !this.darkModeActivated;
      this.$emit("forChangeTheme", this.darkModeActivated);
    },
  },
});
</script>

<style scoped>
header {
  padding: 1rem;
  background: #0d3b66;
  width: 100%;
  height: 100vh;
}

h1 {
  text-align: center;
}

@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}

button {
  margin: 1rem 0;
}

.panel li {
  margin: 8px 0;
}

.link {
  color: #fff;
}

.link:hover {
  color: #faf0ca;
}

.link.router-link-active {
  color: #faf0ca;
}
</style>
