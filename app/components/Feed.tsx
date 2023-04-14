import FeedSort from "./FeedSort";
import Posts from "./Posts";
import styles from '../page.module.css';

const Feed = () => {
  return (
    <section className={styles.feedContainer}>
      <FeedSort />
      <Posts />
    </section>
  );
};

export default Feed;