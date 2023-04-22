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
            <div className={styles.postInformationText}>
              <p className={styles.postTitleText}>
                <strong>{post.title.length < 50 ? post.title : post.title.slice(0, 50)}</strong>
              </p>
              <p className={styles.postBodyText}>
                {
                  parse(post.body.length < 50 ? post.body : post.body.slice(0, 50))
                }
              </p>
            </div>
          </div>
        })}
      </section>
  );
};

export default PostsView