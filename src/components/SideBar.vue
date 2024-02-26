<template>
    <header>
        <h1>
            <img src="../assets/logo.png" alt="Logo da Alura Track">
        </h1>
        <button class="button" @click="changeTheme">
            {{ buttonText }}
        </button>
    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'SideBarComponent',
    
    emits: ['forChangeTheme'],

    data () {
        return {
            darkModeActivated: false
        }
    },

    computed: {
        buttonText () {
            if (this.darkModeActivated) {
                return 'Modo Claro'
            }
            return 'Modo Escuro'
        }
    },

    methods: {
        changeTheme () {
            this.darkModeActivated = !this.darkModeActivated
            this.$emit('forChangeTheme', this.darkModeActivated)
        }
    },

})
</script>

<style scoped>
header {
    padding: 1rem;
    background: #0D3B66;
    width: 100%;
    height: 100vh;
    text-align: center;
}

@media only screen and (max-width: 768px) {
    header {
        padding: 2.5rem;
        height: auto;
    }
}
</style>