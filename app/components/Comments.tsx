'use client';

import { FC, useEffect, useState } from 'react';
import styles from '../page.module.css';
import { CommentsProps, CommentsState, Comment } from '@/types/interfaces';
import AddComment from './AddComment';

const Comments: FC<CommentsProps> = (props): JSX.Element => {

  const { postId } = props;

  const [apiResponse, setApiResponse] = useState<CommentsState>({
    message: '',
    // comments {optional}
  });

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const url = `https://avd-blog-api.fly.dev/api/post/${postId}/comments`;
    const comments = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    const response = await comments.json();
    if (response.comments) {
      // comments found
      setApiResponse({
        message: response.message,
        comments: response.comments,
      });
    } else {
      // comments not retrieved
      setApiResponse({
        message: response.message,
      });
    };
  };

  const refreshCommentList = (newComment: Comment): void => {
    setApiResponse({
      message: apiResponse.message,
      comments: [...(apiResponse.comments as Comment[]), newComment],
    });
  };

  const handleCommentReaction = (comment: Comment): void => {
    if (typeof window !== "undefined") {
      const user = window.localStorage.getItem("user");
      if (user) {
        if (comment.whoLiked.includes((user as string))) {
          handleCommentUnlike(comment, user);
        } else {
          handleCommentLike(comment, user);
        };
      } else {
        return;
      };
    } else {
      return;
    };
  };

  const handleCommentLike = async (comment: Comment, user: string): Promise<void> => {
    const apiURL = `https://avd-blog-api.fly.dev/api/comment/${comment._id}/like/${user}`;
    const addLike = await fetch(apiURL, {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
      },
    });
    const response = await addLike.json();
    const updatedComment = response.comment;
    if (updatedComment) {
      updateCommentList(comment, updatedComment);
      alert("Comment liked");
      return;
    } else {
      alert(`${response.message}`);
    };
  };

  const handleCommentUnlike = async (comment: Comment, user: string): Promise<void> => {
    const apiURL = `https://avd-blog-api.fly.dev/api/comment/${comment._id}/unlike/${user}`;
    const addLike = await fetch(apiURL, {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
      },
    });
    const response = await addLike.json();
    const updatedComment = response.comment;
    if (updatedComment) {
      updateCommentList(comment, updatedComment);
      alert("Comment unliked");
      return;
    } else {
      alert(`${response.message}`);
    };
  };

  const updateCommentList = (oldComment: Comment, newComment: Comment): void => {
    const currentComments = apiResponse.comments;
    if (currentComments) {
      currentComments.splice(currentComments.indexOf(oldComment), 1, newComment);
      setApiResponse({
        message: apiResponse.message,
        comments: currentComments,
      });
    } else {
      return;
    };
  };

  if (apiResponse.comments) {
    return (
      <div className={styles.commentsContainer}>
        <AddComment 
          postId={postId}
          refreshCommentList={refreshCommentList}
        />
        <h1 className={styles.commentsHeaderText}>
          Comments
        </h1>
        <div className={styles.commentListContainer}>
          {apiResponse.comments.map((comment) => {
            return <div
              className={styles.commentContainer}
              key={comment._id}
            >
              <p className={styles.commentData}>
                <strong>
                  {comment.author} &nbsp;
                  {comment.timestamp.split('T')[0]} @ {comment.timestamp.split('T')[1].split('.')[0]}
                </strong>
              </p>
              <div className={styles.commentTextContainer}>
                <p 
                  className={styles.commentText}
                >
                  {comment.comment}
                </p>
              </div>
              <div className={styles.commentLikesContainer}>
                <img 
                  src={'/heart.svg'}
                  className={styles.commentLikesImg}
                  onClick={() => handleCommentReaction(comment)}
                  >
                </img>
                <p 
                  className={styles.commentLikesText}
                >
                  {comment.likes} Likes
                </p>
              </div>
            </div>
          })}
        </div>
      </div>
    );
  } else {
    // no comments
    return (
      <div className={styles.commentsContainer}>
        <AddComment 
          postId={postId}
          refreshCommentList={refreshCommentList}
        />
      </div>
    );
  };
};

export default Comments;