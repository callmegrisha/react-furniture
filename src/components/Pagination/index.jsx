import React from 'react';

import styles from './Pagination.module.scss';

export default function Pagination(props) {
  const { pages, pagesArray, changePage } = props;
  return (
    <div className={styles.pagination}>
      {pagesArray.map((page) => (
        <button
          key={page}
          className={
            pages === page
              ? `${styles.paginationItemCurrent} ${styles.paginationItem}`
              : styles.paginationItem
          }
          onClick={() => changePage(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
}

export { Pagination };
