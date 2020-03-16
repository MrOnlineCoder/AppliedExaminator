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

function getPublic() {
    return Base.get('/exam/public');
}

function participate(id) {
    return Base.get(`/exam/participate/${id}`);
}

export default {
    getAll,
    getPublic,
    create,
    save,
    run,
    participate
}