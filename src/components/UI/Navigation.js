import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import signOut from '../../actions/user/sign-out'
import Logo from '../../images/logo.svg'

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

  render() {
    const { signedIn } = this.props
    return (
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand click-item" onClick={this.goHome}>
          <img src={Logo} width="30" height="30" className="d-inline-block align-top" alt="" />
          Evaluation Tool
        </span>
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
