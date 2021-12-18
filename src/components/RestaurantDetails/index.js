import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {BiRupee} from 'react-icons/bi'
import Header from '../Header'

import Footer from '../Footer'

import './index.css'
import FoodItem from '../FoodItem'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class RestaurantDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    itemsList: {},
    cartData: [],
  }

  componentDidMount() {
    this.getItems()
  }

  getIntoCart = foodItem => {
    const {cartData} = this.state
    console.log(foodItem.id)
    const testingFoodItem = cartData.find(
      eachCartItem => eachCartItem.id === foodItem.id,
    )

    console.log(testingFoodItem)
    console.log(cartData)
    if (testingFoodItem === undefined) {
      /* const added = itemsList.foodItems.filter(each => each.id === foodItem.id) */
      this.setState(prevState => ({
        cartData: [...prevState.cartData, foodItem],
      }))
    }
    if (testingFoodItem !== undefined) {
      this.setState(prevState => ({cartData: [...prevState.cartData]}))
    }

    localStorage.setItem('cartData', JSON.stringify(cartData))
  }

  convertedFormat = item => ({
    id: item.id,
    rating: item.rating,
    name: item.name,
    costForTwo: item.cost_for_two,
    cuisine: item.cuisine,
    imageUrl: item.image_url,
    reviewsCount: item.reviews_count,
    opensAt: item.opens_at,
    location: item.location,
    itemsCount: item.items_count,
    foodItems: item.food_items.map(each => ({
      name: each.name,
      cost: each.cost,
      rating: each.rating,
      foodType: each.food_type,
      imageUrl: each.image_url,
      id: each.id,
    })),
  })

  getItems = async () => {
    const {match} = this.props
    const {params} = match
    console.log(this.props)
    const {id} = params
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const fetchedData = this.convertedFormat(data)
      console.log(data)
      this.setState({
        itemsList: fetchedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFoodItemsSuccessView = () => {
    const {itemsList} = this.state
    const {
      foodItems,
      costForTwo,
      name,
      location,
      rating,
      imageUrl,
      cuisine,
      reviewsCount,
    } = itemsList
    return (
      <div>
        <div className="banner-main-container">
          <img
            src={imageUrl}
            alt="restaurant"
            className="restaurant-banner-image"
          />
          <div className="restaurant-banner-details">
            <h1>{name}</h1>
            <p className="rb-details">{cuisine}</p>
            <p className="rb-details">{location}</p>
            <div className="two-containers">
              <div className="rating-cost-container">
                <div className="ratings-container">
                  <p className="rb-details">{rating}</p>
                  <p className="rb-details">{reviewsCount}+ Ratings</p>
                </div>
                <vr className="vertical-line" />
                <div>
                  <p className="rb-details">
                    <BiRupee />
                    {costForTwo}
                  </p>
                  <p>Cost for two</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul className="food-items-list">
          {foodItems.map(eachFood => (
            <FoodItem
              key={eachFood.id}
              foodItemDetails={eachFood}
              itemsList={itemsList}
              getIntoCart={this.getIntoCart}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => (
    <div>
      <h1 className="failure-heading">Oops! Something went wrong</h1>
    </div>
  )

  renderLoadingView = () => (
    <div testid="restaurant-details-loader">
      <Loader type="Oval" color="green" height={30} width={30} />
    </div>
  )

  renderFoodItems = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderFoodItemsSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <p>This is restaurant Details section</p>
        {this.renderFoodItems()}
        <Footer />
      </div>
    )
  }
}

export default RestaurantDetails
