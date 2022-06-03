import '../styles/globals.css'
import Head from 'next/head'
import react , { useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [loggedIn , setLoggedIn] = useState(false);
  return (
    <>
    <Head>
        <meta
          name="description"
          content="LeGroSh is a App to provide web services , self growth blogs , Tech related content and a Engine to communicate with all! , solve queries and doubts to provide a proper guidence to my juniors - An initiative by Harsh Jaiswani"
        />
        <noscript>
          Give Power of Javascript to Your Browser Engine to Have Embrase the
          Beauty of this App
        </noscript>
        <title>LeGroSh - Learn-Grow-Share</title>
      </Head>
  <Component {...pageProps} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
  </>
  );
}

export default MyApp
