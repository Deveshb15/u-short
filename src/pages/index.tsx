import { useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {

  const [url, setUrl] = useState<string|null>(null)
  const [slug, setSlug] = useState<string|null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [added, setAdded] = useState<string|null>(null)

  console.log(url)
  console.log(slug)

  const addNewUrl = async() => {
    setLoading(true)
    try {
      const response = await fetch(`/api/add-url`, {
        method: "POST",
        body: JSON.stringify({
          url,
          slug
        })
      })
      const data = await response.json()
      console.log(data)
      if(data?.data) {
        let res_data = data?.data
        if(res_data?.slug) {
          setAdded(res_data?.slug)
        }
      }
      (document.getElementById('url-in') as HTMLInputElement).value = "";
      (document.getElementById('slug-in') as HTMLInputElement).value = "";
      setUrl(null)
      setSlug(null)
      
    } catch (err) {
      console.log(err)
      setError(true)
    }

    setLoading(false)
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Head>
        <title>Shorten a URL</title>
        <meta name="description" content="Shorten URL" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center gap-4">
        {/* Text */}
        <div>
          <h1 className='text-2xl sm:text-4xl md:text-8xl font-extrabold'>Shorten a URL</h1>
        </div>
        {/* Input url */}
        <div>
          <input id="url-in" onChange={(e) => setUrl(e.target.value)} className='rounded-xl border bg-transparent px-4 md:px-8 py-2' placeholder='Enter a URL' />
        </div>
        {/* Input slug */}
        <div>
          <input id="slug-in" onChange={(e) => setSlug(e.target.value)} className='rounded-xl border bg-transparent px-4 md:px-8 py-2' placeholder='input a slug(optional)' />
        </div>
        {/* Submit button */}
        <div>
          <button onClick={addNewUrl} className='rounded-xl px-4 py-2 bg-white text-black transform hover:scale-105'>Submit</button>
        </div>
        {/* Loading and Error handlers */}
        <div>
          {
            loading && <p className='text-sm text-gray-500'>Loading...</p>
          }
          {
            error && <p className='text-sm text-gray-500'>Error</p>
          }
          {
            added && <a href={`https://dushort.vercel.app/${added}`} className='text-sm text-gray-500 underline' target="_blank" rel="noreferrer">https://dushort.vercel.app/{added}</a>
          }
        </div>
      </main>
    </div>
  )
}

export default Home
