// src/routes.js
import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import {
  SignIn,
  SignUp,
  Batches,
  Batch,
  Student
} from './containers'

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Batches} />
        <Route exact path="/batch/:batchId/student/:studentId" component={Student} />
        <Route exact path="/batch/:batchId" component={Batch} />
        <Route path="/student/:studentId" component={Student} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
      </div>
    )
  }
}
