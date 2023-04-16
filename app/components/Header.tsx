'use client';

import styles from '../page.module.css';
import Icon from '@mdi/react';
import { mdiPyramid } from '@mdi/js';
import { FC } from 'react';
import { HeaderProps } from '@/types/interfaces';

const Header: FC<HeaderProps> = (props) => {

  const { requestAccountView } = props;

  const handleAccountRequest = () => {
    requestAccountView();
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
        <button className={styles.createPostButton}>
          Create Post
        </button>
        <img 
          className={styles.accountImg}
          src='/shield-account.svg'
          onClick={() => handleAccountRequest()}>
        </img>
      </div>
    </nav>
  );
};

export default Header;