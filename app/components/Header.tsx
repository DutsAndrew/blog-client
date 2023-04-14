import styles from '../page.module.css';
import AccountDropDown from './AccountDropDown';

const Header = () => {
  return (
    <nav className={styles.navContainer}>
      <div className={styles.headerLeftContainer}>
        <img className={styles.logoImg}></img>
        <div className={styles.searchContainer}>
          <input 
            className={styles.searchBar}
            type='text'
            placeholder='Search...'
          >
          </input>
          <img className={styles.searchIcon}></img>
        </div>
      </div>

      <div className={styles.headerRightContainer}>
        <button className={styles.createPostButton}>
          Create Post
        </button>
        <img className={styles.accountImg}></img>
      </div>
    </nav>
  );
};

export default Header;