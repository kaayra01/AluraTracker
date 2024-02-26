<template>
    <div class="box form">
        <div class="columns">
            <div class="column is-8" role="form" aria-label="Formulário para criação de uma nova tarefa">
                <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?" v-model="descricao" />
            </div>
            <div class="column">
                <div class="column">
                    <TimerComponent @aoTemporizadorFinalizado="finalizarTarefa" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TimerComponent from './Timer.vue';

export default defineComponent({
    name: 'FormComponent',

    emits: ['aoSalvarTarefa'],

    components: {
        TimerComponent
    },

    data () {
        return {
            descricao: ""
        }
    },

    methods: {
        finalizarTarefa (tempoDecorrido: number) : void {
            this.$emit('aoSalvarTarefa', {
                duracaoEmSegundos: tempoDecorrido,
                descricao: this.descricao
            })
            this.descricao = ""
        }
    }

})
</script>

<style>
.form {
    color: var(--primary-text);
    background-color: var(--primary-bg);
}
</style>