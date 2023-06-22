'use client';

import { FC, use, useEffect, useState } from 'react';
import styles from '../page.module.css';
import { PostProps, apiResponsePostState, Post, LikeType } from "@/types/interfaces";
import { ViewStateProps } from '@/types/interfaces';
import PostView from './PostView';
import PostsView from './PostsView';

const Posts: FC<PostProps> = (props) => {

  const { currentSort } = props;

  const [apiResponse, setApiResponse] = useState<apiResponsePostState>({
    message: '',
    // posts {optional}
  });

  const [viewState, setViewState] = useState<ViewStateProps>({
    current: 'posts',
  });

  useEffect(() => {
    (async function retrievePosts() {
      const url = `https://avd-blog-api.fly.dev/api/posts/${currentSort}`;
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
  }, [currentSort]);

  useEffect(() => {
    // handles updates to the Posts[]
  }, [apiResponse]);

  const handlePostViewSelection = (post: Post) => {
    setViewState({
      current: 'post',
      post: post,
    });
  };

  const handleReturnToPosts = () => {
    setViewState({
      current: 'posts',
    });
  };

  const handlePostReactionChange = (reactionType: LikeType, postID: string): void => {
    if (typeof window !== "undefined") {
      const user = window.localStorage.getItem("user");
      if (user) {
        if (apiResponse.posts) {
          const identifiedPost = apiResponse.posts.find((post: Post) => {
            return post._id === postID;
          });
          if (typeof identifiedPost !== "undefined") {
            const posts: Post[] = apiResponse.posts || [];
            if (reactionType === LikeType.LIKE) {
              identifiedPost.whoLiked.push(user);
              identifiedPost.likes++;
              setApiResponse({
                message: apiResponse.message,
                posts: [...posts, identifiedPost]
              });
              return;
            } else if (reactionType === LikeType.UNLIKE) {
              identifiedPost.whoLiked.splice(identifiedPost.whoLiked.indexOf(user), 1);
              identifiedPost.likes--;
              setApiResponse({
                message: apiResponse.message,
                posts: [...posts, identifiedPost]
              });
              return;
            } else {
              return;
            };
          };
        };
      } else {
        return;
      };
    };
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
  } else if (viewState.current === 'posts') {
    // posts found and saved in state render view all
    return (
      <PostsView
        changeView={handlePostViewSelection}
        posts={apiResponse.posts}
      />
     );
  } else if (viewState.current === 'post' && viewState.post) {
    // currently viewing a post
    return (
      <PostView 
        post={viewState.post}
        returnToPosts={handleReturnToPosts}
        postReactionChange={handlePostReactionChange}
      />  
    );
  } else {
    return (
      <p>
        Oops, something went terribly wrong :/
      </p>
    );
  };
};

export default Posts;