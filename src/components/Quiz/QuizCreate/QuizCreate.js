import React, { Fragment, Component } from 'react'
import { withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import QuestionModal from '../QuestionModal/QuestionModal'
import QuestionList from '../QuestionList/QuestionList'
import { createQuiz, updateMyTopics } from '../../../api/quiz'
import messages from '../../Shared/AutoDismissAlert/messages'

class QuizCreate extends Component {
  constructor (props) {
    super(props)

    this.state = {
      show: false,
      validated: false,
      isCreate: false,
      topicId: null,
      editId: null,
      topic: {
        title: '',
        quiz_banks: []
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

  componentDidMount = () => {
    // For edit state would be set
    if (this.props.location.state) {
      const { quizzes } = this.props.location.state
      if (quizzes.length > 0) {
        const quiz = quizzes[0]
        this.setState({ topic: {
          topicId: quiz.id,
          title: quiz.topic,
          quiz_banks: quiz.quiz_banks
        } })
      }
    } else {
      // State is not set. Hence, this is a create
      this.setState({ isCreate: true })
    }
  }

  handleSubmit = event => {
    event.preventDefault()

    const { msgAlert, history, user } = this.props

    // Validate topic
    if (this.state.topic.title === '') {
      this.setState({ validated: true })
      return
    }

    // Validate question bank
    if (!this.state.topic.quiz_banks || this.state.topic.quiz_banks.length === 0) {
      msgAlert({
        heading: 'Empty Quiz',
        message: messages.emptyQuizError,
        variant: 'danger'
      })
      return
    }

    if (this.state.isCreate) {
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
    } else {
      updateMyTopics(user, this.state.topic)
        .then(() => msgAlert({
          heading: 'Update Topic Success',
          message: messages.updateTopicSuccess,
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
            heading: 'Update Topic Failed with error: ' + error.message,
            message: messages.updateTopicFailure,
            variant: 'danger'
          })
        })
    }
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
    const currentQuizBank = this.state.topic.quiz_banks.slice()

    // clone the questions
    if (this.state.editId) {
      currentQuizBank[this.state.editId] = Object.assign({}, this.state.question)
    } else {
      currentQuizBank[currentQuizBank.length] = Object.assign({}, this.state.question)
    }

    const quizBank = { quiz_banks: currentQuizBank }
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
    this.setState({ question: question, validated: false, editId: null })
  }

  handleEdit = event => {
    event.preventDefault()
    const id = event.target.id
    const question = this.state.topic.quiz_banks[id]
    this.setState({ question: question, editId: id })
    this.handleShow()
  }

  setShow = show => {
    this.setState({ show: show })
  }

  handleClose = () => this.setShow(false)
  handleShow = () => this.setShow(true)

  render () {
    const { handleSubmit, handleChange, handleSave, handleClose, handleShow, handleEdit } = this
    const { topic, show, validated, question } = this.state
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
                    question={question}
                    validated={validated}
                    handleChange={handleChange}
                    handleSave={handleSave}
                    handleClose={handleClose}
                    handleShow={handleShow}
                  />
                  <QuestionList
                    quizBank={topic.quiz_banks ? topic.quiz_banks : []}
                    handleEdit={handleEdit}
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
