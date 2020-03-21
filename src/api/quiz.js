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
        quiz_banks_attributes: topic.quiz_banks
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

export const getTopics = () => {
  return axios({
    method: 'GET',
    url: apiUrl + '/quizzes'
  })
}

export const updateMyTopics = (user, topic) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + `/quizzes/${topic.topicId}`,
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      quiz: {
        topic: topic.title,
        quiz_banks_attributes: topic.quiz_banks
      }
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
