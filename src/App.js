import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
import Modal from "./components/Modal";

import { useDispatch, useSelector } from 'react-redux'
import { calculateTotals } from './features/cart/cartSlice'
import { useEffect } from 'react'
import { getCartItems } from './features/cart/cartSlice'

function App() {
  const { isOpen } = useSelector(store => store.modal)
  const { cartItems, isLoading } = useSelector(store => store.cart)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getCartItems())
  }, [])
  
  useEffect(() => {
    dispatch(calculateTotals())
  }, [cartItems])


  if (isLoading) {
    return <div className="loading">
      <h1>Loading...</h1>
    </div>
  }

  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  )
}
export default App;
