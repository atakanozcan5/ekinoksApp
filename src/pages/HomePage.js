import Main from '../components/Main';
import { useState } from 'react';
import React, { useEffect } from 'react';
import axios from 'axios';
import Basket from '../components/Basket';


function HomePage(props) {
  const [cartItems, setCartItems] = useState([]);
  const [products, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios({
      method: 'GET',
      url: 'https://fakestoreapi.com/products',
    })
      .then(response => {
        // console.log(response.data)
        setData(response.data)
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false))
  }, [])

  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
      if(props.onAdd){
        props.onAdd(cartItems);
      }
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
      if(props.onAdd){
        props.onAdd([...cartItems, { ...product, qty: 1 }]);
      }
    }
  };
  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };



  return (
    <div className="row">
      <Main products={products} onAdd={onAdd}>
        {loading && (
          <div>
            {" "}
            <h1>Loading...</h1>
          </div>
        )}</Main>
      <Basket
        cartItems={cartItems}
        onAdd={onAdd}
        onRemove={onRemove} />
    </div>
  );
}

export default HomePage;