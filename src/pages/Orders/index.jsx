import { PageTitle } from '../../components/PageTitle';

import styles from './Orders.module.scss';

function Orders(props) {
  const { checkedOrders } = props;
  console.log(checkedOrders);
  return (
    <div>
      <PageTitle title="Orders" />
      <div className="container">
        <div className={styles.ordersInner}>
          {checkedOrders.length === 0 ? (
            <h1>No orders</h1>
          ) : (
            checkedOrders.map((item) => (
              <div>
                <h2 className={styles.orderTitle}>Order #{item.id}</h2>
                <div className={styles.ordersList}>
                  {item.items.map((itemObj) => (
                    <article className={styles.ordersCard}>
                      <div className={styles.ordersCardImg}>
                        <img src={itemObj.imgUrl} alt={itemObj.name} />
                      </div>
                      <div className={styles.ordersCardInfo}>
                        <h3 className={styles.ordersCardTitle}>
                          {itemObj.name}
                        </h3>
                        <span className={styles.ordersCardPrice}>
                          ${itemObj.itemDiscount}
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export { Orders };
