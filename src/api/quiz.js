import apiUrl from '../apiConfig'
import axios from 'axios'

export const createQuiz = (user, topic) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/quizzes',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      quiz: {
        topic: topic.title,
        quiz_banks_attributes: topic.quizBank
      }
    }
  })
}
