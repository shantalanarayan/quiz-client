import React, { Fragment, Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron'
import ListGroup from 'react-bootstrap/ListGroup'
import { getMyTopics, deleteTopic } from '../../../api/quiz'
import messages from '../../Shared/AutoDismissAlert/messages'

class MyTopic extends Component {
  constructor () {
    super()
    this.state = {
      topics: []
    }
  }

  componentDidMount () {
    const { msgAlert, user } = this.props

    getMyTopics(user)
      .then(res => this.setState({ topics: res.data.quizzes }))
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

  destroy = (event) => {
    const { msgAlert, user } = this.props
    const id = event.target.id

    deleteTopic(user, id)
      .then(() => msgAlert({
        heading: 'Delete Topic Success',
        message: messages.deleteTopicSuccess,
        variant: 'success'
      }))
      .then(() => {
        const updatedTopics = this.state.topics.filter(topic => topic.id.toString() !== id.toString())
        this.setState({ topics: updatedTopics })
      })
      .catch(error => {
        this.setState({ topics: [] })
        msgAlert({
          heading: 'Delete Topic Failed with error: ' + error.message,
          message: messages.deleteTopicFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const topics = this.state.topics.map(item => (
      <ListGroup.Item key={item.id}>
        <Link to={{
          pathname: `/quiz-edit/${item.id}/edit`,
          state: { quizzes: this.state.topics.filter(topic => topic.id.toString() === item.id.toString()) }
        }}>{item.topic}</Link>
        <Button id={item.id} className="btn btn-small btn-danger float-right" onClick={this.destroy}>Delete</Button>
      </ListGroup.Item>
    ))

    return (
      <Fragment>
        <Jumbotron className="mt-5">
          <div className="row">
            <div className="col-12">
              <Button className="btn btn-primary float-right m-3" href="#create-quiz">+ Create a new Topic</Button>
            </div>
          </div>
          <div className="col-12">
            <ListGroup>
              {topics}
            </ListGroup>
          </div>
        </Jumbotron>
      </Fragment>
    )
  }
}

export default withRouter(MyTopic)
