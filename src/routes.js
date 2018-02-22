import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import {
  SignIn,
  Batches,
  Batch,
  Student
} from './containers'

export default class Routes extends Component {
  render() {
    return (
      <div className="row">
        <Route exact path="/" component={Batches} />
        <Route exact path="/batch/:batchId/student/:studentId" component={Student} />
        <Route exact path="/batch/:batchId" component={Batch} />
        <Route path="/sign-in" component={SignIn} />
      </div>
    )
  }
}
