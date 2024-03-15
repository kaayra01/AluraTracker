<template>
  <div class="modal" :class="{ 'is-active': showModal }" v-if="showModal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Editando a tarefa</p>
        <button class="delete" aria-label="close" @click="fecharModal"></button>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label for="descricaoDaTarefa" class="label">Descrição</label>
          <input
            type="text"
            class="input"
            v-model="tarefaSelecionada.descricao"
            id="descricaoDaTarefa"
          />
        </div>
      </section>
      <footer class="modal-card-foot">
        <button @click="alterarTarefa" class="button is-success">Salvar</button>
        <button @click="fecharModal" class="button">Cancelar</button>
      </footer>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ModalComponent",

  props: {
    showModal: {
      required: true,
    },
  },
});
</script>
