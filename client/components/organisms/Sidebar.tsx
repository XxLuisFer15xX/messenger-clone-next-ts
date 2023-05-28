import { useContext } from 'react'
import { AuthContext } from '@context/auth'
import { DesktopSidebar, MobileFooter } from '@components/molecules'

export const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const { authState } = useContext(AuthContext)

  return (
    <div className="h-full">
      <DesktopSidebar currentUser={authState.user} />
      <MobileFooter />
      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  )
}
