import React from 'react'
import { RecoilRoot } from 'recoil'
import { Title, Subtitle, Description, Primary, ArgsTable, Stories, PRIMARY_STORY } from '@storybook/addon-docs'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { List } from './List'

export default {
  component: 'List',
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>Listページコンテンツ部分</Subtitle>
          <Description>入力欄に入力した文字でユーザーリストを検索し、結果を一覧表示する。</Description>
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </>
      ),
    },
  },
} as unknown as ComponentMeta<typeof List>

const Template: ComponentStory<typeof List> = () => (
  <RecoilRoot>
    <List />
  </RecoilRoot>
)

export const Default = Template.bind({})
