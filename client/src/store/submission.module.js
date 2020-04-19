import Vue from 'vue'

import SubmissionsAPI from '@/api/submissions'

const state = {
    answers: [],
    exam_id: null
};

const mutations = {
    addAnswer(state, payload) {
        state.answers.push(payload);
    },
    setExamId(state, id) {
        state.exam_id = id;
    },
    changeAnswer(state, payload) {
        Vue.set(state.answers[payload.index], 'user_answer', payload.user_answer);
    },
    setAnswers(state, payload) {
        state.answers = payload;
    }
};

const actions = {
    init(context, payload) {
        const exam_id = payload.exam_id;

        const cache = window.localStorage.getItem(`answers:${exam_id}`);

        if (cache) {
            context.commit('setAnswers', JSON.parse(cache));
        }

        context.commit('setExamId', exam_id);
    },
    registerAnswer(context, payload) {
        const existing_index = context.state.answers.findIndex(item => {
            return item.question_id === payload.question_id;
        });

        if (existing_index !== -1) {
            context.commit('changeAnswer', {
                index: existing_index,
                user_answer: payload.user_answer
            });
        } else {
            context.commit('addAnswer', payload);
        }

        window.localStorage.setItem(
            `answers:${context.state.exam_id}`, 
            JSON.stringify(context.state.answers)
        );
    },
    send(context, payload) {
        SubmissionsAPI.send(
            context.state.exam_id,
            payload.participant,
            context.state.answers,
        ).then(data => {
            context.commit('setAnswers', []);

            window.localStorage.removeItem(`answers:${context.state.exam_id}`);
        }).catch(error => {
            console.error(error);
        });
    }
};

const getters = {

};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}