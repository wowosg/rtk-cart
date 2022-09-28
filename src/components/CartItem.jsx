import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from '../icons';
import { useDispatch } from 'react-redux';
import { removeItem, increaseAmount, decreaseAmount } from '../features/cart/cartSlice';

const CartItem = ({ id, img, title, price, amount }) => {
  const dispatch = useDispatch()

  const [isEmpty, setIsEmpty] = useState(true)

  return (
    <article className='cart-item'>
      <img src={img} alt={title} />
      <div>
        <h4>{title}</h4>
        <h4 className='item-price'>$ {price}</h4>
        <button className='remove-btn' onClick={() => dispatch(removeItem(id))}>刪除</button>
      </div>
      <div>
        <button className='amount-btn' onClick={() => dispatch(increaseAmount(id))}>
          <ChevronUp />
        </button>
        <p className='amount'>{amount}</p>
        <button className='amount-btn' onClick={() => dispatch(decreaseAmount(id))} disabled={isEmpty ? amount === 0 : amount !== 0}>
          <ChevronDown />
        </button>
      </div>
    </article>
  )
}

export default CartItem