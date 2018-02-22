// src/components/ui/Navigation.js
import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import signOut from '../../actions/user/sign-out'
import Logo from '../../images/logo.svg'

const TITLE = 'Evaluation Tool'

class Navigation extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool.isRequired,
    push: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
  }

  signOut = (event) => {
    event.preventDefault()
    this.props.signOut()
  }

  signIn = () => {
    this.props.push('/sign-in')
  }

  goHome = () => {
    this.props.push('/')
  }

  // <div className="row">
  //   <div className="col-md-10 pull-left">
  //     <a href="#" onClick={this.goHome}> Home </a>
  //     <h1> { TITLE } </h1>
  //   </div>
  //   <div className="col-md-2 pull-right">
  //     {signedIn ?
  //       <button type="button" className="btn btn-danger" onClick={this.signOut}> Sign Out </button> :
  //       <button type="button" className="btn btn-success" onClick={this.signIn}> Sign In </button>
  //     }
  //   </div>
  // </div>

  render() {
    const { signedIn } = this.props
    return (
      <nav class="navbar navbar-dark bg-dark">
        <a href="#" class="navbar-brand" onClick={this.goHome}>
          <img src={Logo} width="30" height="30" class="d-inline-block align-top" alt="" />
          Evaluation Tool
        </a>
        {
          signedIn ?
            (
              <div>
                <button type="button" className="btn btn-danger" onClick={this.signOut}> Sign Out </button>
              </div>
            )
          :
            <button type="button" className="btn btn-primary" onClick={this.signIn}> Sign In </button>

        }
      </nav>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: (!!currentUser && !!currentUser._id)
})

export default connect(mapStateToProps, { push, signOut })(Navigation)
