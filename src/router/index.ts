import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";
import TasksView from "../views/Tasks.vue";
import ProjectsView from "../views/Projects.vue";
import FormView from "../views/Projects/Form.vue"
import ListView from "../views/Projects/List.vue"

const rotas: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Tasks',
        component: TasksView
    },
    {
        path: '/projetos',
        component: ProjectsView,
        children: [
            {
                path: '',
                name: 'Projects',
                component: ListView
            },
            {
                path: 'novo',
                name: 'New project',
                component: FormView
            },
            {
                path: ':id',
                name: 'Edit project',
                component: FormView,
                props: true
            }
        ]
    }
]

const roteador = createRouter({
    history: createWebHashHistory(),
    routes: rotas
});

export default roteador;