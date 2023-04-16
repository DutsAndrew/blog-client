'use client';

import { FC, useEffect, useState } from 'react';
import styles from '../page.module.css';
import { PostProps, apiResponsePostState, Post } from "@/types/interfaces";

const Posts: FC<PostProps> = (props) => {

  const { currentSort } = props;

  const [apiResponse, setApiResponse] = useState<apiResponsePostState>({
    message: '',
  });

  useEffect(() => {
    (async function retrievePosts() {
      const url = `http://localhost:8080/api/posts/${currentSort}`;
      const fetchPosts = await fetch(url, {
        headers: {
          'Accept': 'application/json',
        },
        method: 'GET',
      });
      const response = await fetchPosts.json();
      if (response.status === 400) {
        setApiResponse({
          message: "No posts found",
        });
      };
      if (response.posts) {
        // there were posts retrieved
        setApiResponse({
          message: response.message,
          posts: response.posts,
        });
      } else {
        setApiResponse({
          message: response.message,
        });
      };
    })();
  }, []);

  const handlePostViewSelection = (post: Post) => {

  };

  if (!apiResponse.posts) {
   // no posts found
   return (
    <section className={styles.postsContainer}>
      <p>
        {apiResponse.message}
      </p>
    </section>
   ); 
  } else {
    // posts found and saved in state
    return (
      <section className={styles.postsContainer}>
        {apiResponse.posts.map((post) => {
          return <div 
            key={post._id} 
            className={styles.postContainer}
            onClick={() => {
              handlePostViewSelection(post);
            }}
          >
            <div className={styles.postInformationText}>
              <p className={styles.postTitleText}>
                <strong>Title: </strong>{post.title.length < 50 ? post.title : post.title.slice(0, 50)}
              </p>
              <p className={styles.postBodyText}>
                <em>Body: </em>{post.body.length < 50 ? post.body : post.body.slice(0, 50)}
              </p>
            </div>
            <div className={styles.postDateAndTime}>
              <p className={styles.postDateText}>
                <em>Date: </em>{post.timestamp.split('T')[0]}
              </p>
              <p className={styles.postTimeText}>
                <em>Time: </em>{post.timestamp.split('T')[1].split('.')[0]}
              </p>
            </div>
          </div>
        })}
      </section>
     );
  };
};

export default Posts;