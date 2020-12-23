import React, {useState} from 'react';
import './CartManagement.css';

export const INCREMENT = 'increment';
export const DECREMENT = 'decrement';

const CartManagement = ({pid, min, max, quantity, onChangeProduct, isBlocked}) => {
  const [isCheckingProduct, setIsCheckingProduct] = useState(false);

  const renderText =
    <p>Obecnie masz <span className='value'>
      {quantity + (quantity <= 1 ? ' sztukę' : quantity < 5 ? ' sztuki' : ' sztuk')}
    </span> produktu</p>;

  const checkProduct = actionType => {
    setIsCheckingProduct(true);
    fetch('/api/product/check', {
      method: 'post',
      body: JSON.stringify({
        pid,
        quantity: actionType === 'increment' ? ++quantity : --quantity
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      onChangeProduct(pid, actionType, res.status);
      setIsCheckingProduct(false);
    });
  };

  return (
    <div className='cart'>
      <div className='info'>
        <p>Minimalna liczba sztuk: <span className='value'>{min}</span></p>
        <p>Maksymalna liczba sztuk: <span className='value'>{max}</span></p>
      </div>
      <div className='actions'>
        <button disabled={isBlocked || isCheckingProduct} onClick={() => checkProduct(INCREMENT)}>+</button>
        <button disabled={isBlocked || isCheckingProduct} onClick={() => checkProduct(DECREMENT)}>-</button>
        {renderText}
      </div>
    </div>
  );
};

export {
  CartManagement
};
