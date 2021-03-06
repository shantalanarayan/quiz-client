import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import Home from '../Shared/Home/Home'
import AuthenticatedRoute from '../Auth/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../Shared/AutoDismissAlert/AutoDismissAlert'
import Header from '../Shared/Header/Header'
import SignUp from '../Auth/SignUp/SignUp'
import SignIn from '../Auth/SignIn/SignIn'
import SignOut from '../Auth/SignOut/SignOut'
import ChangePassword from '../Auth/ChangePassword/ChangePassword'
import MyTopic from '../Quiz/MyTopic/MyTopic'
import QuizCreate from '../Quiz/QuizCreate/QuizCreate'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
          />
        ))}
        <main className="container">
          <Route exact path='/' render={() => (
            <Home user={user} msgAlert={this.msgAlert} />
          )} />
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/my-topics' render={() => (
            <MyTopic msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/create-quiz' render={() => (
            <QuizCreate msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute exact user={user} path='/quiz-edit/:id/edit' render={({ match }) => (
            <QuizCreate user={user} msgAlert={this.msgAlert} match={match} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
