import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {MdClose, MdSearch} from 'react-icons/md'

import ThemeContext from '../../ThemeContext'
import {DarkContainer, CustomInput, Banner} from '../../ThemeStyledContext'
import AllVideosItem from '../AllVideosItem'
import Header from '../Header'
import Slidebar from '../Slidebar'

import './index.css'

class Home extends Component {
  state = {
    banner: true,
    videosList: [],
    searchInput: '',
    input: '',
    pageState: 'loading',
  }

  componentDidMount() {
    this.getVideos()
  }

  getVideos = async () => {
    this.setState({pageState: 'loading'})
    const jwtToken = Cookies.get('jwt_token')
    const {searchInput} = this.state

    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    try {
      const response = await fetch(url, options)
      const data = await response.json()

      if (response.ok === true) {
        this.setState({
          videosList: data.videos,
          pageState: 'success',
        })
      } else {
        this.setState({pageState: 'failed'})
      }
    } catch (error) {
      this.setState({pageState: 'failed'})
    }
  }

  onBannerClose = () => {
    this.setState({banner: false})
  }

  onSearchInputChange = event => {
    this.setState({input: event.target.value})
  }

  onKeyDownEvent = event => {
    const {input} = this.state
    if (event.key === 'Enter') {
      this.setState({searchInput: input}, this.getVideos)
    }
  }

  onSearchClick = () => {
    const {input} = this.state
    this.setState({searchInput: input}, this.getVideos)
  }

  onRetry = () => {
    this.getVideos()
  }

  onNoResultRetry = () => {
    this.setState({searchInput: '', input: ''}, this.getVideos)
  }

  /* ---------- RENDER METHODS ---------- */

  renderBanner = () => (
    <Banner data-testid="banner">
      <div className="banner-info-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="nxt watch logo"
          className="logo"
        />
        <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
        <button type="button" className="getbtn">
          GET IT NOW
        </button>
      </div>

      <button
        data-testid="close"
        type="button"
        className="closebtn"
        onClick={this.onBannerClose}
      >
        <MdClose className="close" />
      </button>
    </Banner>
  )

  renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height={50} width={50} />
    </div>
  )

  renderFailureView = dark => (
    <div className="noResultound">
      <img
        src={
          dark
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
        }
        alt="failure view"
        className="noResultImage"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>
        We are having some trouble to complete your request.
        <br />
        Please try again.
      </p>
      <button type="button" className="retrybtn" onClick={this.onRetry}>
        Retry
      </button>
    </div>
  )

  renderNoResultFound = () => (
    <div className="noResultound">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        alt="no videos"
        className="noResultImage"
      />
      <h1>No Search results found</h1>
      <p>Try different key words or remove search filter</p>
      <button type="button" className="retrybtn" onClick={this.onNoResultRetry}>
        Retry
      </button>
    </div>
  )

  renderVideos = () => {
    const {videosList} = this.state

    if (videosList.length === 0) {
      return this.renderNoResultFound()
    }

    return (
      <ul className="videos-list-container">
        {videosList.map(video => (
          <AllVideosItem
            key={video.id}
            id={video.id}
            title={video.title}
            thumbnailUrl={video.thumbnail_url}
            channel={video.channel}
            viewCount={video.view_count}
            publishedAt={video.published_at}
          />
        ))}
      </ul>
    )
  }

  renderResult = dark => {
    const {pageState} = this.state

    switch (pageState) {
      case 'loading':
        return this.renderLoader()
      case 'success':
        return this.renderVideos()
      case 'failed':
        return this.renderFailureView(dark)
      default:
        return null
    }
  }

  /* ---------- MAIN RENDER ---------- */

  render() {
    const {banner, input} = this.state

    return (
      <ThemeContext.Consumer>
        {value => {
          const {dark} = value

          return (
            <>
              <Header />
              <div className="slide-home-flexes">
                <div>
                  <Slidebar />
                </div>
                <div>
                  <div className="home-bg-container">
                    {banner && this.renderBanner()}

                    <DarkContainer dark={dark} data-testid="home">
                      <div className="search-input-container">
                        <CustomInput
                          dark={dark}
                          type="search"
                          placeholder="Search"
                          value={input}
                          onChange={this.onSearchInputChange}
                          onKeyDown={this.onKeyDownEvent}
                        />
                        <button
                          data-testid="searchButton"
                          type="button"
                          className={
                            dark ? 'search-icon-dark' : 'search-icon-light'
                          }
                          onClick={this.onSearchClick}
                        >
                          <MdSearch />
                        </button>
                      </div>

                      {this.renderResult(dark)}
                    </DarkContainer>
                  </div>
                </div>
              </div>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Home
