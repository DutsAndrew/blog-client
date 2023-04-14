import styles from '../page.module.css';
import AccountDropDown from './AccountDropDown';
import Icon from '@mdi/react';
import { mdiPyramid } from '@mdi/js';
// pyramid.svg as backup in public folder

const Header = () => {
  return (
    <nav className={styles.navContainer}>
      <div className={styles.headerLeftContainer}>
        <Icon path={mdiPyramid}
            title="Blog Logo"
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
          src='/shield-account.svg'>
        </img>
      </div>
    </nav>
  );
};

export default Header;