'use client';

import styles from '../page.module.css';
import Filter from 'bad-words';
import { AddCommentProps } from '@/types/interfaces';
import { FC, useEffect, useState } from 'react';

const AddComment: FC<AddCommentProps> = (props): JSX.Element => {

  const { postId, refreshCommentList } = props;

  const [submittedComment, setSubmittedComment] = useState({
    name: "",
    comment: "",
  });

  useEffect(() => {
    // force rerender to display previous comment on bad API return
  }, [submittedComment]);

  const handleCommentSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    const commentInput = document.querySelector('#comment');
    const nameInput = document.querySelector('#name');

    if (commentInput && nameInput) {
      const comment = (commentInput as HTMLTextAreaElement).value;
      const name = (nameInput as HTMLInputElement).value;

      if (comment.length !== 0 && name.length !== 0) {
        const sanitizedData: string[] = sanitizeCommentInputs(comment, name);
        clearForm();
        sendDataToDB(sanitizedData);
      } else {
        alert('You can only add a comment if you have a comment and name present in your submission');
      };
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
    if (typeof window !== "undefined") {
      const currentUser = window.localStorage.getItem("user");
      if (!currentUser) {
        alert('You are currently browsing without a token, please exit private/incognito browsing to add a comment');
      } else {
        const comment = data[0],
            name = data[1],
            processedData = new URLSearchParams();

            processedData.append('comment', comment);
            processedData.append('name', name);

        const url = `https://avd-blog-api.fly.dev/api/post/${postId}/comment/create/${currentUser}`;
        const postComment = await fetch(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: processedData.toString(),
        });
        const response = await postComment.json();
        if (response.comment) {
          // comment posted
          alert(`${response.message}`);
          refreshCommentList(response.comment);
        } else {
          console.log("handling error");
          alert(`${response.message}`);
          setSubmittedComment({
            comment: response.comment,
            name: response.name,
          });
        }
      };
    };
  };

  const clearForm = () => {
    const commentTextArea = document.querySelector("#comment");
    const nameInput = document.querySelector("#name");

    if (commentTextArea && nameInput) {
      (commentTextArea as HTMLInputElement).value = "";
      (nameInput as HTMLInputElement).value = "";
    };
  };

  return (
    <form 
      className={styles.addCommentForm}
      onSubmit={(e) => handleCommentSubmit(e)}
    >
      <div className={styles.formGroup}>
        <h2 className={styles.addComentHeaderText}>
          Add a Comment
        </h2>
        <label htmlFor='comment'>
          *Comment:
        </label>
        <textarea
          className={styles.formInput}
          name='comment'
          id='comment'
          rows={4}
          defaultValue={submittedComment.comment.length > 0 ? `${submittedComment.comment}` : ""}
        >
        </textarea>
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
          defaultValue={submittedComment.name.length > 0 ? `${submittedComment.name}` : ""}
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