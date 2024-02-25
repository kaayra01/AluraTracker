<template>
<div class="box has-text-weight-bold">
    <div class="columns">
        <div class="column is-7">
            {{ tarefa.descricao }}
        </div>
        <div class="column">
            <StopwatchComponent :tempoEmSegundos="tarefa.duracaoEmSegundos" />
        </div>
    </div>
</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import StopwatchComponent from './Stopwatch.vue';
import ITask from '../interfaces/ITask'

export default defineComponent({
    name: 'TaskComponent',

    components: {
        StopwatchComponent
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
.box {
    background: #FAF0CA;
}
</style>