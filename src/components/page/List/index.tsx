import type { NextPage } from 'next'
import Layout from '@/components/layout/DefaultLayout'
import { List } from './List'

export const ListPage: NextPage = () => {
  return (
    <Layout title="ユーザーリスト表示">
      <List />
    </Layout>
  )
}
export default ListPage
