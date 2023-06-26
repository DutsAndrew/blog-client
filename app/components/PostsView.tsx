import parse from 'html-react-parser';
import { PostsViewProps } from '@/types/interfaces';
import { FC } from 'react';
import styles from '../page.module.css';

const PostsView: FC<PostsViewProps> = (props): JSX.Element => {

  const { changeView, posts } = props;

  return (
    <section className={styles.postsContainer}>
      {posts.map((post) => {
        return <div 
          key={post._id} 
          className={styles.postContainer}
          onClick={() => {
            changeView(post);
          }}
        >
          <div className={styles.postsInfoContainer}>
            <p className={styles.postsTitleText}>
              <strong>{post.title.length < 50 ? post.title : post.title.slice(0, 50) + '...'}</strong>
            </p>
            <div className={styles.postsBodyText}>
              {parse(post.body.length < 500 ? post.body : post.body.slice(0, 500) + '...')}
            </div>
          </div>
          <div className={styles.postsReactionContainer}>
            <div className={styles.postsLikesContainer}>
              <img className={styles.postsLikesImage} src='/hearts.svg'></img>
              <p className={styles.postsLikesText}>
                {post.likes}
              </p>
            </div>
            <div className={styles.postsViewsContainer}>
              <img className={styles.postsViewsImage} src='/views.svg'></img>
              <p className={styles.postsViewsText}>
                {post.views}
              </p>
            </div>
          </div>
        </div>
      })}
    </section>
  );
};

export default PostsView