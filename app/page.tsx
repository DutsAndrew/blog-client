'use client';

import styles from './page.module.css'
import Header from './components/Header'
import Feed from './components/Feed'
import Sidebar from './components/Sidebar';
import { useEffect, useState } from 'react';
import uniqid from 'uniqid';
import { queryResult } from '@/types/interfaces';

const Home = () => {

  const [userQuery, setUserQuery] = useState<queryResult>({
    message: "",
    posts: [],
    renderNeeded: false,
  });

  useEffect(() => {
    setLocalUser();
  }, []);

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

  return (
    <main className={styles.main}>
      <Header handleUserQueryResults={handleUserQueryResults} />
      <div className={styles.contentContainer}>
        <Sidebar />
        <Feed userQuery={userQuery} />
      </div>
    </main>
  );
};

export default Home;