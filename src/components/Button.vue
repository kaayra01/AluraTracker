<template>
    <button class="button" @click="clicked" :disabled="disabled">
        <span class="icon">
            <i :class="buttonIcon"></i>
        </span>
        <span>{{ buttonText }}</span>
    </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'ButtonComponent',

    emits: ['clicked'],

    props: {
        disabled: {
            type: Boolean
        },
        buttonIcon: {
            type: String,
            required: true
        },
        buttonText: {
            type: String,
            required: true
        }
    },

    methods: {
        clicked () : void {
            this.$emit('clicked')
        }
    }
    
})

</script>