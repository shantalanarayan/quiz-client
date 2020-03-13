import React from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const QuestionList = ({ quizBank, handleEdit }) => {
  return (
    <Accordion className="mt-3" defaultActiveKey="0">
      { quizBank.map((question, index) => {
        return <Card key={index}>
          <Accordion.Toggle as={Card.Header} eventKey={index}>
            <Card.Header>{question.questions}</Card.Header>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={index}>
            <Card.Body>
              <Card.Title>Correct Answer</Card.Title>
              <Card.Text className="text-success">{question.correct_ans}</Card.Text>
              <Card.Subtitle>Incorrect Answer 1</Card.Subtitle>
              <Card.Text className="text-muted">{question.incorrect_ans1}</Card.Text>
              <Card.Subtitle>Incorrect Answer 2</Card.Subtitle>
              <Card.Text className="text-muted">{question.incorrect_ans2}</Card.Text>
              <Card.Subtitle>Incorrect Answer 3</Card.Subtitle>
              <Card.Text className="text-muted">{question.incorrect_ans3}</Card.Text>
              <Button id={index} variant="secondary" onClick={handleEdit}>
                Edit
              </Button>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      }) }
    </Accordion>
  )
}

export default QuestionList
