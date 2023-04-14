import styles from './page.module.css'
import Header from './components/Header'
import Feed from './components/Feed'
import Sidebar from './components/Sidebar';

const Home = () => {
  return (
    <main className={styles.main}>
      <Header />
      <div className={styles.contentContainer}>
        <Feed />
        <Sidebar />
      </div>
    </main>
  );
};

export default Home;