'use client';

import { FC } from 'react';
import styles from '../page.module.css';
import { FeedSortProps } from '@/types/interfaces';

const FeedSort: FC<FeedSortProps> = (props) => {

  const { setSort } = props;

  const handleChangeSort = (sortRequest: string) => {
    setSort(sortRequest);
  };

  return (
    <nav className={styles.sortOptions}>
      <p 
        className={styles.sortOption}
        onClick={() => handleChangeSort("new")}
      >
        New
      </p>
      <p 
        className={styles.sortOption}
        onClick={() => handleChangeSort("top")}
      >
        Top
      </p>
      <p 
        className={styles.sortOption}
        onClick={() => handleChangeSort("hot")}
      >
        Hot
      </p>
    </nav>
  );
};

export default FeedSort;