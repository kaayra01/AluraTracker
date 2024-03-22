<template>
  <div class="modal" :class="{ 'is-active': showModal }" v-if="showModal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <slot name="header" />
      </header>
      <section class="modal-card-body">
        <slot name="content" />
      </section>
      <footer class="modal-card-foot">
        <slot name="footer" />
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
      type: Boolean,
      required: true
    }
  }
});
</script>
