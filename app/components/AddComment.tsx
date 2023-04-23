import styles from '../page.module.css';
import Filter from 'bad-words';
import { AddCommentProps } from '@/types/interfaces';
import { FC } from 'react';

const AddComment: FC<AddCommentProps> = (props): JSX.Element => {

  const { postId } = props;

  const handleCommentSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    const commentInput = document.querySelector('#comment');
    const nameInput = document.querySelector('#name');
    if (commentInput && nameInput) {
      const comment = (commentInput as HTMLInputElement).value;
      const name = (nameInput as HTMLInputElement).value;
      if (comment.length === 0 && name.length === 0) {
        const sanitizedData: string[] = sanitizeCommentInputs(comment, name);
        sendDataToDB(sanitizedData);
      } else{
        console.log('empty');
      }
    };
  };

  const sanitizeCommentInputs = (comment: string, name: string): string[] => {
    const filter = new Filter();
    const scrubbedComment = filter.clean(comment).trim();
    const scrubbedName = filter.clean(name).trim();
    return [
      scrubbedComment,
      scrubbedName
    ];
  };

  const sendDataToDB = async (data: string[]): Promise<void> => {
    const currentUser = sessionStorage.getItem("user");
    if (!currentUser) {
      alert('You are currently browsing without a token, please exit private/incognito browsing to add a comment');
    } else {
      const comment = data[0],
          name = data[1],
          processedData = new URLSearchParams();

          processedData.append('comment', comment);
          processedData.append('name', name);

      const url = `http://localhost:8080/api/post/${postId}/comment/create`;
      const postComment = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: processedData.toString(),
      });
      const response = await postComment.json();
    };
  };

  return (
    <form 
      className={styles.addCommentForm}
      onSubmit={(e) => handleCommentSubmit(e)}
    >
      <div className={styles.formGroup}>
        <label htmlFor='comment'>
          *Comment:
        </label>
        <input
          className={styles.formInput}
          type='text'
          name='comment'
          id='comment'
        >
        </input>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor='name'>
          *Name:
        </label>
        <input
          className={styles.formInput}
          type='text'
          name='name'
          id='name'
        >
        </input>
      </div>
      <button 
        className={styles.submitBtn}
        type='submit'
      >
        Add Comment
      </button>
    </form>
  );
};

export default AddComment;