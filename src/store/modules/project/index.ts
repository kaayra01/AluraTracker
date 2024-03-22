import http from "@/http";
import IProject from "@/interfaces/IProject";
import { Estado } from "@/store";
import { CREATE_PROJECT, DELETE_PROJECT, GET_PROJECTS, UPDATE_PROJECT } from "@/store/actions-type";
import { ADICIONAR_PROJETO, ALTERAR_PROJETO, DEFINIR_PROJETOS, EXCLUIR_PROJETO } from "@/store/mutations-type";
import { Module } from "vuex";

export interface EstadoProjeto {
    projetos: IProject[]
}

export const projeto: Module<EstadoProjeto, Estado> = {
    mutations: {
        [ADICIONAR_PROJETO](state, nomeDoProjeto: string) {
            const projeto = {
                name: nomeDoProjeto
            } as IProject
            state.projetos.push(projeto)
        },
        [ALTERAR_PROJETO](state, projeto: IProject) {
            const index = state.projetos.findIndex(proj => proj.id == projeto.id)
            state.projetos[index] = projeto
        },
        [EXCLUIR_PROJETO](state, id: number) {
            state.projetos = state.projetos.filter(proj => proj.id != id)
        },
        [DEFINIR_PROJETOS](state, projetos: IProject[]) {
            state.projetos = projetos
        },
    },

    actions: {
        [GET_PROJECTS] ({ commit }) {
            http.get('projetos')
                .then(resp => commit(DEFINIR_PROJETOS, resp.data))
        },
        [CREATE_PROJECT] (context, nomeDoProjeto: string) {
            return http.post('/projetos', {
                name: nomeDoProjeto
            })
        },
        [UPDATE_PROJECT] (context, projeto: IProject) {
            return http.put(`/projetos/${projeto.id}`, projeto)
        },
        [DELETE_PROJECT] ({ commit }, id: number) {
            return http.delete(`/projetos/${id}`)
                .then(() => commit(EXCLUIR_PROJETO, id))
        },
    }
}