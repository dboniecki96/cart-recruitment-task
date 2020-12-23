import React from 'react';

const formatAmount = stringifiedAmount =>
  `${(+stringifiedAmount).toFixed(2).replace('.', ',')}zł`;

export const displayProductData = product =>
  <span>{product.name}, cena: <span className='value'>{formatAmount(product.price)}</span></span>;

export const calculateSum = products =>
  formatAmount(products.reduce((acc, product) => {
    const quantity = +product.price * product.quantity;
    return acc + quantity;
  }, 0));
