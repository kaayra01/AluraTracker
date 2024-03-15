import http from "@/http";
import ITask from "@/interfaces/ITask";
import { Estado } from "@/store";
import { GET_TASKS, CREATE_TASK, UPDATE_TASK } from "@/store/actions-type";
import { ADICIONAR_TAREFA, ALTERAR_TAREFA, DEFINIR_TAREFAS } from "@/store/mutations-type";
import { Module } from "vuex";

export interface EstadoTarefa {
    tarefas: ITask[]
}

export const tarefa: Module<EstadoTarefa, Estado> = {
    state: {
        tarefas: [],
    },

    mutations: {
        [ADICIONAR_TAREFA](state, tarefa: ITask) {
            state.tarefas.push(tarefa)
        },
        [ALTERAR_TAREFA](state, tarefa: ITask) {
            const index = state.tarefas.findIndex(tar => tar.id == tarefa.id)
            state.tarefas[index] = tarefa
        },
        [DEFINIR_TAREFAS](state, tarefas: ITask[]) {
            state.tarefas = tarefas
        },
    },

    actions: {
        [GET_TASKS] ({ commit }, filtro: string) {
            let url = "tarefas"

            if (filtro) {
                url += "?descricao=" + filtro
            }

            http.get(url)
                .then(resp => commit(DEFINIR_TAREFAS, resp.data))
        },
        [CREATE_TASK] ({ commit }, tarefa: ITask) {
            return http.post('/tarefas', tarefa)
                .then(resp => commit(ADICIONAR_TAREFA, resp.data))
        },
        [UPDATE_TASK] ({ commit }, tarefa: ITask) {
            return http.put(`/tarefas/${tarefa.id}`, tarefa)
                .then(() => commit(ALTERAR_TAREFA, tarefa))
        },
    }
}