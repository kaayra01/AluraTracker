<template>
  <FormComponent @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <BoxComponent v-if="emptyList">
      Nenhuma tarefa foi iniciada ainda.
    </BoxComponent>
    <div class="field" v-show="tarefas.length > 0">
      <p class="control has-icons-left">
        <input
          class="input"
          type="text"
          placeholder="Digite para filtrar"
          v-model="filtro"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>
    <TaskComponent
      v-for="(tarefa, index) in tarefas"
      :key="index"
      :tarefa="tarefa"
      @aoTarefaClicada="selecionarTarefa"
    />
    <ModalComponent :showModal="tarefaSelecionada != null">
      <template v-slot:header>
        <p class="modal-card-title">Editando a tarefa</p>
        <button class="delete" aria-label="close" @click="fecharModal"></button>
      </template>
      <template v-slot:content>
        <div class="field">
          <label for="descricaoDaTarefa" class="label"> Descrição </label>
          <input
            type="text"
            class="input"
            v-model="tarefaSelecionada.descricao"
            id="descricaoDaTarefa"
          />
        </div>
      </template>
      <template v-slot:footer>
        <button @click="alterarTarefa" class="button is-success">Salvar</button>
        <button @click="fecharModal" class="button">Cancelar</button>
        <button @click="excluirTarefa" class="button is-danger exclude">EXCLUIR</button>
      </template>
    </ModalComponent>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from "vue";
import FormComponent from "../components/Form.vue";
import TaskComponent from "../components/Task.vue";
import BoxComponent from "../components/Box.vue";
import ModalComponent from "../components/Modal.vue";
import useNotificador from "@/hooks/notificador";
import { useStore } from "@/store";
import {
  CREATE_TASK,
  GET_PROJECTS,
  GET_TASKS,
  UPDATE_TASK,
  DELETE_TASK,
} from "@/store/actions-type";
import ITask from "@/interfaces/ITask";
import { NotificationType } from "@/interfaces/INotification";

export default defineComponent({
  name: "TasksView",

  components: {
    FormComponent,
    BoxComponent,
    TaskComponent,
    ModalComponent,
  },

  data() {
    return {
      tarefaSelecionada: null as ITask | null,
    };
  },

  methods: {
    salvarTarefa(tarefa: ITask) {
      this.store.dispatch(CREATE_TASK, tarefa);
    },

    selecionarTarefa(tarefa: ITask) {
      this.tarefaSelecionada = tarefa;
    },

    fecharModal() {
      this.tarefaSelecionada = null;
    },

    alterarTarefa() {
      this.store.dispatch(UPDATE_TASK, this.tarefaSelecionada).then(() => {
        this.fecharModal();
        this.lidarComSucesso("Sucesso");
      });
    },

    excluirTarefa() {
      this.store.dispatch(DELETE_TASK, this.tarefaSelecionada).then(() => {
        this.fecharModal();
        this.lidarComSucesso("Exclusão");
      });
    },

    lidarComSucesso(status: string) {
      if (status == "Sucesso") {
        this.notificar(
          NotificationType.SUCESSO,
          "Tarefa atualizada!",
          "Sua tarefa foi alterada com sucesso."
        );
      } else {
        this.notificar(
          NotificationType.FALHA,
          "Tarefa excluída!",
          "A tarefa foi removida com sucesso."
        );
      }
    },
  },

  computed: {
    emptyList(): boolean {
      return this.tarefas.length === 0;
    },
  },

  setup() {
    const store = useStore();
    const { notificar } = useNotificador();
    store.dispatch(GET_TASKS);
    store.dispatch(GET_PROJECTS);

    const filtro = ref("");

    // const tarefas = computed(() =>
    //     store.state.tarefa.tarefas.filter(
    //         (tar) => !filtro.value || tar.descricao.includes(filtro.value)
    //     )
    // );

    watchEffect(() => {
      store.dispatch(GET_TASKS, filtro.value);
    });

    return {
      tarefas: computed(() => store.state.tarefa.tarefas),
      store,
      notificar,
      filtro,
    };
  },
});
</script>

<style>
.lista {
  padding: 1.25rem;
}

.exclude {
  margin: 0 50%;
}
</style>
