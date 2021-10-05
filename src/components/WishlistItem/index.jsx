import styles from './WishlistItem.module.scss';

function WishlistItem({ favItem, removeFromFavorite = Function.prototype }) {
  return (
    <article className={styles.favoriteItem} key={favItem.id}>
      <div className={styles.favoriteItemImg}>
        <img src={favItem.imgUrl} alt={favItem.name} />
        <button
          className={styles.favoriteItemDeleteBtn}
          onClick={() => removeFromFavorite(favItem.id)}
        >
          <img src="/img/icons/close.svg" alt="Delete Favorite" />
        </button>
      </div>
      <h3>{favItem.name}</h3>
    </article>
  );
}

export { WishlistItem };
