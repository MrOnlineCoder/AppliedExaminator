import ExamsAPI from '@/api/exams'

const state = {
    exams: [],

    current: null
};

const mutations = {
    setExams(state, list) {
        state.exams = list;
    },
    setCurrent(state, index) {
        state.current = state.exams[index];
    }
};

const actions = {
    getAllExams(context) {
        return new Promise((resolve, reject) => {
            ExamsAPI.getAll().then(data => {
                context.commit('setExams', data.exams);
                resolve();
            }).catch(error => {
                reject(error);
            });
        });
    },
    createExam(context, title) {
        return new Promise((resolve, reject) => {
            ExamsAPI.create(title).then(data => {
                context.dispatch('getAllExams');
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