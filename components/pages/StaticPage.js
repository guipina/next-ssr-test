import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/Home.module.css';
import Reviews from '../Reviews';

/*
* This is the shared Page component for all device types
*/

export default function StaticPage({article, device}) {

    const inlineStyle = device === "mobile" ? {background:'purple'} : {};

    return (
      <div className={styles.container} style={inlineStyle}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
  
      <main className={styles.main}>
          <Link href='/'><button>{"<--"} Home</button></Link>
        <h1 className={styles.title}>
          {device.toUpperCase()} {article.title}
        </h1>
        <p>{article.slug}</p>
        <h3>{article.content}</h3>
        <Reviews />
      </main>
    </div>);
  }