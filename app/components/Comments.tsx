import { FC, useEffect, useState } from 'react';
import styles from '../page.module.css';
import { CommentsProps, CommentsState, Comment } from '@/types/interfaces';
import AddComment from './AddComment';

const Comments: FC<CommentsProps> = (props): JSX.Element => {

  const { postId } = props;

  const [apiResponse, setApiResponse] = useState<CommentsState>({
    message: '',
    // optional state of comments
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
                  src='/heart.svg'
                  className={styles.commentLikesImg}
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