'use client';

import styles from '../page.module.css';
import Icon from '@mdi/react';
import { mdiPyramid } from '@mdi/js';

const Header = () => {

  const openCMS = () => {
    window.open("https://dutsandrew-blog-cms.vercel.app/", "_blank");
  };

  return (
    <nav className={styles.navContainer}>
      <div className={styles.headerLeftContainer}>
        <Icon path={mdiPyramid}
            title="Logo"
            size={2}
            rotate={40}
            color="#FFA500"
            spin={25}
          />
        <div className={styles.searchContainer}>
          <input 
            className={styles.searchBar}
            type='text'
            placeholder='Search...'
          >
          </input>
          <img 
            className={styles.searchIcon}
            src={'/magnify.svg'}>
          </img>
        </div>
      </div>

      <div className={styles.headerRightContainer}>
        <button 
          className={styles.createPostButton}
          onClick={() => openCMS()}
        >
          Create Post
        </button>
        <img 
          className={styles.accountImg}
          src='/shield-account.svg'
          onClick={() => openCMS()}>
        </img>
      </div>
    </nav>
  );
};

export default Header;