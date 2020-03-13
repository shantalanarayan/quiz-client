import React, { Fragment, Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron'
import ListGroup from 'react-bootstrap/ListGroup'
import { getMyTopics } from '../../../api/quiz'
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

  render () {
    const topics = this.state.topics.map(item => (
      <ListGroup.Item key={item.id}>
        <Link to={`/topic/${item.id}`}>{item.topic}</Link>
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
