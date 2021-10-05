import React from 'react';
import axios from 'axios';
import { Route } from 'react-router';

import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Wishlist } from './pages/Wishlist';
import { Cart } from './pages/Cart';
import { Orders } from './pages/Orders';
import { Footer } from './components/Footer';

function App() {
  const [items, setItems] = React.useState([]);
  const [order, setOrder] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [checkedOrders, setcheckedOrders] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const [totalPages, setTotalPages] = React.useState(0);
  const [pages, setPages] = React.useState(1);
  const [limit, setLimit] = React.useState(6);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [itemsResponse, cartResponse, wishlistResponse, ordersResponse] =
          await Promise.all([
            axios.get(
              `http://localhost:3000/items?_page=${pages}&_limit=${limit}`
            ),
            axios.get('http://localhost:3000/cart'),
            axios.get('http://localhost:3000/wishlist'),
            axios.get('http://localhost:3000/orders'),
          ]);

        setIsLoading(false);
        setItems(itemsResponse.data);
        setOrder(cartResponse.data);
        setFavorites(wishlistResponse.data);
        setcheckedOrders(ordersResponse.data);
        const totalCount = itemsResponse.headers['x-total-count'];
        setTotalPages(getPagesCount(totalCount, limit));
      } catch (error) {
        alert('Error while requesting data');
        console.log(error);
      }
    }

    fetchData();
  }, [pages]);

  const searchItem = (event) => {
    setSearchValue(event.target.value);
  };

  const addToCart = (obj) => {
    setOrder([...order, obj]);

    // если в корзине карточки товара не будет, то вернет -1
    // если будет, то вернет 0
    const cartItemIndex = order.findIndex(
      (orderItem) => orderItem.id === obj.id
    );

    // если в корзине карточки товара нет
    if (cartItemIndex < 0) {
      // создается новый объект, в который записываются уже существующие карточки (Если такие есть)
      // и создается количество, равное 1
      const newCartItem = {
        ...obj,
        quantity: 1,
      };
      // и записывается в заказ, обновляя стейт корзины
      axios.post('http://localhost:3000/cart', newCartItem);
      setOrder([...order, newCartItem]);
      // но если в корзине товар есть
    } else {
      // мы создаем переменную, в которую запишем обновленный заказ
      const newOrder = order.map((orderItem, index) => {
        // если индекс нажатой карточки и индекс товара в корзине совпадают
        if (index === cartItemIndex) {
          // то при клике всегда будет один товар в корзине, чтобы не увеличивалось
          return {
            ...orderItem,
            quantity: 1,
          };
        } else {
          // иначе просто вернем исходный объект
          return orderItem;
        }
      });

      // и этот обновленный объект запишем в стейт, чтобы данные обновились в компоненте
      setOrder(newOrder);
    }
  };

  const removeFromCart = (objId) => {
    try {
      axios.delete(`http://localhost:3000/cart/${objId}`);
      const newOrder = order.filter((orderItem) => orderItem.id !== objId);
      setOrder(newOrder);
    } catch (error) {
      alert('Error when removing from cart');
      console.error(error);
    }
  };

  const incQuantity = (objId) => {
    const newOrder = order.map((orderItem) => {
      if (orderItem.id === objId) {
        const newQuantity = orderItem.quantity + 1;
        axios.put(`http://localhost:3000/cart/${objId}`, {
          ...orderItem,
          quantity: newQuantity,
        });
        return {
          ...orderItem,
          quantity: newQuantity,
        };
      } else {
        return orderItem;
      }
    });
    // axios.post('http://localhost:3000/cart', newOrder);
    setOrder(newOrder);
  };

  const decQuantity = (objId) => {
    const newOrder = order.map((orderItem) => {
      if (orderItem.id === objId) {
        const newQuantity = orderItem.quantity - 1;

        axios.put(`http://localhost:3000/cart/${objId}`, {
          ...orderItem,
          quantity: newQuantity,
        });

        return {
          ...orderItem,
          quantity: newQuantity >= 1 ? newQuantity : 0,
        };
      } else {
        return orderItem;
      }
    });

    setOrder(newOrder);
  };

  const addToFavorite = async (obj) => {
    try {
      if (!favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        const { data } = await axios.post(
          'http://localhost:3000/wishlist',
          obj
        );
        setFavorites((prev) => [...prev, data]);
      } else {
        setFavorites(favorites);
      }
    } catch (error) {
      alert('Failed to add to wishlist');
      console.error(error);
    }
  };

  const removeFromFavorite = (objId) => {
    try {
      axios.delete(`http://localhost:3000/wishlist/${objId}`);
      const newWishlist = favorites.filter((favItem) => favItem.id !== objId);
      setFavorites(newWishlist);
    } catch (error) {
      alert('Error when removing from wishlist');
      console.error(error);
    }
  };

  const getPagesCount = (totalPages, limit) => {
    return Math.ceil(totalPages / limit);
  };

  const getPagesArray = (totalPages) => {
    let result = [];

    for (let i = 0; i < totalPages; i++) {
      result.push(i + 1);
    }

    return result;
  };

  let pagesArray = getPagesArray(totalPages);

  const changePage = (page) => {
    setPages(page);
  };

  return (
    <div className="App">
      <Header searchItems={searchItem} />
      <main className="main">
        <Route path="/" exact>
          <Home
            items={items}
            searchItems={searchValue}
            addToCart={addToCart}
            addToFavorite={addToFavorite}
            isLoading={isLoading}
            pages={pages}
            pagesArray={pagesArray}
            changePage={changePage}
          />
        </Route>
        <Route path="/wishlist" exact>
          <Wishlist
            favorites={favorites}
            removeFromFavorite={removeFromFavorite}
          />
        </Route>
        <Route path="/cart" exact>
          <Cart
            order={order}
            removeFromCart={removeFromCart}
            incQuantity={incQuantity}
            decQuantity={decQuantity}
            setOrder={setOrder}
          />
        </Route>
        <Route path="/orders" exact>
          <Orders checkedOrders={checkedOrders} />
        </Route>
      </main>
      <Footer />
    </div>
  );
}

export default App;
