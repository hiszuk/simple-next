import type { NextPage } from 'next'
import Layout from '@/components/layout/DefaultLayout'
import { Home } from './Home'

const HomePage: NextPage = () => {
  return (
    <Layout title="ホーム画面">
      <Home />
    </Layout>
  )
}
export default HomePage
