import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', showSubmitError: false, errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    console.log('jwt_token')
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitLoggedIn = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const url = 'https://apis.ccbp.in/login'
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showSubmitError, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-page-main-bg-container">
        <div className="login-main-container">
          <div className="logo-container">
            <img
              src="https://res.cloudinary.com/dndkedgtz/image/upload/v1638687896/Frame_2742x_jf8sh8.png"
              alt="website logo"
              className="login-logo-image"
            />
            <h1>Tasty Kitchens</h1>
          </div>
          <form className="form-container" onSubmit={this.onSubmitLoggedIn}>
            <h1>LoginForm</h1>
            <label htmlFor="username">USERNAME</label>
            <input
              type="text"
              id="username"
              onChange={this.onChangeUsername}
              value={username}
            />
            <label htmlFor="password">PASSWORD</label>
            <input
              type="password"
              id="password"
              onChange={this.onChangePassword}
              value={password}
            />
            <button type="submit" className="login-button">
              Login
            </button>
            {showSubmitError && <p className="error-message">{errorMsg}</p>}
          </form>
        </div>
        <img
          src="https://res.cloudinary.com/dndkedgtz/image/upload/v1638687819/Rectangle_14561x_3_sb7urc.png"
          alt="website login"
          className="login-image"
        />
      </div>
    )
  }
}

export default LoginForm
