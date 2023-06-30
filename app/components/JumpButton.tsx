import { FC } from 'react';
import styles from '../page.module.css';
import { JumpButtonProps } from '@/types/interfaces';

const JumpButton: FC<JumpButtonProps> = (props): JSX.Element => {

    const { handleJumpButtonClick } = props;

  return (
    <img 
        className={styles.jumpArrowUpImg}
        src={'/arrow-up.svg'}
        onClick={() => handleJumpButtonClick()}>
    </img>
  );
};

export default JumpButton;