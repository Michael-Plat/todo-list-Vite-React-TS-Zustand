import React from 'react';

import styles from './InputPlus.module.scss';

interface InputPlusProps {
  onAdd: (title: string) => void;
}

export const InputPlus: React.FC<InputPlusProps> = ({ onAdd }) => {
  const [inputValue, setInputValue] = React.useState('');
  const addTask = React.useCallback(() => {
    onAdd(inputValue);
    setInputValue('');
  }, [inputValue]);

  return (
    <div className={styles.inputPlus}>
      <input
        className={styles.inputPlusValue}
        type="text"
        value={inputValue}
        onChange={(evt) => {
          setInputValue(evt.target.value);
        }}
        onKeyDown={(evt) => {
          if (evt.key === 'Enter') {
            addTask();
          }
        }}
        placeholder="Type here..."
      />
      <button className={styles.inputPlusButton} onClick={addTask} aria-label="Add" />
    </div>
  );
};
