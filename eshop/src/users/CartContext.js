import React, { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        setCartCount(cart.reduce((acc, product) => acc + product.quantity, 0));
        calculateTotalPrice();
    }, [cart]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((p) => p.id === product.id);
            if (existingProduct) {
                return prevCart.map((p) =>
                    p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((product) => product.id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) return; // Prevent setting quantity to zero or negative

        setCart((prevCart) =>
            prevCart.map((product) =>
                product.id === productId ? { ...product, quantity } : product
            )
        );
    };

    const calculateTotalPrice = () => {
        setTotalPrice(cart.reduce((acc, product) => acc + product.price * product.quantity, 0));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, totalPrice, cartCount }}>
            {children}
        </CartContext.Provider>
    );
};
