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

export const getMyTopics = (user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/my_topics',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const deleteTopic = (user, id) => {
  return axios({
    method: 'DELETE',
    url: apiUrl + `/quizzes/${id}`,
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}
