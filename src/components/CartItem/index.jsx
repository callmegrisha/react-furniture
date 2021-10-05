import styles from './CartItem.module.scss';

function CartItem(props) {
  const {
    order,
    removeFromCart = Function.prototype,
    incQuantity = Function.prototype,
    decQuantity = Function.prototype,
  } = props;

  return (
    <article className={styles.cartItem}>
      <div className={styles.cartItemProductInfo}>
        <div className={styles.cartItemImg}>
          <img src={order.imgUrl} alt={order.name} />
          <button
            className={styles.cartItemDeleteBtn}
            type="button"
            onClick={() => removeFromCart(order.id)}
          >
            <img src="/img/icons/close.svg" alt="Close Button" />
          </button>
        </div>
        <span className={styles.cartItemTitle}>{order.name}</span>
      </div>
      <span className={styles.cartItemPrice}>${order.itemDiscount}</span>
      <div className={styles.cartItemQuantity}>
        <button onClick={() => decQuantity(order.id)}>-</button>
        <span>{order.quantity ? order.quantity : '0'}</span>
        <button onClick={() => incQuantity(order.id)}>+</button>
      </div>
      <span className={styles.cartItemTotal}>
        ‎${(order.itemDiscount * order.quantity).toFixed(2)}
      </span>
    </article>
  );
}

export { CartItem };
