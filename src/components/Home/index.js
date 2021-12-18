import {Component} from 'react'

import {BsChevronLeft, BsChevronRight} from 'react-icons/bs'
import {MdSort} from 'react-icons/md'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import Header from '../Header'
import RestaurantItem from '../RestaurantItem'
import Footer from '../Footer'

import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class Home extends Component {
  state = {
    restaurantsList: [],
    limit: 9,
    apiStatus: apiStatusConstants.initial,
    carousels: [],
    ratingCategory: sortByOptions[1].value,
    searchInput: '',
    activePage: 1,
  }

  componentDidMount() {
    this.getRestaurants()
    this.getCarousels()
  }

  onClickDecreasePageNumber = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState(
        prevState => ({
          activePage: prevState.activePage - 1,
        }),
        this.getRestaurants,
      )
    }
  }

  onClickIncreasePageNumber = () => {
    const {restaurantsList} = this.state
    if (restaurantsList.length > 0) {
      this.setState(
        prevState => ({
          activePage: prevState.activePage + 1,
        }),
        this.getRestaurants,
      )
    }
  }

  onChangeCategory = event => {
    this.setState({ratingCategory: event.target.value}, this.getRestaurants)
  }

  getCarousels = async () => {
    const carouselUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(carouselUrl, options)
    if (response.ok === true) {
      const carouselData = await response.json()
      const carouselList = carouselData.offers.map(eachOffer => ({
        imageUrl: eachOffer.image_url,
        id: eachOffer.id,
      }))
      this.setState({carousels: carouselList})
    }
  }

  setRatingParams = user => ({
    rating: user.rating,
    totalReviews: user.total_reviews,
    ratingText: user.rating_text,
    ratingColor: user.rating_color,
  })

  getRestaurants = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {activePage, limit, ratingCategory, searchInput} = this.state
    const offset = (activePage - 1) * limit

    const apiUrl = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}&sort_by_rating=${ratingCategory}&searchInput=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()

      const restaurantsUpdate = fetchedData.restaurants.map(restaurant => ({
        imageUrl: restaurant.image_url,
        id: restaurant.id,
        isDeliveringNow: restaurant.is_delivering_now,
        costForTwo: restaurant.cost_for_two,
        cuisine: restaurant.cuisine,
        groupByTime: restaurant.group_by_time,
        hasOnlineDelivery: restaurant.has_online_delivery,
        location: restaurant.location,
        menuType: restaurant.menu_type,
        name: restaurant.name,
        opensAt: restaurant.opens_at,
        userRating: this.setRatingParams(restaurant.user_rating),
      }))
      this.setState({
        restaurantsList: restaurantsUpdate,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderCarousels = () => {
    const {carousels} = this.state
    const settings = {
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
    }

    return (
      <div className="slider-container">
        <Slider {...settings}>
          {carousels.map(each => (
            <img src={each.imageUrl} alt="offer" className="slider-image" />
          ))}
        </Slider>
      </div>
    )
  }

  renderRestaurantsSuccessView = () => {
    const {restaurantsList} = this.state
    return (
      <div>
        {this.renderCarousels()}
        <h1 className="home-heading">Popular Restaurants</h1>
        <p className="home-text">
          Select Your favourite restaurant special dish and make your day
          happy...
        </p>
        <ul className="restaurants-list-items">
          {restaurantsList.map(eachRestaurant => (
            <RestaurantItem
              key={eachRestaurant.id}
              restaurantDetails={eachRestaurant}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => (
    <div>
      <h1>Oops! Something went wrong</h1>
    </div>
  )

  renderLoadingView = () => (
    <div testid="restaurants-lists-loader">
      <Loader type="Oval" color="green" height={30} width={30} />
    </div>
  )

  renderPageNumbers = () => {
    const {activePage, restaurantsList} = this.state
    const totalPages = Math.ceil(restaurantsList.length)
    return (
      <div className="page-numbers-container">
        <button
          type="button"
          testid="pagination-right-button"
          onClick={this.onClickDecreasePageNumber}
          className="page-icon-button"
        >
          <p>
            <BsChevronLeft />
          </p>
        </button>
        <p testid="active-page-number">
          {activePage} of {totalPages}
        </p>
        <button
          type="button"
          testid="pagination-left-button"
          onClick={this.onClickIncreasePageNumber}
          className="page-icon-button"
        >
          <p>
            <BsChevronRight />
          </p>
        </button>
      </div>
    )
  }

  renderHomeView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRestaurantsSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {ratingCategory} = this.state
    return (
      <div>
        <Header />
        <div className="rating-category-container">
          <MdSort />
          <p className="sort-by">Sort By</p>
          <select value={ratingCategory} onChange={this.onChangeCategory}>
            {sortByOptions.map(eachOption => (
              <option key={eachOption.id} value={eachOption.value}>
                {eachOption.displayText}
              </option>
            ))}
          </select>
        </div>
        {this.renderHomeView()}
        {this.renderPageNumbers()}
        <Footer />
      </div>
    )
  }
}

export default Home
