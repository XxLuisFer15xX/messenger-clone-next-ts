import { createContext } from 'react'
import { AuthActionType, AuthState } from './'

interface ContextProps {
  authState: AuthState
  authDispatch: React.Dispatch<AuthActionType>
}

export const AuthContext = createContext({} as ContextProps)
