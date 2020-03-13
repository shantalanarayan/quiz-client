import React, { Fragment, Component } from 'react'
import { withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import QuestionModal from '../QuestionModal/QuestionModal'
import QuestionList from '../QuestionList/QuestionList'
import { createQuiz } from '../../../api/quiz'
import messages from '../../Shared/AutoDismissAlert/messages'

class QuizCreate extends Component {
  constructor (props) {
    super(props)

    this.state = {
      show: false,
      validated: false,
      topic: {
        title: '',
        quizBank: []
      },
      question: {
        questions: '',
        correct_ans: '',
        incorrect_ans1: '',
        incorrect_ans2: '',
        incorrect_ans3: ''
      }
    }
  }

  handleSubmit = event => {
    event.preventDefault()

    // Validate
    if (this.state.topic.title === '') {
      this.setState({ validated: true })
      return
    }

    const { msgAlert, history, user } = this.props

    createQuiz(user, this.state.topic)
      .then(() => msgAlert({
        heading: 'Create Topic Success',
        message: messages.createTopicSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/my-topics'))
      .catch(error => {
        this.setState({ topic: {
          title: '',
          quizBank: []
        }
        })
        msgAlert({
          heading: 'Create Topic Failed with error: ' + error.message,
          message: messages.createTopicFailure,
          variant: 'danger'
        })
      })
  }

  handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }

    if (event.target.name === 'title') {
      const editedTopic = Object.assign(this.state.topic, updatedField)
      this.setState({ topic: editedTopic })
    } else {
      const editedQuestion = Object.assign(this.state.question, updatedField)
      this.setState({ question: editedQuestion })
    }
  }

  handleSave = event => {
    event.preventDefault()

    // Form is not valid return here
    if (!this.isQuestionFormValid(event)) {
      return
    }

    this.setShow(false)

    // creates the clone of the state
    const currentQuizBank = this.state.topic.quizBank.slice()

    // clone the questions
    currentQuizBank[currentQuizBank.length] = Object.assign({}, this.state.question)

    const quizBank = { quizBank: currentQuizBank }
    const editedTopic = Object.assign(this.state.topic, quizBank)
    this.setState({ topic: editedTopic })
    this.resetQuestionFormState()
  }

  isQuestionFormValid = event => {
    const question = this.state.question
    if (question.questions === '' ||
        question.correct_ans === '' ||
        question.incorrect_ans1 === '' ||
        question.incorrect_ans2 === '' ||
        question.incorrect_ans3 === '') {
      this.setState({ validated: true })
      return false
    }

    return true
  }

  resetQuestionFormState = () => {
    const question = {
      questions: '',
      correct_ans: '',
      incorrect_ans1: '',
      incorrect_ans2: '',
      incorrect_ans3: ''
    }
    this.setState({ question: question })
    this.setState({ validated: false })
  }

  setShow = show => {
    this.setState({ show: show })
  }

  handleClose = () => this.setShow(false)
  handleShow = () => this.setShow(true)

  render () {
    const { handleSubmit, handleChange, handleSave, handleClose, handleShow } = this
    const { topic, show, validated } = this.state
    return (
      <Fragment>
        <div className="row">
          <div className="col-12">
            <Form noValidate validated={validated} className="mt-5" onSubmit={handleSubmit}>
              <Card>
                <Card.Header>
                  <Form.Group>
                    <Form.Label>Topic</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="title"
                      value= {topic.title}
                      placeholder="Enter topic here"
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter a title for the topic.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Card.Header>
                <Card.Body>
                  <QuestionModal
                    show={show}
                    topic={topic}
                    validated={validated}
                    handleChange={handleChange}
                    handleSave={handleSave}
                    handleClose={handleClose}
                    handleShow={handleShow}
                  />
                  <QuestionList
                    quizBank={topic.quizBank}
                  />
                </Card.Body>
                <Card.Footer>
                  <Button className="float-right" variant="primary" type="submit">
                    Submit
                  </Button>
                </Card.Footer>
              </Card>
            </Form>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(QuizCreate)
