import React from 'react'
import { Title, Subtitle, Description, Primary, ArgsTable, Stories, PRIMARY_STORY } from '@storybook/addon-docs'
import { expect } from '@storybook/jest'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { within, waitFor } from '@storybook/testing-library'
import { Header } from './Header'

export default {
  component: 'Header',
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>ヘッダ</Subtitle>
          <Description>全ページ上部表示するヘッダ</Description>
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </>
      ),
    },
  },
} as unknown as ComponentMeta<typeof Header>

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />

export const Default = Template.bind({})
Default.args = {
  user: {
    name: 'テスト 太郎',
    email: 'taro@etst.com',
    isLoggedIn: true,
  },
}
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await waitFor(() => {
    const text = canvas.getByText('ホーム')
    expect(text).toBeInTheDocument()
  })

  await waitFor(() => {
    const text = canvas.getByText('ユーザーリスト')
    expect(text).toBeInTheDocument()
  })

  await waitFor(() => {
    const text = canvas.getByText('テスト 太郎')
    expect(text).toBeInTheDocument()
  })

  await waitFor(() => {
    const button = canvas.getByText('ログアウト')
    expect(button).toBeInTheDocument()
  })
}

export const Logout = Template.bind({})
Logout.args = {
  user: undefined,
}
Logout.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await waitFor(() => {
    const text = canvas.getByText('ホーム')
    expect(text).toBeInTheDocument()
  })

  await waitFor(() => {
    const button = canvas.getByText('ログイン')
    expect(button).toBeInTheDocument()
  })
}
