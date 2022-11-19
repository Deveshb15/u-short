import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Head>
        <title>Shorten a URL</title>
        <meta name="description" content="Shorten URL" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex items-center justify-center">
        {/* Text */}
        <div>
          <h1 className='text-4xl font-extrabold'>Shorten a URL</h1>
        </div>
        {/* Input */}
        <div>
        </div>
        {/* Submit button */}
        <div>

        </div>
        {/* Loading and Error handlers */}
        <div>

        </div>
      </main>
    </div>
  )
}

export default Home
