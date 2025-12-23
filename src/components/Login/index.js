import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

import ThemeContext from '../../ThemeContext'
import {
  GrayContainer,
  FormDarkConrainer,
  CustomInput,
  LoginButton,
} from '../../ThemeStyledContext'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
    showPassword: false,
    pageState: 'idle', // idle | loading | failure
  }

  onUserNameChange = event => {
    this.setState({username: event.target.value})
  }

  onPasswordChange = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitError = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onShowPasswordClick = () => {
    this.setState(prev => ({showPassword: !prev.showPassword}))
  }

  submitForm = async event => {
    event.preventDefault()
    this.setState({pageState: 'loading', showSubmitError: false})

    const url = 'https://apis.ccbp.in/login'
    const {username, password} = this.state
    const userDetails = {username, password}

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitError(data.error_msg)
      this.setState({pageState: 'failure'})
    }
  }

  renderUserNameField = dark => {
    const {username} = this.state
    return (
      <label className={dark ? 'darkText' : 'input-label'} htmlFor="username">
        USERNAME
        <CustomInput
          dark={dark}
          className="input-elements"
          type="text"
          id="username"
          onChange={this.onUserNameChange}
          value={username}
          placeholder="Username"
        />
      </label>
    )
  }

  renderPasswordField = dark => {
    const {password, showPassword} = this.state
    return (
      <label className={dark ? 'darkText' : 'input-label'} htmlFor="password">
        PASSWORD
        <CustomInput
          dark={dark}
          className="input-elements"
          type={showPassword ? 'text' : 'password'}
          id="password"
          onChange={this.onPasswordChange}
          value={password}
          placeholder="Password"
        />
      </label>
    )
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height={50} width={50} />
    </div>
  )

  renderLoginForm = dark => {
    const {showSubmitError, errorMsg} = this.state

    return (
      <FormDarkConrainer
        dark={dark}
        className="form-container"
        onSubmit={this.submitForm}
      >
        <img
          src={
            dark
              ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
              : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
          }
          alt="website logo"
          className="logo-image"
        />

        <div className="input-containers">{this.renderUserNameField(dark)}</div>

        <div className="input-containers">{this.renderPasswordField(dark)}</div>

        <div className="checkbox-container">
          <input
            onChange={this.onShowPasswordClick}
            id="checkbox"
            type="checkbox"
          />
          <label className="checkbox-label" htmlFor="checkbox">
            Show Password
          </label>
        </div>

        {/* ✅ TEST-SAFE LOGIN BUTTON */}
        <LoginButton type="submit">Login</LoginButton>

        {showSubmitError && <p className="errorMsg">*{errorMsg}</p>}
      </FormDarkConrainer>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    const {pageState} = this.state

    return (
      <ThemeContext.Consumer>
        {({dark}) => (
          <GrayContainer dark={dark} className="login-bg">
            {pageState === 'loading'
              ? this.renderLoader()
              : this.renderLoginForm(dark)}
          </GrayContainer>
        )}
      </ThemeContext.Consumer>
    )
  }
}

export default Login
