import React, { Fragment } from 'react'
// import Card from 'react-bootstrap/Card'

const genericWelcome = 'Welcome to Quiz-up'

const userWelcome = ' welcome to Quiz-up. Please head to admin to add or edit topics.'

const Home = ({ user }) => (
  <Fragment>
    <div className="m-5 welcome-text">
      { user ? user.email + userWelcome : genericWelcome }
    </div>
  </Fragment>
)

export default Home
