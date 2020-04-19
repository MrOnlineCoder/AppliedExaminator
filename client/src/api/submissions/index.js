import Base from '../base'

function send(exam_id, participant, answers) {
    return Base.post('/submissions/send', {
        exam_id,
        participant,
        answers
    })
}

function getAll() {
    return Base.get(`/submissions/all`);
}

export default {
    send,
    getAll
}