import { PostViewProps } from "@/types/interfaces";
import { FC } from "react";
import styles from '../page.module.css';
import parse from 'html-react-parser';
import Comments from "./Comments";

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
        <p 
          className={styles.postTitleText}
        >
          <strong>{post.title.length < 50 ? post.title : post.title.slice(0, 50)}</strong>
        </p>
        <p 
          className={styles.postBodyText}
        >
          {parse(post.body.length < 50 ? post.body : post.body.slice(0, 50))}
        </p>
      </div>
      <div className={styles.reactionContainer}>
        <img 
          src="/heart.svg"
          className={styles.likesHeartImg}
          >
        </img>
        <p 
          className={styles.likesText}
        >
          {post.likes}
        </p>
      </div>
      <Comments 
        postId={post._id}
      />
    </section>
  );
};

export default PostView;