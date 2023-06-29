'use client';

import FeedSort from "./FeedSort";
import Posts from "./Posts";
import styles from '../page.module.css';
import { FC, useState } from "react";
import { FeedProps } from "@/types/interfaces";

const Feed: FC<FeedProps> = (props): JSX.Element => {

  const { userQuery } = props;

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
      <FeedSort currentSort={currentSort.current} setSort={setSort} />
      <Posts currentSort={currentSort.current} userQuery={userQuery} />
    </section>
  );
};

export default Feed;