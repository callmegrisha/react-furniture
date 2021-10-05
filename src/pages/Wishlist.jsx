import { PageTitle } from '../components/PageTitle';
import { WishlistItem } from '../components/WishlistItem';

function Wishlist({ favorites, removeFromFavorite = Function.prototype }) {
  return (
    <div>
      <PageTitle title="WishList" />
      <div className="container">
        <h2 className="sectionTitle">Your Saved Favorite Items</h2>
        <div className="wishlistInner">
          {favorites.length === 0 ? (
            <div className="emptyWishlist">
              <img src="img/icons/wishlist.svg" alt="Empty WishList" />
              <h2>Wishlist is Empty</h2>
              <span>Fill it up with goods</span>
            </div>
          ) : (
            favorites.map((favItem) => (
              <WishlistItem
                key={favItem.id}
                favItem={favItem}
                removeFromFavorite={removeFromFavorite}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export { Wishlist };
