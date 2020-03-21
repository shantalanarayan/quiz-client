import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'

const QuizTopic = ({ topics }) => {
  return (
    <ListGroup>
      { topics.map((topic, index) => {
        return <ListGroup.Item className="col-sm-10 col-md-8 p-md-5 m-md-2"
          key={index} action variant="info">{ topic.topic }
        </ListGroup.Item>
      })
      }
    </ListGroup>
  )
}

export default QuizTopic
