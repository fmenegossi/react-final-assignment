// src/App.js
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Navigation from './components/UI/Navigation'
import Routes from './routes'

class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <div class="container-fluid">
          <div className="row">
            <div className="col-md-10 offset-md-1">
              <Routes />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
