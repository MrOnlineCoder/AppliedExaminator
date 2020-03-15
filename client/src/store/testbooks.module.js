// import Vue from 'vue'

import TestbooksAPI from '@/api/testbooks'

const state = {
    testbooks: [],

    current: {}
};

const mutations = {
    setTestbooks(state, payload) {
        state.testbooks = payload;
    },
    addTestbook(state, payload) {
        state.testbooks.push(payload);
    },
    setCurrent(state, index) {
        state.current = state.testbooks[index];
    },

    addQuestion(state) {
        state.current.questions.push({
            task: null,
            answers: [],
            correct: null
        });
    },
    removeQuestion(state, index) {
        state.current.questions.splice(index, 1);
    },

    addAnswer(state, index) {
        state.current.questions[index].answers.push('');
    }
};

const actions = {
    getAllTestbooks(context, payload) {
        TestbooksAPI.getAll().then(data => {
            context.commit('setTestbooks', data.testbooks);
        }).catch(error => {

        });
    },
    createTestbook(context, payload) {
        TestbooksAPI.create(payload.title, payload.category).then(data => {
            context.commit('addTestbook', data.testbook);
        }).catch(error => {

        });
    },
    saveTestbook(context, payload) {
        return new Promise((resolve, reject) => {
            TestbooksAPI.save(context.state.current).then(data => {
                resolve();
            }).catch(error => {
                reject(error);
            });
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