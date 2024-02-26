<template>
    <div class="box form">
        <div class="columns input-timer">
            <div class="column is-8" role="form" aria-label="Formulário para criação de uma nova tarefa">
                <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?" v-model="descricao" />
            </div>
            <div class="column timer">
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
            let descricaoAjustada = this.descricao.replace(/(^\w{1})|(\s+\w{1})/, letra => letra.toUpperCase());
            this.$emit('aoSalvarTarefa', {
                duracaoEmSegundos: tempoDecorrido,
                descricao: descricaoAjustada
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
    text-align: center;
}

.timer {
    margin: 0 1rem;
}

.input-timer {
    align-items: center;
    display: flex;
}

@media only screen and (max-width: 768px) {
    .form {
        height: auto;
    }

    .input-timer {
        display: inline;
        margin: 0 1rem;
    }

    .timer {
        margin-right: 2rem;
    }
}

@media only screen and (max-width: 480px) {
    .input-timer {
        margin: 0 1rem;
    }

    .timer {
        display: inline;
        margin: 0;
    }
}

</style>