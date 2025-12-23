import {formatDistanceToNow} from 'date-fns'
import {Link} from 'react-router-dom'
import './index.css'

const AllVideosItem = props => {
  const {title, thumbnailUrl, channel, viewCount, publishedAt, id} = props

  const profileImg = channel.profileImageUrl || channel.profile_image_url

  const postedAt = formatDistanceToNow(new Date(publishedAt))

  return (
    <li className="video-item">
      <Link to={`/videos/${id}`} className="link-items">
        <img src={thumbnailUrl} alt="video thumbnail" className="thumbnail" />

        <div className="video-details-container">
          <img src={profileImg} alt="channel logo" className="profile-image" />

          <div className="text-container">
            <p className="title">{title}</p>
            <p className="channel-name">{channel.name}</p>

            <div className="views-date-container">
              <p className="view-count">{viewCount} views</p>
              <p className="published-date">{postedAt} ago</p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default AllVideosItem
