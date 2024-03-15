import { INotification } from "@/interfaces/INotification";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { NOTIFICAR } from "./mutations-type"

import { EstadoProjeto, projeto } from "./modules/project";
import { EstadoTarefa, tarefa } from "./modules/task";

export interface Estado {
    notificacoes: INotification[],
    tarefa: EstadoTarefa,
    projeto: EstadoProjeto
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        notificacoes: [],
        tarefa: {
            tarefas: []
        },
        projeto: {
            projetos: []
        }
    },

    mutations: {
        [NOTIFICAR] (state, novaNotificacao: INotification) {
            novaNotificacao.id = new Date().getTime()
            state.notificacoes.push(novaNotificacao)
            
            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id)
            }, 3000)
        },
    },


    actions: {
    },

    modules: {
        projeto,
        tarefa
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}
