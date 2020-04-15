import { useState } from 'react';
import Head from 'next/head';

import JokeSettings from '../components/JokeSettings';

import florin from '../assets/florin.jpg';

import styles from './index.module.css';

const Home = () => {
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (jokeSettings: any) => {
    const { jokeNumber, category, firstName, lastName } = jokeSettings;
    const formatttedCategories =
      category === 'all' ? ['nerdy', 'implicit'] : [category];
    setLoading(true);
    const res = await fetch(
      `https://api.icndb.com/jokes/random/${jokeNumber}?limitTo=${formatttedCategories}&firstName=${firstName}&lastName=${lastName}&escape=javascript`
    );
    const data = await res.json();
    setJokes(data.value);
    setLoading(false);
  };

  return (
    <div className={styles.Container}>
      <Head>
        <title>Florin Pop Joke Machine</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className={styles.Header}>
        <img src={florin} alt='florin' />
        <div className={styles.HeaderTitle}>
          <h1>Florin Pop Joke Generator</h1>
          <p>Generate your own personalized Florin Pop Jokes</p>
        </div>
      </div>
      <JokeSettings handleSubmit={handleSubmit} />
      <ul className={styles.JokesContainer}>
        {!loading ? (
          jokes.length > 0 ? (
            jokes.map((joke: any) => (
              <li key={joke.id} className={styles.Joke}>
                {joke.joke}
              </li>
            ))
          ) : (
            <span className={styles.NoJokes}>No Jokes Found :/</span>
          )
        ) : (
          <div className={styles.Spinner} />
        )}
      </ul>
    </div>
  );
};

export default Home;
