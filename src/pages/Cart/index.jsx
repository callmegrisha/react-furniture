import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { PageTitle } from '../../components/PageTitle';
import { CartItem } from '../../components/CartItem';

import styles from './Cart.module.scss';

function Cart(props) {
  const {
    order,
    removeFromCart = Function.prototype,
    incQuantity = Function.prototype,
    decQuantity = Function.prototype,
    setOrder,
  } = props;

  const [isOrderComplete, setIsOrderComplete] = React.useState(false);

  const onClickToAddOrder = () => {
    try {
      axios.post('http://localhost:3000/orders', {
        items: order,
      });

      setOrder([]);
      setIsOrderComplete(true);
    } catch (error) {
      alert('Failed To Create An Order');
      console.error(error);
    }
  };

  return (
    <section className={styles.cart}>
      <PageTitle title="Cart" />
      <div className="container">
        <div className={styles.cartInner}>
          {order.length === 0 ? (
            <>
              <div className={styles.cartEmpty}>
                <img
                  src={
                    isOrderComplete
                      ? '/img/icons/completed-order.svg'
                      : '/img/icons/empty-cart.svg'
                  }
                  alt="Empty Box"
                />
                {isOrderComplete ? (
                  <h1>Your Order Is Completed! </h1>
                ) : (
                  <h1>Сart Is Empty</h1>
                )}
                {isOrderComplete ? (
                  <span>
                    Thank you for your order! Your order is being processed and
                    will be completed within 3-6 hours. You will receive an
                    email confirmation when your order is completed.
                  </span>
                ) : (
                  <span>But it's never too late to fix it :) </span>
                )}
                <Link className={styles.cartEmptyBtn} to="/">
                  Continue Shopping
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className={styles.cartItems}>
                <div className={styles.cartItemsTitle}>
                  <h3 className={styles.product}>Product</h3>
                  <h3 className={styles.price}>Price</h3>
                  <h3 className={styles.quantity}>Quantity</h3>
                  <h3 className={styles.total}>Total</h3>
                </div>
                {order.map((orderItem) => (
                  <CartItem
                    key={orderItem.id}
                    order={orderItem}
                    removeFromCart={removeFromCart}
                    incQuantity={incQuantity}
                    decQuantity={decQuantity}
                  />
                ))}
              </div>
            </>
          )}
          <div className={styles.cartTotal}>
            <h3>Cart totals</h3>
            <div className={styles.cartTotalPrice}>
              <span>Totals:</span>
              <span>
                $
                {order
                  .reduce(
                    (sum, obj) =>
                      Number(sum) + Number(obj.itemDiscount * obj.quantity),
                    0
                  )
                  .toFixed(2)}
              </span>
            </div>
            <button
              className={styles.cartTotalSendOrder}
              type="button"
              onClick={onClickToAddOrder}
            >
              Send Order
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export { Cart };
