import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import QuestionForm from '../QuestionForm/QuestionForm'

const QuestionModal = ({ show, validated, handleShow, handleClose, question, handleSave, handleChange }) => {
  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        + Add a new question
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Question Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <QuestionForm
            question={question}
            validated={validated}
            handleChange={handleChange}
            handleSave={handleSave}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default QuestionModal
