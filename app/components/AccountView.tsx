import { FC } from 'react';
import styles from '../page.module.css';
import { AccountViewProps } from '@/types/interfaces';

const AccountView: FC<AccountViewProps> = (props) => {

  const { returnToHomePage } = props;

  const handleReturnToHomePage = () => {
    returnToHomePage();
  };

  return (
    <section className={styles.accountViewContainer}>
      <button 
        className={styles.returnBtn}
        onClick={() => handleReturnToHomePage()}
      >
        Return to Home
      </button>
      <p>
        Account View
      </p>
    </section>
  );
};

export default AccountView;