import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {ImFire} from 'react-icons/im'

import Header from '../Header'
import Slidebar from '../Slidebar'
import ThemeContext from '../../ThemeContext'
import {DarkContainerTrending} from '../../ThemeStyledContext'
import AllVideosItem from '../AllVideosItem'

import './index.css'

const apiStatus = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Trending extends Component {
  state = {
    trendingList: [],
    status: apiStatus.loading,
  }

  componentDidMount() {
    this.getTrendingVideos()
  }

  getTrendingVideos = async () => {
    this.setState({status: apiStatus.loading})
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    try {
      const response = await fetch(
        'https://apis.ccbp.in/videos/trending',
        options,
      )

      if (response.ok) {
        const data = await response.json()
        const updatedData = data.videos.map(each => ({
          id: each.id,
          title: each.title,
          thumbnailUrl: each.thumbnail_url,
          channel: each.channel,
          viewCount: each.view_count,
          publishedAt: each.published_at,
        }))

        this.setState({
          trendingList: updatedData,
          status: apiStatus.success,
        })
      } else {
        this.setState({status: apiStatus.failure})
      }
    } catch {
      this.setState({status: apiStatus.failure})
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height={50} width={50} />
    </div>
  )

  renderFailureView = dark => (
    <div className="failure-view-container">
      <img
        src={
          dark
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
        }
        alt="failure view"
        className="failure-image"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>
        We are having some trouble to complete your request.
        <br />
        Please try again.
      </p>
      <button
        type="button"
        onClick={this.getTrendingVideos}
        className="retry-btn"
      >
        Retry
      </button>
    </div>
  )

  renderSuccessView = dark => {
    const {trendingList} = this.state

    return (
      <div className="trending-container">
        {/* Trending Banner */}
        <div className={dark ? 'banner-dark' : 'banner-light'}>
          <div className={dark ? 'icon-bg-dark' : 'icon-bg-light'}>
            <ImFire className="fire-icon" />
          </div>
          <h1 className={dark ? 'title-dark' : 'title-light'}>Trending</h1>
        </div>

        {/* Videos */}
        <ul className="videos-list-container">
          {trendingList.map(each => (
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
  }

  renderResult = dark => {
    const {status} = this.state

    switch (status) {
      case apiStatus.loading:
        return this.renderLoader()
      case apiStatus.success:
        return this.renderSuccessView(dark)
      case apiStatus.failure:
        return this.renderFailureView(dark)
      default:
        return null
    }
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {dark} = value

          return (
            <>
              <Header />

              <div className="slide-trending-flexes">
                {/* Sidebar */}
                <div className="sidebar-space">
                  <Slidebar />
                </div>

                {/* Scrollable Content */}
                <div className="trending-content-wrapper">
                  <DarkContainerTrending
                    dark={dark}
                    className="trending-scroll"
                  >
                    {this.renderResult(dark)}
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

export default Trending
