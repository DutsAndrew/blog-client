'use client';

import styles from './page.module.css'
import Header from './components/Header'
import Feed from './components/Feed'
import Sidebar from './components/Sidebar';
import JumpButton from './components/JumpButton';
import { useEffect, useState } from 'react';
import uniqid from 'uniqid';
import { queryResult } from '@/types/interfaces';

const Home = () => {

  const [userQuery, setUserQuery] = useState<queryResult>({
    message: "",
    posts: [],
    renderNeeded: false,
  });

  const [scrollStatus, setScrollStatus] = useState({
    scrolledDown: false,
  });

  useEffect(() => {
    setLocalUser();
  }, []);

  useEffect(() => {
    // 
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScrollStatus);
      return () => window.removeEventListener("scroll", handleScrollStatus);
    } else {
      return;
    };
  }, []);

  const handleScrollStatus = () => {
    if (typeof window !== "undefined") {
      const topPage = window.scrollY;

      if (topPage > 50) {
        setScrollStatus({
          scrolledDown: true,
        });
      } else {
        setScrollStatus({
          scrolledDown: false,
        });
      };
    };
  };

  const isIncognito = () => {
    const storage = window.navigator.storage;
    const storageEstimate = storage.estimate();
    return storage && (storageEstimate as unknown as number) === 0;
  };

  const setLocalUser = () => {
    if (typeof window !== "undefined") {
      if (isIncognito()) {
        alert("You are browsing in incognito mode and will be unable to like posts or create comments. If you would like to participate in these futures please deactivate incognito mode");
      } else {
        if (window.localStorage.getItem("user")) {
          return;
        } else {
          window.localStorage.setItem("user", uniqid())
        };
      };
    };
  };

  const handleUserQueryResults = (queryResults: queryResult) => {
    setUserQuery({
      posts: queryResults.posts,
      message: queryResults.message,
      renderNeeded: true,
    });
  };

  const handleJumpButtonClick = () => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, document.body.scrollHeight - document.body.scrollHeight);
      setScrollStatus({
        scrolledDown: false,
      });
    };
  };

  if (scrollStatus.scrolledDown === false) {
    // user has not scrolled down on the page
    return (
      <main className={styles.main}>
        <Header handleUserQueryResults={handleUserQueryResults} />
        <div className={styles.contentContainer}>
          <Sidebar />
          <Feed userQuery={userQuery} />
        </div>
      </main>
    ); 
  } else {
    // user has scrolled down
    return (
      <main className={styles.main}>
        <Header handleUserQueryResults={handleUserQueryResults} />
        <div className={styles.contentContainer}>
          <Sidebar />
          <Feed userQuery={userQuery} />
          <JumpButton handleJumpButtonClick={handleJumpButtonClick} />
        </div>
      </main>
    );
  };
};

export default Home;