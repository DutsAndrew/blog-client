import { PostViewProps } from "@/types/interfaces";
import { FC } from "react";
import styles from '../page.module.css';
import parse from 'html-react-parser';
import Comments from "./Comments";

const PostView: FC<PostViewProps> = (props): JSX.Element => {

  const { post, returnToPosts } = props;

  const handlePostLike = () => {
    if (typeof window !== "undefined") {
      if (window.sessionStorage.getItem("token")) {
        const apiURL = `https://avd-blog-api.fly.dev/api/post/${post._id}/like`;
        
      } else {
        alert("You are browsing in incognito mode, please deactivate to engage with this future");
      };
    };
  };

  return (
    <section className={styles.postViewContainer}>
      <button
        className={styles.returnBtn}
        onClick={() => returnToPosts()}
      >
        Return to Feed
      </button>
      <div className={styles.postInformationText}>
        <p className={styles.commentData}>
          <strong>
            Written By: &nbsp;
          </strong>
          {typeof post.author === 'object' ? `${post.author.firstName} ${post.author.lastName}` : post.author}
          <br>
          </br>
          <strong>
            On: &nbsp;
          </strong>
          {post.timestamp.split('T')[0]} @ {post.timestamp.split('T')[1].split('.')[0]}
        </p>
        <p 
          className={styles.viewingPostTitleText}
        >
          <strong>{post.title}</strong>
        </p>
        <div 
          className={styles.postBodyText}
        >
          {parse(post.body)}
        </div>
      </div>
      <div className={styles.reactionContainer}>
        <img 
          src="/heart.svg"
          className={styles.likesHeartImg}
          onClick={() => handlePostLike()}
          >
        </img>
        <p 
          className={styles.likesText}
        >
          {post.likes} Likes
        </p>
      </div>
      <Comments 
        postId={post._id}
      />
    </section>
  );
};

export default PostView;