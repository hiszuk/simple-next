import type { NextPage } from 'next'
import Head from 'next/head'
import { Container } from '@mui/material'
import Header from '@/components/ui/Header'

type LayoutProps = {
  title?: string
  children: React.ReactNode
}
const Layout: NextPage<LayoutProps> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <main>
        <Container sx={{ my: 3 }}>{children}</Container>
      </main>
    </>
  )
}
export default Layout
