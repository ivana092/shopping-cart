import React from 'react';
import { CartItemType } from '../App';

type Props = {
    cartItems: CartItemType[];
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
};

export const Context = React.createContext({} as Props);

export const useCartContext = () => {
    const ctx = React.useContext(Context);
    return ctx;
};

