import { MainLayout } from '@/components/layouts'
import { AuthForm } from '@/components/organisms'
import Image from 'next/image'

const Home = () => {
  return (
    <MainLayout title="Messenger Clone" description="Messenger Clone">
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-6 bg-gray-100">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Image
            alt="Logo"
            height="48"
            width="48"
            className="mx-auto w-auto"
            src="/images/logo.png"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            {' '}
            Sign in to your account
          </h2>
        </div>
        <AuthForm />
      </div>
    </MainLayout>
  )
}

export default Home
