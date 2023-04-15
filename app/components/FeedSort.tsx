import styles from '../page.module.css';

const FeedSort = () => {
  return (
    <nav className={styles.sortOptions}>
      <p className={styles.sortOption}>
        New
      </p>
      <p className={styles.sortOption}>
        Top
      </p>
      <p className={styles.sortOption}>
        Hot
      </p>
    </nav>
  );
};

export default FeedSort;