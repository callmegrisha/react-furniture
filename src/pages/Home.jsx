import { HomeSlider } from '../components/HomeSlider';
import { Item } from '../components/Item';
import { Pagination } from '../components/Pagination';

function Home(props) {
  const {
    items,
    searchItems,
    isLoading,
    addToCart = Function.prototype,
    addToFavorite = Function.prototype,
    pages,
    pagesArray,
    changePage,
  } = props;

  const renderItems = () => {
    // Метод includes() определяет, содержит ли массив определённый элемент, возвращая в зависимости от этого true или false
    const filteredItems = items.filter((item) =>
      // Здесь оно возвращает true на совпадениях и в свою очередь filter фильтрует необходимые объекты
      item.name.toLowerCase().includes(searchItems.toLowerCase())
    );

    return (isLoading ? [...Array(5)] : filteredItems).map((item, index) => (
      <Item
        key={index}
        {...item}
        addToCart={addToCart}
        addToFavorite={addToFavorite}
        isLoading={isLoading}
      />
    ));
  };

  return (
    <div>
      <HomeSlider />
      <div className="catalog">
        <div className="container">
          <h2 className="sectionTitle">
            {searchItems
              ? `Results on request : ${searchItems}`
              : 'Ecommerce Accesories & Fashion item'}
          </h2>
          <div className="catalogInner">{renderItems()}</div>
          <Pagination
            pages={pages}
            pagesArray={pagesArray}
            changePage={changePage}
          />
        </div>
      </div>
    </div>
  );
}

export { Home };
