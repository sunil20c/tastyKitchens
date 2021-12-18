import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'

import './index.css'

const RestaurantItem = props => {
  const {restaurantDetails} = props
  const {id, name, imageUrl, cuisine, userRating} = restaurantDetails

  const {rating, totalReviews} = userRating
  return (
    <li testid="restaurant-item">
      <Link to={`/restaurant/${id}`} className="restaurant-item-container">
        <img src={imageUrl} alt="restaurant" className="food-image" />
        <div className="restaurant-details-section">
          <h1 className="restaurant-name">{name}</h1>
          <p className="cuisine">{cuisine}</p>

          <div className="ratings-container">
            <div className="rs-rating-container">
              <FaStar className="rs-star" />
              <p>{rating}</p>
            </div>
            <p className="ratings-data">({totalReviews} ratings)</p>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default RestaurantItem
