import React, { Fragment, Component } from 'react'
import Card from 'react-bootstrap/Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSmile, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { withRouter } from 'react-router-dom'
import { getTopics } from '../../../api/quiz'
import messages from '../../Shared/AutoDismissAlert/messages'
import QuizTopic from '../../Quiz/QuizTopic/QuizTopic'

class Home extends Component {
  constructor () {
    super()
    this.state = {
      topics: []
    }
  }

  componentDidMount () {
    const { msgAlert } = this.props
    getTopics()
      .then(res => {
        this.setState({ topics: res.data.quiz_topics })
      })
      .then(() => msgAlert({
        heading: 'Get Topic Success',
        message: messages.getMyTopicSuccess,
        variant: 'success'
      }))
      .catch(error => {
        this.setState({ topics: [] })
        msgAlert({
          heading: 'Get Topic Failed with error: ' + error.message,
          message: messages.getMyTopicFailure,
          variant: 'danger'
        })
      })
  }

  welcomeMsg = (user) => (
    <div>
        To create or manage your own set of quizzes please { user ? <span>
          head to <a href="#my-topics">My Topics</a> to manage your topics</span>
        : <span> <a href="#sign-in">sign-in</a> first </span> }
    </div>
  )

  userWelcome = (user) => (
    <Card className="mt-3 pl-3">
      <FontAwesomeIcon icon={faSmile} size="6x" className="m-4"/>
      <div className="welcome-text">
        <h1>Welcome { user ? user.email : ' to Quiz-Up' }!</h1>
        { this.welcomeMsg(user) }
      </div>
    </Card>
  )

  render () {
    // const topics = this.state.topics
    const user = this.props.user
    return (
      <Fragment>
        { this.userWelcome(user) }
        <Card className="mt-3">
          <div className="row">
            <FontAwesomeIcon icon={faQuestionCircle} size="6x" className="m-4"/>
            <p className="mt-md-5 pl-5 welcome-text text-align-right">Take a Quiz. Pick a Topic.</p>
          </div>
          <QuizTopic topics={this.state.topics}></QuizTopic>
        </Card>
      </Fragment>
    )
  }
}

export default withRouter(Home)
