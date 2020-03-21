import React from 'react'
import Form from 'react-bootstrap/Form'

const QuestionForm = ({ question, validated, handleSave, handleChange }) => {
  return (
    <div>
      <Form noValidate validated={validated} onSubmit={handleSave}>
        <Form.Group>
          <Form.Label>Question</Form.Label>
          <Form.Control
            required
            type="text"
            name="questions"
            value={question.questions}
            placeholder="Enter a question"
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a question.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Correct Answer</Form.Label>
          <Form.Control
            required
            type="text"
            name="correct_ans"
            value={question.correct_ans}
            placeholder="Enter correct answer here"
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please enter an answer for correct answer.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Incorrect Answer 1</Form.Label>
          <Form.Control
            required
            type="text"
            name="incorrect_ans1"
            value={question.incorrect_ans1}
            placeholder="Enter 1st incorrect answer here"
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please enter an answer for 1st incorrect answer.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Incorrect Answer 2</Form.Label>
          <Form.Control
            required
            type="text"
            name="incorrect_ans2"
            value={question.incorrect_ans2}
            placeholder="Enter 2nd incorrect answer here"
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please enter an answer for 2nd incorrect answer.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Incorrect Answer 3</Form.Label>
          <Form.Control
            required
            type="text"
            name="incorrect_ans3"
            value={question.incorrect_ans3}
            placeholder="Enter 3rd incorrect answer here"
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please enter an answer for 3rd incorrect answer.
          </Form.Control.Feedback>
        </Form.Group>
      </Form>
    </div>
  )
}

export default QuestionForm
