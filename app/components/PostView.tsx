import { PostViewProps } from "@/types/interfaces";
import { FC } from "react";
import styles from '../page.module.css';
import parse from 'html-react-parser';


const PostView: FC<PostViewProps> = (props): JSX.Element => {

  const { post, returnToPosts } = props;

  return (
    <section className={styles.postViewContainer}>
          <button
            className={styles.returnBtn}
            onClick={() => returnToPosts()}
          >
            Return to Feed
          </button>
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
        </section>
  );
};

export default PostView;