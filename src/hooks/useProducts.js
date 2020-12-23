import {useEffect, useState} from 'react';
import {INCREMENT} from "../components/CartManagement/CartManagement";

export const useProducts = () => {
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const onChangeProduct = (pid, actionType, status) =>
    setProducts(products => products.map(product => {
      if (product.pid === pid) {
        return {
          ...product,
          quantity: status === 200
            ? actionType === INCREMENT ? ++product.quantity : --product.quantity
            : product.min
        };
      } else return product;
    }));

  const getProducts = () => {
    setIsLoading(true);
    fetch('/api/cart', {
      method: 'get'
    })
      .then(response => response.json())
      .then(response => {
        setProducts(response.map(i => ({...i, quantity: i.min})));
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return {
    products,
    isLoading,
    onChangeProduct
  }
};
