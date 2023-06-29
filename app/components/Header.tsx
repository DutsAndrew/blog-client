'use client';

import styles from '../page.module.css';
import Icon from '@mdi/react';
import { mdiPyramid } from '@mdi/js';
import { KeyboardEvent, FC } from 'react';
import { HeaderProps } from '@/types/interfaces';

const Header: FC<HeaderProps> = (props): JSX.Element => {

  const { handleUserQueryResults } = props;

  const openCMS = () => {
    window.open("https://dutsandrew-blog-cms.vercel.app/", "_blank");
  };

  const handleEnteredSearchBarQuery = (event: any): void => {
    const keydownButton: KeyboardEvent<HTMLInputElement> = event;
    const value = event.target.value;
    if (keydownButton.code === "Enter" || keydownButton.key === "Enter" || keydownButton.keyCode === 13 || keydownButton.which === 13) {
      sendSearchBarQuery(value);
    };
  };

  const handleClickedSearchBarQuery = (event: any) => {
    const queryValue = event.target.parentElement.children[0].value;
    sendSearchBarQuery(queryValue);
  };

  const sendSearchBarQuery = async (query: string) => {
    if (query.length > 2 && query.length < 50) {
      const apiURL = `https://avd-blog-api.fly.dev/api/post/find/${query}`;
      const fetchQuery = await fetch(apiURL, {
        method: "GET",
        headers: {
          'Accept': 'application/json',
        },
      });
      const results = await fetchQuery.json();
      if (results.posts) {
        clearSearchBar();
        handleUserQueryResults(results);
      } else if (results.error) {
        alert(`${results.message}, ${results.error}`);
      } else {
        // no posts found
        alert(`${results.message}`);
      }
    } else {
      alert("Your query does not fall in our recommended search input of more than 2 characters and less than 50");
    };
  };

  const clearSearchBar = () => {
    const searchBarInput = document.querySelector("#search-bar-input");
    if (searchBarInput) {
      (searchBarInput as HTMLInputElement).value = "";
    };
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
            id='search-bar-input'
            type='text'
            placeholder='Search...'
            onKeyDown={(e) => handleEnteredSearchBarQuery(e)}
          >
          </input>
          <img 
            className={styles.searchIcon}
            src={'/magnify.svg'}
            onClick={(e) => handleClickedSearchBarQuery(e)}>
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