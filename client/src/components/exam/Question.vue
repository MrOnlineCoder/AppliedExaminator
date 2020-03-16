<template>
  <div class="question-wrapper">
    <div class="text-center">
        <h3>Question #{{index+1}}</h3>
        <div v-html="renderMarkdown(question.task)"></div>
        <br>
        <small>Choose one answer:</small>
        <b-form-radio-group stacked>
            <b-form-radio v-for="(answer,index) in question.answers" :value="answer" :key="index" v-model="user_answer" >
                {{ answer }}
            </b-form-radio>
        </b-form-radio-group>
        <br>
        <b-button variant="success" :disabled="!user_answer" @click="next">
            <b-icon icon="check"/>
            Next question
        </b-button>
    </div>
  </div>
</template>

<script>
import marked from 'marked'

export default {
    props: {
        index: Number,
        question: Object
    },
    data() {
        return {
            user_answer: null
        }
    },
    methods: {
        renderMarkdown(raw) {
            if (!raw) return '';

            return marked(raw);
        },
        next() {
            this.$emit('next', this.user_answer);
        }
    }
}
</script>

<style>

</style>