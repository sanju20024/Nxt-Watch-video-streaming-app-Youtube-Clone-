import {Link} from 'react-router-dom'
import './index.css'

const GamingVideoItem = props => {
  const {videoDetails, dark} = props
  const {id, title, thumbnailUrl, viewCount} = videoDetails

  return (
    <Link to={`/videos/${id}`} className="link-style">
      <li className="video-item-g">
        <img src={thumbnailUrl} alt="video thumbnail" className="thumbnail" />
        <div className="video-details-container">
          <p className={dark ? 'title-dark-g' : 'title-light-g'}>{title}</p>
          <p className="view-count">{viewCount} Watching Worldwide</p>
        </div>
      </li>
    </Link>
  )
}

export default GamingVideoItem
