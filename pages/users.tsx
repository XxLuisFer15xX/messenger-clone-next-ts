import { UsersLayout } from '@/components/layouts'
import { EmptyState } from '@/components/molecules'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'

const Users = () => {
  return (
    <UsersLayout title="Users" description="Users">
      <div className="hidden lg:block lg:pl-80 h-full">
        <EmptyState />
      </div>
    </UsersLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })
  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    }
  }
  return {
    props: {},
  }
}

export default Users
