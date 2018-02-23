import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { replace, push } from 'react-router-redux'
import signIn from '../actions/user/sign-in'

export class SignIn extends PureComponent {
  static propTypes = {
    push: PropTypes.func.isRequired,
    signIn: PropTypes.func.isRequired,
    signedIn: PropTypes.bool,
  }

  componentWillMount() {
    const { replace, signedIn } = this.props
    if (signedIn) replace('/')
  }

  submitForm(event) {
    event.preventDefault()
    const { email, password } = event.target

    const user = {
      email: email.value,
      password: password.value
    }
    this.props.signIn(user)
  }

  signUp() {
    this.props.push('/sign-up')
  }

  render() {
    return (
        <div className="col-md-4 offset-md-4 text-center" style={{marginTop:"1rem"}}>
          <h1> Sign In </h1>
          <form onSubmit={this.submitForm.bind(this)}>
            <div className="form-group">
              <div className="form-row">
                <label htmlFor="email"> Email </label>
                <input className="form-control" id="email" name="email" type="email" hintText="Email address" />
              </div>
              <div className="form-row">
                <label htmlFor="email"> Password </label>
                <input className="form-control" id="password" name="password" type="password" hintText="Password"  />
              </div>
              <div className="form-row">
                <div className="col" style={{marginTop:"1rem"}}>

                  <button type="submit" className="btn btn-success"> Sign In </button>
                </div>
              </div>
            </div>
          </form>
        </div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})

export default connect(mapStateToProps, { signIn, replace, push })(SignIn)
