import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import styles from '../../styles/Home.module.css'

import ClientOnly from '../../components/ClientOnly'
import Products from '../../components/Products'



export default function Home({products}) {

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Link href='/'><button>{"<--"} Home</button></Link>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <ClientOnly>
          <Products />
        </ClientOnly>
        
        
      </main>
    </div>
  )
}