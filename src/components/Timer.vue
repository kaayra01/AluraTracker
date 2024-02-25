<template>
    <div class="is-flex is-align-items is-justify-content-space-between">
        <StopwatchComponent :tempo-em-segundos="tempoEmSegundos" />
        <ButtonComponent @clicado="iniciar" buttonIcon="fas fa-play" buttonText="PLAY" :disabled="cronometroRodando" />
        <ButtonComponent @clicado="finalizar" buttonIcon="fas fa-stop" buttonText="STOP" :disabled="!cronometroRodando" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import StopwatchComponent from './Stopwatch.vue';
import ButtonComponent from './Button.vue';

export default defineComponent({
    name: 'TimerComponent',
    emits: ['aoTemporizadorFinalizado'],
    components: {
        StopwatchComponent,
        ButtonComponent
    },

    data() {
        return {
            tempoEmSegundos: 0,
            cronometro: 0,
            cronometroRodando: false
        }
    },
    methods: {
        iniciar() {
            this.cronometroRodando = true
            this.cronometro = setInterval(() => {
                this.tempoEmSegundos += 1
            }, 1000)
        },
        finalizar() {
            this.cronometroRodando = false
            clearInterval(this.cronometro)
            this.$emit('aoTemporizadorFinalizado', this.tempoEmSegundos)
            this.tempoEmSegundos = 0
        }
    }
})
</script>