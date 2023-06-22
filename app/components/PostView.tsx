import { LikeType, PostViewProps } from "@/types/interfaces";
import { FC } from "react";
import styles from '../page.module.css';
import parse from 'html-react-parser';
import Comments from "./Comments";

const PostView: FC<PostViewProps> = (props): JSX.Element => {

  const { post, returnToPosts, postReactionChange } = props;

  const handlePostReaction = () => {
    if (typeof window !== "undefined") {
      const user = window.localStorage.getItem("user");
      if (user) {
        if (post.whoLiked.includes(user)) {
          handlePostToUnlike();
          return;
        } else {
          handlePostLike();
          return;
        };
      } else {
        alert("You are unable to interact with posts while incognito browsing");
      };
    };
  };

  const handlePostLike = async () => {
    if (typeof window !== "undefined") {
      if (window.localStorage.getItem("user")) {
        const user = window.localStorage.getItem("user");
        const apiURL = `https://avd-blog-api.fly.dev/api/post/${post._id}/like/${user}`;
        try {
          const uploadLike = await fetch(apiURL, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
            },
          });
          const response = await uploadLike.json();
          alert(response.message);
          if (response.status === true) {
            // like successful
            postReactionChange(LikeType.LIKE, post._id);
          };
        } catch(error) {
          alert("We were unable to like that post for you, please try again later");
        };
      } else {
        alert("You are browsing in incognito mode, please deactivate to engage with this future");
      };
    };
  };

  const handlePostToUnlike = async () => {
    if (typeof window !== "undefined") {
      if (window.localStorage.getItem("user")) {
        const user = window.localStorage.getItem("user");
        const apiURL = `https://avd-blog-api.fly.dev/api/post/${post._id}/unlike/${user}`;
        try {
          const uploadLike = await fetch(apiURL, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
            },
          });
          const response = await uploadLike.json();
          alert(response.message);
          if (response.status === true) {
            // unlike successful
            postReactionChange(LikeType.UNLIKE, post._id);
          };
        } catch(error) {
          alert("We were unable to like that post for you, please try again later");
        };
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
          onClick={() => handlePostReaction()}
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