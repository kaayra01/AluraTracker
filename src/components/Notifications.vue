<template>
  <div class="notifications">
    <article
      class="message is-success"
      :class="context[notificacao.type]"
      v-for="notificacao in notificacoes"
      :key="notificacao.id"
    >
      <div class="message-header">
        {{ notificacao.title }}
      </div>
      <div class="message-body">
        {{ notificacao.text }}
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "@/store";
import { NotificationType } from "@/interfaces/INotification";

export default defineComponent({
  name: "NotificationsComponent",

  data() {
    return {
      context: {
        [NotificationType.SUCESSO]: "is-success",
        [NotificationType.ATENCAO]: "is-warning",
        [NotificationType.FALHA]: "is-danger",
      },
    };
  },

  setup() {
    const store = useStore();
    return {
      notificacoes: computed(() => store.state.notificacoes),
    };
  },
});
</script>

<style scoped>
.notifications {
  position: absolute;
  right: 0;
  width: 20%;
  padding: 8px;
  z-index: 105;
}
</style>
