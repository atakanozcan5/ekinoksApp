import Header from './components/Header';
import { useState } from 'react';
import React from 'react';
import MainRouter from './routes'
import Footer from './components/Footer';


function App() {
  const [product,setProduct]=useState([]);
  return (
    <div className="Main">
      <Header cartItems={product}></Header>
      <MainRouter onAdd={(products)=>{setProduct(products)}}/>
      <Footer></Footer>
    </div>
  );
}

export default App;