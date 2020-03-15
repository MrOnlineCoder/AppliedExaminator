import Base from '../base'

function getAll() {
    return Base.get('/exam/all');
}

function create(title) {
    return Base.post('/exam/create', {
        title
    });
}

export default {
    getAll,
    create
}