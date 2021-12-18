import {Component} from 'react'
import {AiOutlineMinusSquare} from 'react-icons/ai'
import {FaStar} from 'react-icons/fa'
import {BiRupee} from 'react-icons/bi'

import Counter from '../Counter'

import './index.css'

class FoodItem extends Component {
  state = {addItemStatus: false, quantity: 2}

  onClickIncrement = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  onClickDecrement = () => {
    const {quantity} = this.state
    if (quantity > 1) {
      this.setState(prevState => ({quantity: prevState.quantity - 1}))
    }
  }

  quantityChange = () => {
    const {quantity} = this.state
    return (
      <div>
        <button
          type="button"
          testid="decrement count"
          className="quantity-change-button"
          onClick={this.onClickDecrement}
        >
          <AiOutlineMinusSquare />
        </button>
        <p testid="active-count">{quantity}</p>
        <button
          testid="increment count"
          type="button"
          className="quantity-change-button"
          onClick={this.onClickIncrement}
        >
          <AiOutlineMinusSquare />
        </button>
      </div>
    )
  }

  onClickAdd = () => {
    const {foodItemDetails, getIntoCart} = this.props

    getIntoCart(foodItemDetails)
  }

  render() {
    const {foodItemDetails} = this.props
    const {imageUrl, name, cost, rating} = foodItemDetails
    const {addItemStatus} = this.state

    return (
      <li testid="foodItem" className="food-item-container">
        <img src={imageUrl} alt={name} className="item-image" />
        <div className="details-section">
          <h1 className="name">{name}</h1>

          <p className="cost">
            <BiRupee />
            {cost}
          </p>
          <div className="fd-rating-container">
            <FaStar className="food-star" />
            <p className="rating">{rating}</p>
          </div>
          {addItemStatus ? (
            <Counter />
          ) : (
            <button
              type="button"
              className="add-button"
              onClick={this.onClickAdd}
            >
              Add
            </button>
          )}
        </div>
      </li>
    )
  }
}
export default FoodItem
