import { createSlice, createAsyncThunk, isRejected } from "@reduxjs/toolkit";
import axios from 'axios'

const url = 'https://course-api.com/react-useReducer-cart-project';

export const getCartItems = createAsyncThunk('cart/getCartItems', async() => {
  try {
    const response = await axios(url)
    return response.data
  } catch(error) {

  }
})

const initialState = {
  cartItems: [],
  amount: 4,
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = []
    },
    removeItem: (state, action) => {
      const itemId = action.payload
      state.cartItems = state.cartItems.filter((item) => (item.id !== itemId))
    },
    increaseAmount: (state, action) => {
      const itemId = action.payload
      const product = state.cartItems.find((item) => (item.id === itemId))
      product.amount += 1
    },
    decreaseAmount: (state, action) => {
      const itemId = action.payload
      const product = state.cartItems.find((item) => (item.id === itemId))
      product.amount -= 1
    },
    calculateTotals: (state) => {
      let amount = 0
      let total = 0
      state.cartItems.forEach((item) => {
        amount += item.amount
        total += item.amount * item.price
      })
      state.amount = amount
      state.total = total
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(getCartItems.rejected, (state) => {
        state.isLoading = false;
      })
  }
    // [getCartItems.pending]: (state) => {
    //   state.isLoading = true;
    // },
    // [getCartItems.fulfilled]: (state, action) => {
    //   // console.log(action);
    //   state.isLoading = false;
    //   state.cartItems = action.payload;
    // },
    // [getCartItems.rejected]: (state) => {
    //   state.isLoading = false;
    // }
})

export const { clearCart, removeItem, increaseAmount, decreaseAmount, calculateTotals } = cartSlice.actions

// console.log(cartSlice);
export default cartSlice.reducer