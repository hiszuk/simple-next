import React from 'react'
import { atom, useRecoilValue, useSetRecoilState } from 'recoil'

export type UserStatusType =
  | {
      email: string
      name: string
      isLoggedIn: boolean
    }
  | undefined

const userStatus = atom<UserStatusType>({
  key: 'userStatus',
  default: undefined,
})

export const useUserState = () => {
  return useRecoilValue(userStatus)
}

export const useUserMutators = () => {
  const setState = useSetRecoilState(userStatus)

  const setUser = React.useCallback((authentication: UserStatusType) => setState(authentication), [setState])
  return { setUser }
}
