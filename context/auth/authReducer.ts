import { IUser } from '@types'

export interface AuthState {
  isLoggedIn: boolean
  user?: IUser
}

export type AuthActionType =
  | { type: '[Auth] - Login'; payload: IUser }
  | { type: '[Auth] - Logout' }

export const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
}

export const authReducer = (
  state: AuthState,
  action: AuthActionType,
): AuthState => {
  switch (action.type) {
    case '[Auth] - Login':
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      }
    case '[Auth] - Logout':
      return AUTH_INITIAL_STATE
    default:
      return state
  }
}
