<template>
  <BoxComponent>
    <div class="columns task clickable" @click="tarefaClicada">
      <div class="column is-4">
        {{ tarefa.descricao || "Tarefa sem descrição" }}
      </div>
      <div class="column id-3">
        {{ tarefa.projeto?.name }}
      </div>
      <div class="column stopwatch">
        <StopwatchComponent :tempoEmSegundos="tarefa.duracaoEmSegundos" />
      </div>
    </div>
  </BoxComponent>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import StopwatchComponent from "./Stopwatch.vue";
import BoxComponent from "./Box.vue";
import ITask from "../interfaces/ITask";

export default defineComponent({
  name: "TaskComponent",

  emits: ["aoTarefaClicada"],

  components: {
    StopwatchComponent,
    BoxComponent
  },

  props: {
    tarefa: {
      type: Object as PropType<ITask>,
      required: true,
    },
  },

  methods: {
    tarefaClicada(): void {
      this.$emit("aoTarefaClicada", this.tarefa);
    },
  },

  computed: {
    tempoGasto(): string {
      return new Date(this.tarefa.duracaoEmSegundos * 1000)
        .toISOString()
        .substring(11, 19);
    },
  },
});
</script>

<style>
.stopwatch StopwatchComponent {
  color: #000;
}

.clickable {
  cursor: pointer;
}
</style>
