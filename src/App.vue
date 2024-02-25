<template>
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-quarter">
      <SideBarComponent />
    </div>
    <div class="column is-three-quarter">
      <FormComponent @aoSalvarTarefa="salvarTarefa" />
      <div class="lista">
        <TaskComponent v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SideBarComponent from './components/SideBar.vue';
import FormComponent from './components/Form.vue';
import TaskComponent from './components/Task.vue';
import ITask from './interfaces/ITask';

export default defineComponent({
  name: 'App',

  components: {
    SideBarComponent,
    FormComponent,
    TaskComponent
  },

  data () {
    return {
      tarefas: [] as ITask[]
    }
  },

  methods: {
    salvarTarefa (tarefa: ITask) {
      this.tarefas.push(tarefa)
    }
  }

});
</script>

<style scoped>
.lista {
  padding: 1.25rem;
}
</style>
