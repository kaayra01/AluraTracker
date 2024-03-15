<template>
    <div class="box form">
        <div class="column input-timer">
            <div class="column is-5" role="form" aria-label="Formulário para criação de uma nova tarefa">
                <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?" v-model="descricao" />
            </div>
            <div class="column is-3">
                <div class="select">
                    <select v-model="idProjeto">
                        <option value="">Selecione o projeto</option>
                        <option :value="projeto.id" v-for="projeto in projetos" :key="projeto.id">
                            {{ projeto.name }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="column timer">
                <TimerComponent @aoTemporizadorFinalizado="salvarTarefa" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import TimerComponent from './Timer.vue';
import { useStore } from 'vuex';
import { key } from '@/store';
import { NOTIFICAR } from "@/store/mutations-type";
import { NotificationType } from '@/interfaces/INotification';

export default defineComponent({
    name: 'FormComponent',

    emits: ['aoSalvarTarefa'],

    components: {
        TimerComponent
    },

    setup (props, { emit }) {
        const store = useStore(key)

        const descricao = ref("")
        const idProjeto = ref("")

        const projetos = computed(() => store.state.projeto.projetos)

        const salvarTarefa = (tempoDecorrido: number) : void => {
            // let descricaoAjustada = descricao.value.replace(/(^\w{1})|(\s+\w{1})/, letra => letra.toUpperCase());
            const projeto = projetos.value.find((p) => p.id == idProjeto.value);
            if(!projeto) {
                store.commit(NOTIFICAR, {
                    title: 'Erro ao salvar!',
                    text: "Necessário selecionar um projeto para finalizar tarefa!",
                    type: NotificationType.FALHA,
                });
                return;
            }
            emit('aoSalvarTarefa', {
                duracaoEmSegundos: tempoDecorrido,
                descricao: descricao.value,
                projeto: projeto
            })
            store.commit(NOTIFICAR, {
                title: "Nova tarefa salva",
                text: "Pronto! Sua tarefa já está disponível.",
                type: NotificationType.SUCESSO
            });
            descricao.value = ""
        }
        
        return {
            descricao,
            idProjeto,
            projetos,
            store,
            salvarTarefa
        }
    }

});
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