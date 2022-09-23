import React from 'react'
import type { NextPage } from 'next'
import Login from '@/components/page/Login'
import { useUserState } from '@/stores/userStatus'

export const WithAuth = (Component: NextPage) => {
  // eslint-disable-next-line react/display-name
  return (props: JSX.IntrinsicAttributes) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const user = useUserState()

    // ログインしていない場合はログイン画面を表示
    if (!user?.isLoggedIn) return <Login />
    // ログインしている場合はリクエストページを表示
    else return <Component {...props} />
  }
}
