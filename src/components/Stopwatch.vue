<template>
  <section class="display">
    <strong>
      {{ tempoDecorrido }}
    </strong>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "StopwatchComponent",

  props: {
    tempoEmSegundos: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    tempoDecorrido(): string {
      return new Date(this.tempoEmSegundos * 1000)
        .toISOString()
        .substring(11, 19);
    },
  },
});
</script>

<style>
.display {
  align-items: center;
  display: flex;

  strong {
    color: #a9a9a9;
  }
}

@media only screen and (max-width: 768px) {
  .display {
    margin: 0;
  }
}
</style>
