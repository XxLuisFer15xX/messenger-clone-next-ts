import { useConversation, useRoutes } from '@/hooks'
import React from 'react'
import { MobileItem } from '@/components/atoms'

export const MobileFooter = () => {
  const routes = useRoutes()
  const { isOpen } = useConversation()

  if (isOpen) {
    return null
  }

  return (
    <div
      className="
      fixed 
      justify-between 
      w-full 
      bottom-0 
      z-40 
      flex 
      items-center 
      bg-white 
      border-t-[1px] 
      lg:hidden
    "
    >
      {routes.map(route => (
        <MobileItem
          key={route.href}
          href={route.href}
          active={route.active}
          icon={route.icon}
          onClick={route.onClick}
        />
      ))}
    </div>
  )
}
