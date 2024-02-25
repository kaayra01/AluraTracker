<template>
<BoxComponent>
    <div class="columns">
        <div class="column is-7">
            {{ tarefa.descricao || 'Tarefa sem descrição' }}
        </div>
        <div class="column">
            <StopwatchComponent :tempoEmSegundos="tarefa.duracaoEmSegundos" />
        </div>
    </div>
</BoxComponent>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import StopwatchComponent from './Stopwatch.vue';
import BoxComponent from './Box.vue';
import ITask from '../interfaces/ITask'

export default defineComponent({
    name: 'TaskComponent',

    components: {
        StopwatchComponent,
        BoxComponent
    },

    props: {
        tarefa: {
            type: Object as PropType<ITask>,
            required: true
        }
    }

})

</script>

<style scoped>

</style>