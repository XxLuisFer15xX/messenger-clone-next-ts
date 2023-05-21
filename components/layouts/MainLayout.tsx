import Head from 'next/head'
import styles from '@styles/MainLayout.module.css'

export const metada = {
  title: 'Messenger Clone',
  description: 'Messenger Clone',
}
export const MainLayout = ({
  children,
  description,
  imageFullUrl,
  title,
}: {
  children: React.ReactNode
  title: string
  description: string
  imageFullUrl?: string
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {imageFullUrl && <meta name="og:image" content={imageFullUrl} />}
      </Head>
      <main className={`flex flex-col h-full ${styles['container-main']}`}>
        {children}
      </main>
    </>
  )
}
