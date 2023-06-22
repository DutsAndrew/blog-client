'use client';

import styles from './page.module.css'
import Header from './components/Header'
import Feed from './components/Feed'
import Sidebar from './components/Sidebar';
import { useEffect } from 'react';
import uniqid from 'uniqid';

const Home = () => {

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

  return (
    <main className={styles.main}>
      <Header />
      <div className={styles.contentContainer}>
        <Sidebar />
        <Feed />
      </div>
    </main>
  );
};

export default Home;