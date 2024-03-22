<template>
    <section>
        <form @submit.prevent="salvar">
            <div class="field">
                <label for="nomeDoProjeto" class="label">
                    Nome do Projeto
                </label>
                <input type="text" class="input" v-model="nomeDoProjeto" id="nomeDoProjeto">
            </div>
            <div class="field">
                <button class="button" type="submit">
                    Salvar
                </button>
            </div>
        </form>
    </section>
</template>
  
<script lang="ts">
import { useStore } from '@/store';
import { defineComponent, ref } from 'vue';
import { NotificationType } from '@/interfaces/INotification';
import useNotificador from '@/hooks/notificador';
import { CREATE_PROJECT, UPDATE_PROJECT } from '@/store/actions-type';
import { useRouter } from 'vue-router';
// import { mixinNotification } from '@/mixins/notificar';

export default defineComponent({
    name: 'FormView',

    props: {
        id: {
            type: Number
        }
    },

    setup (props) {
        const router = useRouter();

        const store = useStore();
        const { notificar } = useNotificador();

        const nomeDoProjeto = ref("");

        if (props.id) {
            const projeto = store.state.projeto.projetos.find(proj => proj.id == props.id)
            nomeDoProjeto.value = projeto?.name || ''
        }

        const lidarComSucesso = (type: string) => {
            nomeDoProjeto.value = "";

            notificar(
                NotificationType.SUCESSO,
                type == "update" ? "Projeto alterado!" : "Novo projeto salvo!",
                "Pronto! Seu projeto já está disponível."
            )

            router.push('/projetos');
        }

        const salvar = () => {
            if (props.id) {
                store.dispatch(UPDATE_PROJECT, {
                    id: props.id,
                    name: nomeDoProjeto.value
                }).then(() => lidarComSucesso("update"));
            } else {
                store.dispatch(CREATE_PROJECT, nomeDoProjeto.value)
                    .then(() => lidarComSucesso("create"));
            }
        }

        return {
            nomeDoProjeto,
            salvar
        }
    }

});
</script>