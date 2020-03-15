import Base from '../base'

function getAll() {
    return Base.get('/testbooks/all');
}

function create(title, category) {
    return Base.post('/testbooks/create', {
        title,
        category
    });
}

function save(testbook) {
    return Base.post('/testbooks/save', {
        testbook
    });
}

export default {
    getAll,
    create,
    save
}