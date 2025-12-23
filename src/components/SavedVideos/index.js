import {Component} from 'react'
import {RiMenuAddLine} from 'react-icons/ri'

import Header from '../Header'
import Slidebar from '../Slidebar'
import ThemeContext from '../../ThemeContext'
import {DarkContainerTrending} from '../../ThemeStyledContext'
import AllVideosItem from '../AllVideosItem'

import './index.css'

class SavedVideos extends Component {
  renderNoSavedVideos = dark => (
    <div className="no-saved-videos-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
        alt="no saved videos"
        className="no-saved-image"
      />
      <h1 className={dark ? 'title-dark' : 'title-light'}>
        No saved videos found
      </h1>
      <p>You can save your videos while watching them</p>
    </div>
  )

  renderSavedVideos = (dark, savedVideos) => (
    <div className="saved-videos-container">
      <div className={dark ? 'banner-dark' : 'banner-light'}>
        <div className={dark ? 'icon-bg-dark' : 'icon-bg-light'}>
          <RiMenuAddLine className="fire-icon" />
        </div>
        <h1 className={dark ? 'title-dark' : 'title-light'}>Saved Videos</h1>
      </div>

      <ul className="videos-list-container">
        {savedVideos.map(each => (
          <AllVideosItem
            key={each.id}
            id={each.id}
            title={each.title}
            thumbnailUrl={each.thumbnailUrl}
            channel={each.channel}
            viewCount={each.viewCount}
            publishedAt={each.publishedAt}
          />
        ))}
      </ul>
    </div>
  )

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {dark, savedVideos} = value

          return (
            <>
              <Header />

              <div className="slide-saved-flexes">
                {/* Sidebar */}
                <div className="sidebar-space">
                  <Slidebar />
                </div>

                {/* Scrollable Content */}
                <div className="saved-content-wrapper">
                  <DarkContainerTrending dark={dark} className="saved-scroll">
                    {savedVideos.length === 0
                      ? this.renderNoSavedVideos(dark)
                      : this.renderSavedVideos(dark, savedVideos)}
                  </DarkContainerTrending>
                </div>
              </div>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default SavedVideos
