'use client';

import styles from './page.module.css'
import Header from './components/Header'
import Feed from './components/Feed'
import Sidebar from './components/Sidebar';
import AccountView from './components/AccountView';
import { useEffect, useState } from 'react';
import uniqid from 'uniqid';

const Home = () => {

  useEffect(() => {
    setLocalUser();
  }, []);

  const [view, setView] = useState({
    current: 'home',
  });

  const [user, setUser] = useState({
    user: '',
  });

  const setLocalUser = () => {
    if (sessionStorage.getItem("user")) {
      return;
    } else {
      sessionStorage.setItem("user", uniqid())
    };
  };

  const requestAccountView = () => {
    setView({
      current: 'account',
    });
  };

  const returnToHomePage = () => {
    setView({
      current: 'home',
    });
  };

  if (view.current === 'home') {
    return (
      <main className={styles.main}>
        <Header requestAccountView={requestAccountView} />
        <div className={styles.contentContainer}>
          <Sidebar />
          <Feed />
        </div>
      </main>
    );
  } else if (view.current === 'account') {
    return (
      <main className={styles.main}>
        <Header requestAccountView={requestAccountView} />
        <AccountView returnToHomePage={returnToHomePage} />
      </main>
    );
  } else {
    return (
      <main className={styles.main}>
        <p>
          Error mounting page components, please try again later, or contact the devs
        </p>
      </main>
    );
  };
};

export default Home;