import Base from '../base'

function send(exam_id, participant, answers) {
    return Base.post('/submissions/send', {
        exam_id,
        participant,
        answers
    })
}

export default {
    send
}