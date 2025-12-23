import {NavLink} from 'react-router-dom'
import {AiFillHome, AiFillFire} from 'react-icons/ai'
import {RiMenuAddLine} from 'react-icons/ri'

import {SiYoutubegaming} from 'react-icons/si'

import ThemeContext from '../../ThemeContext'
import './index.css'

const Sidebar = () => (
  <ThemeContext.Consumer>
    {value => {
      const {dark} = value

      return (
        <div className={dark ? 'sidebar-dark' : 'sidebar-light'}>
          {/* ===== Navigation ===== */}
          <nav className="sidebar-nav">
            <ul className="newList-Container">
              <li className="newListItem">
                <NavLink
                  exact
                  to="/"
                  className="sidebar-link"
                  activeClassName="active-link"
                >
                  <AiFillHome className="sidebar-icon" />
                  <span>Home</span>
                </NavLink>
              </li>
              <li className="newListItem">
                <NavLink
                  to="/trending"
                  className="sidebar-link"
                  activeClassName="active-link"
                >
                  <AiFillFire className="sidebar-icon" />
                  <span>Trending</span>
                </NavLink>
              </li>
              <li className="newListItem">
                <NavLink
                  to="/gaming"
                  className="sidebar-link"
                  activeClassName="active-link"
                >
                  <SiYoutubegaming className="sidebar-icon" />
                  <span>Gaming</span>
                </NavLink>
              </li>
              <li className="newListItem">
                <NavLink
                  to="/saved-videos"
                  className="sidebar-link"
                  activeClassName="active-link"
                >
                  <RiMenuAddLine className="sidebar-icon" />
                  <span>Saved Videos</span>
                </NavLink>
              </li>
            </ul>
          </nav>
          {/* ===== Footer ===== */}
          <div className="sidebar-footer">
            <p className="contact-title">CONTACT US</p>

            <div className="social-icons">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                alt="facebook logo"
                className="social-icon fb"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                alt="twitter logo"
                className="social-icon twitter"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                alt="linked in logo"
                className="social-icon linkedin"
              />
            </div>

            <p className="sidebar-description">
              Enjoy! now to see your channels and recommendations!
            </p>
          </div>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)

export default Sidebar
