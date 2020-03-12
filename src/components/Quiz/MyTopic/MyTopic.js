import React, { Fragment, Component } from 'react'
import { withRouter } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron'

class MyTopic extends Component {
  constructor () {
    super()
    this.state = {
      topic: []
    }
  }

  render () {
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
              <ListGroup.Item>Cras justo odio</ListGroup.Item>
              <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
              <ListGroup.Item>Morbi leo risus</ListGroup.Item>
              <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
              <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            </ListGroup>
          </div>
        </Jumbotron>
      </Fragment>
    )
  }
}

export default withRouter(MyTopic)
