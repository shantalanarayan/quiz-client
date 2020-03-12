import React, { Fragment } from 'react'
import Card from 'react-bootstrap/Card'

const genericWelcome = 'Welcome to Quiz-up'

const userWelcome = ' welcome to Quiz-up. Please head to admin to add or edit topics.'

const Home = ({ user }) => (
  <Fragment>
    <Card className="m-5">
      <Card.Body>{ user ? user.email + userWelcome : genericWelcome }</Card.Body>
    </Card>
  </Fragment>
)

export default Home
