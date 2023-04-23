import { FC, useEffect, useState } from 'react';
import styles from '../page.module.css';
import { CommentsProps, CommentsState } from '@/types/interfaces';
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
    const url = `http://localhost:8080/api/post/${postId}/comments`;
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

  if (apiResponse.comments) {
    return (
      <div className={styles.commentsContainer}>
        <p
          className={styles.apiResponse}
        >
          {apiResponse.message}
        </p>
        <AddComment 
          postId={postId}
        />
        <div className={styles.commentListContainer}>
          {apiResponse.comments.map((comment) => {
            return <div
              className={styles.commentContainer}
              key={comment._id}
            >
              <div className={styles.commentData}>
                <p 
                  className={styles.commentDate}
                >
                  {comment.author} - {comment.timestamp}
                </p>
              </div>
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
                  {comment.likes}
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
        <p 
          className={styles.apiResponse}
        >
          {apiResponse.message}
        </p>
        <AddComment 
          postId={postId}
        />
      </div>
    );
  };
};

export default Comments;