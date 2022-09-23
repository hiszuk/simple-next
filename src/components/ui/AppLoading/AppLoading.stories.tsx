import React from 'react'
import { Title, Subtitle, Description, Primary, ArgsTable, Stories, PRIMARY_STORY } from '@storybook/addon-docs'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { AppLoading } from './AppLoading'

export default {
  component: 'AppLoading',
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>Loading画面</Subtitle>
          <Description>全面を一段暗くしてLoadingのアイコンを表示する</Description>
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </>
      ),
    },
  },
} as unknown as ComponentMeta<typeof AppLoading>

const Template: ComponentStory<typeof AppLoading> = () => <AppLoading />

export const Default = Template.bind({})
