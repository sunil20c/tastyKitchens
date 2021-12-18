import {Component} from 'react'

import './index.css'

class Counter extends Component {
  state = {quantity: 2}

  onDecrement = () => {
    const {quantity} = this.state
    if (quantity > 1) {
      this.setState(prevState => ({quantity: prevState.quantity - 1}))
    }
  }

  onIncrement = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  render() {
    const {quantity} = this.state
    return (
      <div className="quantity-container">
        <button
          type="button"
          testid="decrement-count"
          onClick={this.onDecrement}
        >
          -
        </button>
        <p testid="active-count" className="quantity">
          {quantity}
        </p>
        <button
          type="button"
          testid="increment-count"
          onClick={this.onIncrement}
        >
          +
        </button>
      </div>
    )
  }
}

export default Counter
