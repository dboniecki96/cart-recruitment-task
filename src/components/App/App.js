import React from 'react';
import {calculateSum, displayProductData} from "utils/Utils";
import {useProducts} from "../../hooks/useProducts";
import {CartManagement} from "../CartManagement/CartManagement";
import './App.css';

const App = () => {
  const {isLoading, products, onChangeProduct} = useProducts();

  return (
    <div className="container">
      <h3>Lista produktów</h3>
      {
        isLoading || !products
          ? <p className='loading'>Ładowanie produktów...</p>
          : <React.Fragment>
            <ul>
              {
                products.map(product => (
                  <li key={product.pid}>
                    {displayProductData(product)}
                    <CartManagement pid={product.pid}
                                    min={product.min}
                                    max={product.max}
                                    quantity={product.quantity}
                                    onChangeProduct={onChangeProduct}
                    />
                  </li>
                ))
              }
            </ul>
            <h3>Całkowita kwota zamówienia: {calculateSum(products)}</h3>
          </React.Fragment>
      }
    </div>
  );
};

export {
  App
};
