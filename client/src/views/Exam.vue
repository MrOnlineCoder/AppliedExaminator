<template>
  <div class="examination">
    <div class="examination-loader" v-if="loading">
        <h3>
            Loading...
        </h3>
    </div>
    <div class="examination-content" v-if="!loading">
        <h3>{{ exam.title }}</h3>
        <hr>
        <div class="introduce" v-if="introduce.active">
            <b-form @submit.prevent="onStart">
                <b-form-group label="Enter your name:">
                    <b-form-input v-model="introduce.name" placeholder="Jon Snow"></b-form-input>
                </b-form-group>
                <b-button variant="primary" size="lg" type="submit">
                    <b-icon icon="check-box"/>
                    Start!
                </b-button>
            </b-form>
        </div>
        <div v-if="!introduce.active && answering">
            <Question 
                :question="currentQuestion" 
                :index="question_index"
                @next="onNextQuestion"/>
        </div>
        <div v-if="answers_sent">
            <h3>Your answers have been sent!</h3>
        </div>
    </div>
  </div>
</template>

<script>
import ExamsAPI from '@/api/exams'

import Question from '@/components/exam/Question.vue'

export default {
    data() {
        return {
            exam: null,
            questions: [],
            loading: true,

            introduce: {
                name: null,
                active: true
            },

            question_index: 0,

            answering: false,
            answers_sent: false
        }
    },
    methods: {
        fetchData() {
            const exam_id = this.$route.params.id;

            ExamsAPI.participate(exam_id).then(data => {
                this.exam = data.exam;
                this.questions = data.questions;  
                this.loading = false;  

                this.$store.dispatch('submission/init', {
                    exam_id
                });
            });
        },
        onStart() {
            this.introduce.active = false;
            this.answering = true;
        },
        onNextQuestion(user_answer) {
            this.$store.dispatch('submission/registerAnswer', {
                question_id: this.currentQuestion._id,
                user_answer
            });

            this.question_index++;

            if (this.question_index >= this.questions.length) {
                this.answering = false;
                this.sendAnswers();
            }
        },
        sendAnswers() {
            this.$store.dispatch('submission/send', {
                participant: this.introduce.name
            });
            this.answers_sent = true;
        }
    },
    mounted() {
        this.fetchData();
    },
    computed: {
        currentQuestion() {
            return this.questions[this.question_index];
        }
    },
    components: {
        Question
    }
}
</script>

<style>

</style>