import Base from '../base'

function getAll() {
    return Base.get('/exam/all');
}

function create(title) {
    return Base.post('/exam/create', {
        title
    });
}

function save(exam) {
    return Base.post('/exam/save', {
        exam
    });
}

function run(id) {
    return Base.post(`/exam/run/${id}`);
}

export default {
    getAll,
    create,
    save,
    run
}