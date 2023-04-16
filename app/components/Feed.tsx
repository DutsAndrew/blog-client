'use client';

import FeedSort from "./FeedSort";
import Posts from "./Posts";
import styles from '../page.module.css';
import { useState } from "react";

const Feed = () => {

  const [currentSort, setCurrentSort] = useState({
    current: 'new',
  });

  const setSort = (sort: string): void => {
    setCurrentSort({
      current: sort,
    });
  };

  return (
    <section className={styles.feedContainer}>
      <FeedSort setSort={setSort} />
      <Posts currentSort={currentSort.current} />
    </section>
  );
};

export default Feed;