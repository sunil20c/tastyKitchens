import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="nf-main-container">
    <img
      src="https://res.cloudinary.com/dndkedgtz/image/upload/v1638688050/erroring_11px_vfmihp.png"
      alt="not found"
      className="not-found-image"
    />
    <h1 className="nf-heading">Page Not Found</h1>
    <p className="nf-text">
      we are sorry, the page you requested could not be found
    </p>
    <Link to="/">
      <button type="button" className="nf-button">
        Home Page
      </button>
    </Link>
  </div>
)
export default NotFound
