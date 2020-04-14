import { useState } from 'react';
import Head from 'next/head';

import JokeSettings from '../components/JokeSettings';

import styles from './index.module.css';

const Home = () => {
  const [jokes, setJokes] = useState([]);

  const handleSubmit = async (jokeSettings: any) => {
    const { jokeNumber, category, firstName, lastName } = jokeSettings;
    const formatttedCategories =
      category === 'all' ? ['nerdy', 'implicit'] : [category];
    const res = await fetch(
      `http://api.icndb.com/jokes/random/${jokeNumber}?limitTo=${formatttedCategories}&firstName=${firstName}&lastName=${lastName}&escape=javascript`
    );
    const data = await res.json();
    setJokes(data.value);
  };

  return (
    <div className={styles.Container}>
      <Head>
        <title>Florin Pop Joke Machine</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1>Florin Pop Joke Machine</h1>
      <p>Generate your own personalized Florin Pop Jokes</p>
      <JokeSettings handleSubmit={handleSubmit} />
      <ul className={styles.JokesContainer}>
        {jokes.length > 0 ? (
          jokes.map((joke: any) => (
            <li key={joke.id} className={styles.Joke}>
              {joke.joke}
            </li>
          ))
        ) : (
          <p>No Jokes Yet</p>
        )}
      </ul>
    </div>
  );
};

export default Home;
