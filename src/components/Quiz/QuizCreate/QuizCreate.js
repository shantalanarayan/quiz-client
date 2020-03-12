import React, { Fragment, Component } from 'react'
import { withRouter } from 'react-router-dom'

class QuizCreate extends Component {
  constructor (props) {
    super(props)

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
        Hello World!
      </Fragment>
    )
  }
}

export default withRouter(QuizCreate)
