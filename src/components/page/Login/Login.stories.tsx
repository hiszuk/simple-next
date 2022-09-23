import React from 'react'
import { RecoilRoot } from 'recoil'
import { Title, Subtitle, Description, Primary, ArgsTable, Stories, PRIMARY_STORY } from '@storybook/addon-docs'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Login } from './Login'

export default {
  component: 'Login',
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>Loginページコンテンツ部分</Subtitle>
          <Description>ログイン入力フォームを表示しログイン処理を行う。ログイン成功時はユーザー検索に遷移する。</Description>
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </>
      ),
    },
  },
} as unknown as ComponentMeta<typeof Login>

const Template: ComponentStory<typeof Login> = () => (
  <RecoilRoot>
    <Login />
  </RecoilRoot>
)

export const Default = Template.bind({})
