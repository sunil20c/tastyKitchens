import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-main-bg-container">
      <Link to="/">
        <img
          src="https://res.cloudinary.com/dndkedgtz/image/upload/v1638687896/Frame_2742x_jf8sh8.png"
          alt="website logo"
          className="header-logo"
        />
      </Link>
      <ul className="menu-bar-items">
        <li>
          <Link to="/" className="menu-list-item">
            Home
          </Link>
        </li>
        <li>
          <Link to="/cart" className="menu-list-item">
            Cart
          </Link>
        </li>
      </ul>
      <button type="button" onClick={onClickLogout} className="logout-button">
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
