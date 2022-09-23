import type { NextPage } from 'next'
import Layout from '@/components/layout/DefaultLayout'
import { Login } from './Login'

export const LoginPage: NextPage = () => {
  return (
    <Layout title="ログイン画面">
      <Login />
    </Layout>
  )
}
export default LoginPage
