import Counter from '../Counter'

import './index.css'

const CartItem = props => {
  const {item} = props
  const {cost, name, imageUrl} = item

  return (
    <li testid="cartItem" className="cart-list-item-container">
      <div className="title-image-container">
        <img src={imageUrl} alt={name} className="cart-item-image" />
        <h1 className="cart-item-name">{name}</h1>
      </div>

      <Counter />
      <p className="cart-item-cost">{cost}</p>
    </li>
  )
}

export default CartItem
