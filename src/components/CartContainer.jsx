import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CartItem from './CartItem'
import { openModal } from '../features/modal/modalSlice'

const CartContainer = () => {
  const dispatch = useDispatch()
  const { cartItems, amount, total, } = useSelector(store => store.cart)

  if (amount < 1) {
    return <section className='cart'>
      <header>
        <h2>購物車</h2>
        <h4 className='empty-cart'>還沒有任何東西喔...</h4>
      </header>
    </section>
  }

  return (
    <section className='cart'>
      <header>
        <h2>購物車</h2>
      </header>
      <div>
        {cartItems.map(item => <CartItem key={item.id} {...item} />)}
      </div>
      <footer>
        <hr />
        <div className='cart-total'>
          <h4>
            total <span>$ {total.toFixed(2)}</span>
          </h4>
        </div>
        <button className='btn clear-btn' onClick={() => dispatch(openModal())}>清空購物車</button>
      </footer>
    </section>
  )
}

export default CartContainer