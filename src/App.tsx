import React from 'react';
import { useState } from 'react';
import { useQuery } from 'react-query';
//import {Context} from './contexts/Context';
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';
import Item from './Item/Item';
import Cart from './Cart/Cart';

// Styles
import { Wrapper, StyledButton } from './App.styles';

// Types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number; //added own property not returned by API to keep track of amount
}

const getProducts = async (): Promise<CartItemType[]> => {
  let products = await fetch('https://fakestoreapi.com/products');
  let productsJSON = await products.json();
  return productsJSON;
}

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  //useQuery hook used
  const { data, isLoading, error } = useQuery<CartItemType[]>('products', getProducts);
  console.log(data);

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((acc: number, item) => acc + item.amount, 0);

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      // if already in cart
      const isAlredayPresent = prev.find(item => item.id === clickedItem.id);
      if (isAlredayPresent) {
        return prev.map(prevItem => prevItem.id === clickedItem.id ?
          { ...prevItem, amount: prevItem.amount + 1 } : prevItem
        );
      }

      // item added for the first time
      return [...prev, { ...clickedItem, amount: 1 }]; //adding like this since amount property not returned from api
    })
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev =>
      prev.reduce((acc, item) => {
        if (item.id === id) {
          if (item.amount === 1) {
            return acc;
          }
          return [...acc, { ...item, amount: item.amount - 1 }];
        }
        else {
          return [...acc, item];
        }
      }, [] as CartItemType[])
    )
  };

  if (isLoading) {
    return <LinearProgress />;
  }

  if (error) {
    return <div>Something went wrong...</div>;
  }

  return (
    <Wrapper>
      {/* RIGHT SIDE CART STARTS */}
      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart} />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      {/* RIGHT SIDE CART ENDS */}
      {/* THE SELECTION PAGE */}
      <Grid container spacing={3}>
        {data?.map(item => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default App;
