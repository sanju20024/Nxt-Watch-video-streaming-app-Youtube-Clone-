import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import ReactPlayer from 'react-player'
import {AiOutlineLike, AiOutlineDislike, AiOutlineSave} from 'react-icons/ai'
import {formatDistanceToNow} from 'date-fns'
import {VideoDetailsActionButton} from '../../ThemeStyledContext'

import ThemeContext from '../../ThemeContext'
import Header from '../Header'
import Slidebar from '../Slidebar'

import './index.css'

const apiStatus = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class VideoItemDetails extends Component {
  state = {
    videoDetail: {},
    status: apiStatus.loading,
    isLiked: false,
    isDisliked: false,
  }

  componentDidMount() {
    this.getVideoDetail()
  }

  getVideoDetail = async () => {
    this.setState({status: apiStatus.loading})
    const {match} = this.props
    const {id} = match.params
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    try {
      const response = await fetch(url, options)
      if (response.ok) {
        const data = await response.json()
        const v = data.video_details

        const updatedVideo = {
          id: v.id,
          title: v.title,
          thumbnailUrl: v.thumbnail_url,
          videoUrl: v.video_url,
          viewCount: v.view_count,
          publishedAt: v.published_at,
          description: v.description,
          channel: {
            name: v.channel.name,
            profileImageUrl: v.channel.profile_image_url,
            subscriberCount: v.channel.subscriber_count,
          },
        }

        this.setState({
          videoDetail: updatedVideo,
          status: apiStatus.success,
        })
      } else {
        this.setState({status: apiStatus.failure})
      }
    } catch {
      this.setState({status: apiStatus.failure})
    }
  }

  onClickLike = () => {
    this.setState(prev => ({
      isLiked: !prev.isLiked,
      isDisliked: false,
    }))
  }

  onClickDislike = () => {
    this.setState(prev => ({
      isDisliked: !prev.isDisliked,
      isLiked: false,
    }))
  }

  onClickSave = (savedVideos, addVideo, removeVideo) => {
    const {videoDetail} = this.state
    const isAlreadySaved = savedVideos.find(each => each.id === videoDetail.id)

    if (isAlreadySaved) {
      removeVideo(videoDetail.id)
    } else {
      addVideo(videoDetail)
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
      <h1 className={dark ? 'text-dark' : 'text-light'}>
        Oops! Something Went Wrong
      </h1>
      <button type="button" className="retry-btn" onClick={this.getVideoDetail}>
        Retry
      </button>
    </div>
  )

  renderSuccessView = (dark, savedVideos, addVideo, removeVideo) => {
    const {videoDetail, isLiked, isDisliked} = this.state
    const isSaved = savedVideos.some(each => each.id === videoDetail.id)
    const nowTime = formatDistanceToNow(new Date(videoDetail.publishedAt))

    return (
      <div className="video-details-content">
        <ReactPlayer
          url={videoDetail.videoUrl}
          width="100%"
          height="420px"
          controls
        />

        <p className={dark ? 'text-dark' : 'text-light'}>{videoDetail.title}</p>

        <div className="video-stats-actions">
          <p className={dark ? 'text-dark' : 'text-light'}>
            {videoDetail.viewCount} views • {nowTime}
          </p>

          <div className="actions-container">
            <VideoDetailsActionButton
              type="button"
              onClick={this.onClickLike}
              isActive={isLiked}
            >
              <AiOutlineLike className="iconss" />
              Like
            </VideoDetailsActionButton>

            <VideoDetailsActionButton
              type="button"
              onClick={this.onClickDislike}
              isActive={isDisliked}
            >
              <AiOutlineDislike className="iconss" />
              Dislike
            </VideoDetailsActionButton>

            <button
              type="button"
              onClick={() =>
                this.onClickSave(savedVideos, addVideo, removeVideo)
              }
              className="action-btn"
              style={{color: isSaved ? '#2563eb' : '#64748b'}}
            >
              <AiOutlineSave className="iconss" /> {isSaved ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>

        <hr />

        <div className="channel-info">
          <img
            src={videoDetail.channel.profileImageUrl}
            alt="channel logo"
            className="channel-logo-D"
          />
          <div>
            <p className={dark ? 'text-dark' : 'text-light'}>
              {videoDetail.channel.name}
            </p>
            <p className={dark ? 'text-dark' : 'text-light'}>
              {videoDetail.channel.subscriberCount} subscribers
            </p>
          </div>
        </div>

        <p className={dark ? 'text-dark' : 'text-light'}>
          {videoDetail.description}
        </p>
      </div>
    )
  }

  renderResult = (dark, savedVideos, addVideo, removeVideo) => {
    const {status} = this.state

    switch (status) {
      case apiStatus.loading:
        return this.renderLoader()
      case apiStatus.success:
        return this.renderSuccessView(dark, savedVideos, addVideo, removeVideo)
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
          const {dark, savedVideos, addVideo, removeVideo} = value

          return (
            <>
              <Header />

              <div className="video-item-details-layout">
                <div className="sidebar-space">
                  <Slidebar />
                </div>

                <div
                  className={dark ? 'video-bg-dark' : 'video-bg-light'}
                  data-testid="videoItemDetails"
                >
                  {this.renderResult(dark, savedVideos, addVideo, removeVideo)}
                </div>
              </div>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default VideoItemDetails
