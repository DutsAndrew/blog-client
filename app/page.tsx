'use client';

import styles from './page.module.css'
import Header from './components/Header'
import Feed from './components/Feed'
import Sidebar from './components/Sidebar';
import { useEffect, useState } from 'react';
import uniqid from 'uniqid';

const Home = () => {

  useEffect(() => {
    setLocalUser();
  }, []);

  const setLocalUser = () => {
    if (sessionStorage.getItem("user")) {
      return;
    } else {
      sessionStorage.setItem("user", uniqid())
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