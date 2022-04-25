import React from 'react';

import styles from './InputTask.module.scss';

interface InputTaskProps {
  id: string;
  title: string;
  onDone: (id: string) => void;
  onEdited: (id: string, title: string) => void;
  onRemoved: (id: string) => void;
}

export const InputTask: React.FC<InputTaskProps> = ({ id, title, onDone, onEdited, onRemoved }) => {
  const [checked, setChecked] = React.useState(false);
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [value, setValue] = React.useState(title);
  const editTitleInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (isEditMode) {
      editTitleInputRef?.current?.focus();
    }
  }, [isEditMode]);

  return (
    <div className={styles.inputTask}>
      <label className={styles.inputTaskLabel}>
        <input
          className={styles.inputTaskCheckbox}
          type="checkbox"
          disabled={isEditMode}
          checked={checked}
          onChange={(evt) => {
            setChecked(evt.target.checked);

            if (evt.target.checked) {
              setTimeout(() => {
                onDone(id);
              }, 300);
            }
          }}
        />
        {isEditMode ? (
          <input
            className={styles.inputTaskTitleEdit}
            type="text"
            ref={editTitleInputRef}
            value={value}
            onChange={(evt) => {
              setValue(evt.target.value);
            }}
            onKeyDown={(evt) => {
              if (evt.key === 'Enter') {
                onEdited(id, value);
                setIsEditMode(false);
              }
            }}
          />
        ) : (
          <h3 className={styles.inputTaskTitle}>{title}</h3>
        )}
      </label>
      {isEditMode ? (
        <button
          className={styles.inputTaskSave}
          aria-label="Save"
          onClick={() => {
            onEdited(id, value);
            setIsEditMode(false);
          }}
        />
      ) : (
        <button
          className={styles.inputTaskEdit}
          aria-label="Edit"
          onClick={() => {
            setIsEditMode(true);
          }}
        />
      )}
      <button
        className={styles.inputTaskRemove}
        aria-label="Remove"
        onClick={() => {
          if (confirm('Are you sure?')) {
            onRemoved(id);
          }
        }}
      />
    </div>
  );
};
