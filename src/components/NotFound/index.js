import {Component} from 'react'
import ThemeContext from '../../ThemeContext'
import Header from '../Header'
import Slidebar from '../Slidebar'
import './index.css'
import {DarkContainerTrending} from '../../ThemeStyledContext'

class NotFound extends Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {dark} = value
          const imageUrl = dark
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'

          const textColorClass = dark ? 'text-dark' : 'text-light'

          return (
            <>
              <Header />

              <DarkContainerTrending
                dark={dark}
                className="slide-notfound-flexes"
              >
                {/* Sidebar always present on desktop */}
                <div className="sidebar-space">
                  <Slidebar />
                </div>

                {/* Not Found content scroll area */}
                <div className="notfound-content-wrapper">
                  <div className="notfound-scroll">
                    <div className="notfound-container">
                      <img
                        src={imageUrl}
                        alt="not found"
                        className="notfound-image"
                      />
                      <h1 className={`notfound-title ${textColorClass}`}>
                        Page Not Found
                      </h1>
                      <p className={`notfound-description ${textColorClass}`}>
                        we are sorry, the page you requested could not be found.
                      </p>
                    </div>
                  </div>
                </div>
              </DarkContainerTrending>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default NotFound
