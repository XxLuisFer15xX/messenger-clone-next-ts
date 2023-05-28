import { GetServerSideProps } from 'next'

const Home = () => {
  return (
    <div>
      <p>Welcome to Messenger Clone!</p>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/users',
      permanent: false,
    },
  }
}

export default Home
