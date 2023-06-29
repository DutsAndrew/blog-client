'use client';

import { FC, use, useEffect, useState } from 'react';
import styles from '../page.module.css';
import { PostsProps, apiResponsePostState, Post, LikeType, queryResult } from "@/types/interfaces";
import { ViewStateProps } from '@/types/interfaces';
import PostView from './PostView';
import PostsView from './PostsView';

const Posts: FC<PostsProps> = (props) => {

  const { currentSort, userQuery } = props;

  const [apiResponse, setApiResponse] = useState<apiResponsePostState>({
    message: '',
    // posts {optional}
  });

  const [viewState, setViewState] = useState<ViewStateProps>({
    current: 'posts',
  });

  useEffect(() => {
    retrievePosts();
  }, [currentSort]);

  useEffect(() => {
    // this prevents loading query view on initial load and every rerender
    if (userQuery.renderNeeded === true) {
      setViewState({
        current: "query",
      });
    };
  }, [userQuery]);

  async function retrievePosts() {
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
  }

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

  const incrementLocalPostViewAmount = (postID: string): void => {
    const currentPosts = apiResponse.posts;
    if (currentPosts) {
      currentPosts.forEach((post) => {
        if (post._id === postID) {
          post.views++;
        };
      });
      setApiResponse({
        message: apiResponse.message,
        posts: currentPosts,
      });
    };
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

  const handleStopQueryView = () => {
    setViewState({
      current: 'posts',
    });
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
  } else if (viewState.current === "query") {
    return (
      <PostsView
        changeView={handlePostViewSelection}
        posts={userQuery.posts ? userQuery.posts : []}
        query={true}
        stopQuery={handleStopQueryView}
      />
     );
  } else if (viewState.current === 'posts') {
    // posts found and saved in state render view all
    return (
      <PostsView
        changeView={handlePostViewSelection}
        posts={apiResponse.posts}
        query={false}
        stopQuery={handleStopQueryView}
      />
     );
  } else if (viewState.current === 'post' && viewState.post) {
    // currently viewing a post
    return (
      <PostView 
        post={viewState.post}
        returnToPosts={handleReturnToPosts}
        postReactionChange={handlePostReactionChange}
        incrementLocalPostViewAmount={incrementLocalPostViewAmount}
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