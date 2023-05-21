import { useReducer, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { AuthProviderProps, IUser } from '@types'
import { AuthContext, authReducer, AUTH_INITIAL_STATE } from './'

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, authDispatch] = useReducer(authReducer, AUTH_INITIAL_STATE)
  const { data, status } = useSession()

  useEffect(() => {
    if (status === 'authenticated') {
      authDispatch({ type: '[Auth] - Login', payload: data?.user as IUser })
    }
  }, [status, data])

  return (
    <AuthContext.Provider
      value={{
        authState,
        authDispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
