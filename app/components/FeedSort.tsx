'use client';

import { FC, useEffect } from 'react';
import styles from '../page.module.css';
import { FeedSortProps } from '@/types/interfaces';

const FeedSort: FC<FeedSortProps> = (props) => {

  const { currentSort, setSort } = props;

  useEffect(() => {
    displayCurrentSort(currentSort);
  }, [currentSort]);

  const handleChangeSort = (sortRequest: string): void => {
    setSort(sortRequest);
  };

  const displayCurrentSort = (sortRequest: string): void => {
    const activeSort = document.querySelector('.active-sort');
    if (activeSort) {
      activeSort.classList.remove('active-sort');
    };

    if (sortRequest === 'new') {
      const newText = document.querySelector('#sort-new');
      newText?.classList.add('active-sort');
    } else if (sortRequest === 'hot') {
      const hotText = document.querySelector('#sort-hot');
      hotText?.classList.add('active-sort');
    } else if (sortRequest === 'top') {
      const topText = document.querySelector('#sort-top');
      topText?.classList.add('active-sort');
    };
  };

  return (
    <nav className={styles.sortOptions}>
      <p 
        className={styles.sortOption}
        id='sort-new'
        onClick={() => handleChangeSort("new")}
      >
        New
      </p>
      <p 
        className={styles.sortOption}
        id='sort-top'
        onClick={() => handleChangeSort("top")}
      >
        Top
      </p>
      <p 
        className={styles.sortOption}
        id='sort-hot'
        onClick={() => handleChangeSort("hot")}
      >
        Hot
      </p>
    </nav>
  );
};

export default FeedSort;