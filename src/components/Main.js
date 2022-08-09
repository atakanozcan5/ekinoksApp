import React from 'react';
import Product from './Product';
import '../css/Product.css';


export default function Main(props) {
  const { products, onAdd } = props;
  return (

    <main className="block col-2">
      <h2>Products</h2>
        <div className="product">
          {products.map((product) => (
            <div className="content">
              <Product key={product.id} product={product} onAdd={onAdd}></Product>
            </div>
          ))}
        </div>
    </main>

  );
}