// hooks are nothing just the functional component that provide value of a specific context to its children
import React, { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext(null);
const CART_KEY = "cart"; // we will use it for local storage of the cart so that after we refresh we still have it
const EMPTY_CART = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
};

export default function CartProvider({ children }) {
  const initCart = getCartFromLocalStorage();
  const [cartItems, setCartItems] = useState(initCart.items);
  const [totalPrice, setTotalPrice] = useState(initCart.totalPrice);
  const [totalCount, setTotalCount] = useState(initCart.totalCount);

  // we are using the useeffect and adding cartItems as dependencies so whenever a item is remove added of any quantity is changed thi function will be called
  // this is for overall cart
  useEffect(() => {
    const totalPrice = sum(cartItems.map((item) => item.price));
    const totalCount = sum(cartItems.map((item) => item.quantity));
    setTotalCount(totalCount);
    setTotalPrice(totalPrice);

    localStorage.setItem(
      CART_KEY,
      JSON.stringify({
        items: cartItems,
        totalPrice,
        totalCount,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }, [cartItems]);

  function getCartFromLocalStorage() {
    const storedCart = localStorage.getItem(CART_KEY);
    return storedCart ? JSON.parse(storedCart) : EMPTY_CART;
  }

  // this items is not cart items it is the list of price or quantity
  // this func will sum them together wheter it is price or quantity
  const sum = (items) => {
    return items.reduce((prevValue, currValue) => prevValue + currValue, 0);
    // it returns prevValue + currValue with a initial value of 0
  };

  const removeFromCart = (foodId) => {
    const filteredCartItems = cartItems.filter(
      (item) => item.food.id !== foodId
    );
    setCartItems(filteredCartItems);
  };

  const changeQuantity = (cartItem, newQuantity) => {
    const { food } = cartItem;

    const changedCartItem = {
      ...cartItem,
      quantity: newQuantity,
      price: food.price * newQuantity,
    };

    setCartItems(
      cartItems.map((item) =>
        item.food.id === food.id ? changedCartItem : item
      )
    );
  };

  // we will use it inside the foodpage
  const addToCart = (food) => {
    const cartItem = cartItems.find((item) => item.food.id === food.id);
    // i.e the fonnd that we going to add is already there will just inc the quantity.
    if (cartItem) {
      changeQuantity(cartItem, cartItem.quantity + 1);
    } else {
      // otherwise we've created a new array using previous items + the added one with its quant and price.
      setCartItems([...cartItems, { food, quantity: 1, price: food.price }]);
    }
  };

const clearCart = () =>{
localStorage.removeItem(CART_KEY);
const {items,totalPrice,totalCount} = EMPTY_CART;
setCartItems(items);
setTotalPrice(totalPrice);
setTotalCount(totalCount);
};


  return (
    <CartContext.Provider
      value={{
        cart: { items: cartItems, totalPrice, totalCount },
        removeFromCart,
        changeQuantity,
        addToCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
    // cart context is provinding us value and children
  );
}

// for getting the value inside the children we need to use useContext by passing the cartContext
export const useCart = () => useContext(CartContext);

// now all we need to do is as we have exported the useCart function in whcih we have cartContext, just make the cartProvider function as the parent where we need to ue cart.
// which we will be doing in index.js file and making it parent of app
