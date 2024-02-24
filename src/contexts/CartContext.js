import { useState, createContext } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(
        JSON.parse(localStorage.getItem('cart')) || []
    );

    //cart methods

    const addItemToCart = (item) => {
        setCart([...cart, item]);
        localStorage.setItem('cart', JSON.stringify([...cart, item]));
    };

    const removeItemFromCart = (id) => {
        setCart(cart.filter((cartItem) => cartItem.id !== id));
        localStorage.setItem(
            'cart',
            JSON.stringify(cart.filter((cartItem) => cartItem.id !== id))
        );
    };

    const isInCart = (itemId) => cart.some((cartItem) => cartItem.id === itemId);

    const amountOfItemsInCart = () =>
        cart.reduce((acc, item) => (acc += item.quantity), 0);

    const totalCartDiscountedPrice = () =>
        cart.reduce((acc, item) => (acc += Math.round((item.price - (item.price * item.discountPercentage * 1 / 100)) * item.quantity)), 0);

    const totalCartPrice = () =>
        cart.reduce((acc, item) => (acc += item.price * item.quantity), 0);
    
    const resetCart = () => {
        setCart([]);
        localStorage.setItem('cart', JSON.stringify([]));
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                setCart,
                addItemToCart,
                removeItemFromCart,
                isInCart,
                amountOfItemsInCart,
                totalCartPrice,
                totalCartDiscountedPrice,
                resetCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};