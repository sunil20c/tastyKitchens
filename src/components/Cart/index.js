import {Component} from 'react'

import {Link} from 'react-router-dom'
import Header from '../Header'
import CartItem from '../CartItem'
import Footer from '../Footer'

import './index.css'

class Cart extends Component {
  state = {cartItems: [], paymentSubmitted: false}

  componentDidMount() {
    const stringifiedCart = localStorage.getItem('cartData')
    const importedData = JSON.parse(stringifiedCart)
    console.log(importedData)
    this.setState({
      cartItems: importedData,
    })
  }

  onClickPlaceOrder = () => {
    this.setState({paymentSubmitted: true})
  }

  paymentSuccess = () => (
    <div className="payment-container">
      <h1 className="py-heading">Payment Successful</h1>
      <p className="py-text">
        Thank you for ordering Your payment is successfully completed.
      </p>
      <Link to="/">
        <button type="button" className="payment-button">
          Go To Home
        </button>
      </Link>
    </div>
  )

  cartListLength = () => (
    <div className="empty-cart-container">
      <img
        src="https://res.cloudinary.com/dndkedgtz/image/upload/v1638688034/cooking_11px_dpvfri.png"
        alt="empty cart"
        className="no-items-image"
      />
      <h1 className="no-heading">No Order Yet!</h1>
      <p className="no-text">
        Your cart is empty. Add something from the menu.
      </p>
      <Link to="/">
        <button type="button" className="order-now-button">
          Order now
        </button>
      </Link>
    </div>
  )

  render() {
    const {cartItems, paymentSubmitted} = this.state
    let total = 0
    cartItems.forEach(eachItem => {
      total += eachItem.cost
    })

    const cartItemsLength = cartItems.length > 0

    return (
      <div className="cart-main-bg-container">
        <Header />
        {paymentSubmitted ? (
          this.paymentSuccess()
        ) : (
          <div>
            {cartItemsLength ? (
              <div className="cart-items-container">
                <div className="menu-items">
                  <p className="menu-item">Item</p>
                  <p className="menu-quantity">Quantity</p>
                  <p className="menu-price">Price</p>
                </div>
                <ul className="cart-items">
                  {cartItems.map(cart => (
                    <CartItem key={cart.id} item={cart} />
                  ))}
                </ul>
                <div className="total-price-container">
                  <h1 className="order-total">Order Total:</h1>
                  <p testid="total-price">Rs.{total}/-</p>
                </div>
                <button
                  type="button"
                  className="place-order-button"
                  onClick={this.onClickPlaceOrder}
                >
                  Place Order
                </button>
              </div>
            ) : (
              this.cartListLength()
            )}
            <Footer />
          </div>
        )}
      </div>
    )
  }
}

export default Cart
