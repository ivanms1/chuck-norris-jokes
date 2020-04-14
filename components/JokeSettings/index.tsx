import styles from './JokeSettings.module.css';
import { useState } from 'react';
import React from 'react';

interface JokeSettingsProps {
  handleSubmit: (values: any) => void;
}

const JokeSettings = ({ handleSubmit }: JokeSettingsProps) => {
  const [jokeSettings, setJokeSettings] = useState({
    jokeNumber: 1,
    category: 'all',
    firstName: 'Florin',
    lastName: 'Pop',
  });

  const handleChange = (e: any) => {
    setJokeSettings({
      ...jokeSettings,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <form
      className={styles.SettingsForm}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(jokeSettings);
      }}
    >
      <div className={styles.Inputs}>
        <div>
          <label htmlFor='jokeNumber'>How many jokes?</label>
          <input
            name='jokeNumber'
            value={
              jokeSettings.jokeNumber ? jokeSettings.jokeNumber : undefined
            }
            min='1'
            max='20'
            onChange={(e) => handleChange(e)}
            id='jokeNumber'
            type='number'
          />
        </div>
        <div>
          <label htmlFor='category'>Which Category</label>
          <select
            name='category'
            value={jokeSettings.category}
            onChange={(e) => handleChange(e)}
            id='category'
          >
            <option value='all'>All</option>
            <option value='nerdy'>Nerdy</option>
            <option value='explicit'>Explicit</option>
          </select>
        </div>
        <div className={styles.PersonalizeContainer}>
          <div className={styles.PersonalizeInputs}>
            <div className={styles.PersonalizeInput}>
              <label htmlFor='firstName'>First Name</label>
              <input
                onChange={(e) => handleChange(e)}
                value={jokeSettings.firstName}
                name='firstName'
                id='firstName'
                type='text'
              />
            </div>
            <div className={styles.PersonalizeInput}>
              <label htmlFor='lastName'>Last Name</label>
              <input
                name='lastName'
                value={jokeSettings.lastName}
                onChange={(e) => handleChange(e)}
                id='firstName'
                type='text'
              />
            </div>
          </div>
        </div>
        <button className={styles.SubmitButton} type='submit'>
          Generate
        </button>
      </div>
    </form>
  );
};

export default JokeSettings;
