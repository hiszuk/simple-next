import React from 'react'
import { RecoilRoot } from 'recoil'
import { Title, Subtitle, Description, Primary, ArgsTable, Stories, PRIMARY_STORY } from '@storybook/addon-docs'
import { expect } from '@storybook/jest'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { within, waitFor } from '@storybook/testing-library'
import { LoginForm } from './LoginForm'

export default {
  component: 'LoginForm',
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>ログイン入力フォームコンポーネント</Subtitle>
          <Description>
            メールアドレス、パスワードを入力しログインボタンをクリックするとログイン処理が非同期で実行される
          </Description>
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </>
      ),
    },
  },
} as unknown as ComponentMeta<typeof LoginForm>

const Template: ComponentStory<typeof LoginForm> = () => (
  <RecoilRoot>
    <LoginForm />
  </RecoilRoot>
)

export const Default = Template.bind({})
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await waitFor(() => {
    const input = canvas.getByPlaceholderText('メールアドレスを入力してください')
    expect(input).toBeInTheDocument
  })

  await waitFor(() => {
    const input = canvas.getByPlaceholderText('パスワードを入力してください')
    expect(input).toBeInTheDocument
  })

  // ボタンが生成されていること
  await waitFor(() => {
    const button = canvas.getByText('ログイン')
    expect(button).toBeInTheDocument()
  })
}
