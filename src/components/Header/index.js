import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

import {FiMenu, FiLogOut} from 'react-icons/fi'
import {FaMoon, FaSun} from 'react-icons/fa'
import ThemeContext from '../../ThemeContext'
import './index.css'

class Header extends Component {
  state = {
    showMenu: false,
  }

  toggleMenu = () => {
    this.setState(prev => ({showMenu: !prev.showMenu}))
  }

  confirmLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  closeMenu = () => {
    this.setState({showMenu: false})
  }

  render() {
    const {showMenu} = this.state

    return (
      <ThemeContext.Consumer>
        {value => {
          const {dark, changeDark} = value

          const renderLogoutContent = close => (
            <div className={dark ? 'popup-dark' : 'popup-light'}>
              <p>Are you sure, you want to logout</p>
              <div className="popup-btn-container">
                <button
                  type="button"
                  className="popup-cancel-btn"
                  onClick={close}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="popup-confirm-btn"
                  onClick={this.confirmLogout}
                >
                  Confirm
                </button>
              </div>
            </div>
          )

          return (
            <nav className={dark ? 'nav-dark' : 'nav-light'}>
              <div className="nav-content">
                <Link to="/">
                  <img
                    src={
                      dark
                        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                    }
                    alt="website logo"
                    className="nav-logo"
                  />
                </Link>

                {/* Desktop Actions */}
                <div className="desktop-actions">
                  <button
                    data-testid="theme"
                    type="button"
                    className={`icon-btn ${dark ? 'icon-dark' : 'icon-light'}`}
                    onClick={changeDark}
                  >
                    {dark ? <FaSun /> : <FaMoon />}
                  </button>

                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                    alt="profile"
                    className="profile-img"
                  />
                  <Popup
                    modal
                    position="right center"
                    trigger={
                      <button
                        type="button"
                        className="logout-btn"
                        onClick={this.closeMenu}
                      >
                        Logout
                      </button>
                    }
                  >
                    {close => renderLogoutContent(close)}
                  </Popup>
                </div>

                {/* Mobile Actions */}
                <div className="mobile-actions">
                  <button
                    type="button"
                    className={`icon-btn ${dark ? 'icon-dark' : 'icon-light'}`}
                    onClick={changeDark}
                  >
                    {dark ? <FaSun /> : <FaMoon />}
                  </button>

                  <button
                    type="button"
                    className={`icon-btn ${dark ? 'icon-dark' : 'icon-light'}`}
                    onClick={this.toggleMenu}
                  >
                    <FiMenu />
                  </button>

                  {/* ✅ SAME POPUP TRIGGER STYLE (NO SECOND POPUP) */}
                  <Popup
                    modal
                    trigger={
                      <button
                        type="button"
                        className={`icon-btn ${
                          dark ? 'icon-dark' : 'icon-light'
                        }`}
                        onClick={this.closeMenu}
                      >
                        <FiLogOut />
                      </button>
                    }
                  >
                    {close => renderLogoutContent(close)}
                  </Popup>
                </div>
              </div>

              {showMenu && (
                <ul className={dark ? 'mobile-menu-dark' : 'mobile-menu-light'}>
                  <li className="newListItem">
                    <Link
                      to="/"
                      className="list-link"
                      onClick={this.toggleMenu}
                    >
                      Home
                    </Link>
                  </li>
                  <li className="newListItem">
                    <Link
                      to="/trending"
                      className="list-link"
                      onClick={this.toggleMenu}
                    >
                      Trending
                    </Link>
                  </li>
                  <li className="newListItem">
                    <Link
                      to="/gaming"
                      className="list-link"
                      onClick={this.toggleMenu}
                    >
                      Gaming
                    </Link>
                  </li>
                  <li className="newListItem">
                    <Link
                      to="/saved-videos"
                      className="list-link"
                      onClick={this.toggleMenu}
                    >
                      Saved Videos
                    </Link>
                  </li>
                </ul>
              )}
            </nav>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default withRouter(Header)
