import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'
import './index.css'

export default function Footer() {
  return (
    <div className="footer-main-bg-container">
      <div className="logo-container">
        <img
          src="https://res.cloudinary.com/dndkedgtz/image/upload/v1638687926/Vector3x_vj7amr.png"
          alt="website-footer-logo"
          className="footer-logo-image"
        />
        <h1 className="footer-heading">Tasty Kitchens </h1>
      </div>

      <p className="footer-text">
        The only thing we are serious about is food. Contact us on
      </p>

      <ul className="footer-subscribes">
        <li testid="pintrest-social-icon">
          <FaPinterestSquare className="react-icon" />
        </li>
        <li testid="instagram-social-icon">
          <FaInstagram className="react-icon" />
        </li>
        <li testid="twitter-social-icon">
          <FaTwitter className="react-icon" />
        </li>
        <li testid="facebook-social-icon">
          <FaFacebookSquare className="react-icon" />
        </li>
      </ul>
    </div>
  )
}
