import React, { Fragment } from 'react'
import Card from 'react-bootstrap/Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSmile } from '@fortawesome/free-solid-svg-icons'

const genericWelcome = (
  <div className="welcome-text">
    <h1>Welcome to Quiz-Up!</h1>
    To create or manage your quiz bank please <a href="#sign-in">sign-in</a> first.
  </div>
)

const userWelcome = (user) => (
  <div className="welcome-text">
    <h1>Welcome { user.email }!</h1>
    To create or manage your quiz bank please head to <a href="#my-topics">My Topics</a> to manage your topics
  </div>
)

const Home = ({ user }) => (
  <Fragment>
    <Card className="m-5 pl-5">
      <FontAwesomeIcon icon={faSmile} size="6x" className="m-4"/>
      { user ? userWelcome(user) : genericWelcome }
    </Card>
  </Fragment>
)

export default Home
