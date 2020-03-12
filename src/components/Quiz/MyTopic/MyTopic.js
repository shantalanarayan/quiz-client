import React, { Fragment, Component } from 'react'
import { withRouter } from 'react-router-dom'
import Card from 'react-bootstrap/Card'

class MyTopic extends Component {
  constructor () {
    super()
    this.state = {
      topic: {
        title: '',
        questions: []
      }
    }
  }

  render () {
    return (
      <Fragment>
        <Card className="m-5">
          <Card.Body>My topics - {this.props.user.email}</Card.Body>
        </Card>
      </Fragment>
    )
  }
}

export default withRouter(MyTopic)
