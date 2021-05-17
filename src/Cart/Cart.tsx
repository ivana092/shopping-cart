import CartItem from '../CartItem/CartItem';

import { Wrapper } from './Cart.styles';
import { CartItemType } from '../App';
import React from 'react';

type CartProps = {
    cartItems: CartItemType[];
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
};

const Cart: React.FC<CartProps> = ({ cartItems, addToCart, removeFromCart }: CartProps) => {
    const calculateTotal = (items: CartItemType[]) =>
        items.reduce((acc: number, item) => acc + item.amount * item.price, 0);

    return (
        <Wrapper>
            <h2> Your shopping cart</h2>
            {cartItems.length === 0 ? <p> No items in your cart right now</p> : null}
            {cartItems.map(item => (
                <CartItem
                    key={item.id}
                    item={item}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                />
            ))}
            <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
        </Wrapper>
    )
};

export default Cart;