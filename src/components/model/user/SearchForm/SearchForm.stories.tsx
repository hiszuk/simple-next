import React from 'react'
import { RecoilRoot } from 'recoil'
import { action } from '@storybook/addon-actions'
import { Title, Subtitle, Description, Primary, ArgsTable, Stories, PRIMARY_STORY } from '@storybook/addon-docs'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { SearchForm } from './SearchForm'

export default {
  component: 'UserSearch',
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>ユーザー検索コンポーネント</Subtitle>
          <Description>入力欄に入力した文字でユーザーリストのlastName, firstNameに部分一致するレコードを検索する</Description>
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </>
      ),
    },
  },
} as unknown as ComponentMeta<typeof SearchForm>

const Template: ComponentStory<typeof SearchForm> = (args) => (
  <RecoilRoot>
    <SearchForm {...args} />
  </RecoilRoot>
)

export const Default = Template.bind({})
Default.args = {
  onSearch: action('clicked'),
}
Default.argTypes = {
  onSearch: {
    name: 'onSearch',
    type: {
      name: 'function',
      required: true,
    },
    description: '検索ボタンをクリックした時の処理',
  },
}
