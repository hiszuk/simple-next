import React from 'react'
import { Title, Subtitle, Description, Primary, ArgsTable, Stories, PRIMARY_STORY } from '@storybook/addon-docs'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { AppButton } from './AppButton'

export default {
  component: 'AppButton',
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>サンプルアプリ用ボタンコンポーネント</Subtitle>
          <Description>
            ボタンに表示するラベル文字列をchildrenとして渡す。HTMLのbuttonが持つ属性を全て設定することができる。
          </Description>
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </>
      ),
    },
  },
} as unknown as ComponentMeta<typeof AppButton>

const Template: ComponentStory<typeof AppButton> = (args) => <AppButton {...args}>{args.children}</AppButton>

const buttonLabel = 'デフォルト・ボタン'
export const Default = Template.bind({})
Default.args = {
  children: buttonLabel,
}
Default.argTypes = {
  children: {
    name: 'children',
    type: {
      name: 'string',
      required: true,
    },
    description: 'ボタンラベル',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: 'N/A' },
    },
    control: {
      type: 'text',
    },
  },
}

export const Success = Template.bind({})
Success.args = {
  children: 'success color',
  color: 'success',
}

export const Secondary = Template.bind({})
Secondary.args = {
  children: 'secondary color',
  color: 'secondary',
}

export const Warning = Template.bind({})
Warning.args = {
  children: 'warning color',
  color: 'warning',
}

export const Error = Template.bind({})
Error.args = {
  children: 'error color',
  color: 'error',
}
