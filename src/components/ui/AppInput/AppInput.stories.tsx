import React from 'react'
import { SearchOutlined } from '@mui/icons-material'
import { InputAdornment } from '@mui/material'
import { Title, Subtitle, Description, Primary, ArgsTable, Stories, PRIMARY_STORY } from '@storybook/addon-docs'
import { expect } from '@storybook/jest'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { within, userEvent, waitFor } from '@storybook/testing-library'
import { AppInput } from './AppInput'

export default {
  component: 'AppInput',
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>サンプルアプリ用テキスト入力コンポーネント</Subtitle>
          <Description>ラベル、placeholderテキストを渡しテキスト入力欄を表示</Description>
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </>
      ),
    },
  },
} as unknown as ComponentMeta<typeof AppInput>

const Template: ComponentStory<typeof AppInput> = (args) => <AppInput {...args} />

export const Default = Template.bind({})
Default.args = {
  label: 'ラベルテキスト',
  placeholder: 'テキストを入力',
}
Default.argTypes = {
  label: {
    name: 'label',
    type: {
      name: 'string',
      required: false,
    },
    description: '入力欄のラベル',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: 'N/A' },
    },
    control: {
      type: 'text',
    },
  },
  placeholder: {
    name: 'placeholder',
    type: {
      name: 'string',
      required: false,
    },
    description: '入力欄のplaceholder',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: '入力してください' },
    },
    control: {
      type: 'text',
    },
  },
}
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await waitFor(() => {
    // labelが生成されていること
    const label = canvas.getByText('ラベルテキスト')
    expect(label).toBeInTheDocument

    // placeholderが生成されていること
    const placeholder = canvas.getByPlaceholderText('テキストを入力')
    expect(placeholder).toBeInTheDocument
  })

  // テキスト入力した結果を取得できること
  const input = canvas.getByRole('textbox') as HTMLInputElement
  userEvent.type(input, '入力した内容')
  expect(input.value).toEqual('入力した内容')
}

export const NoArgs = Template.bind({})
NoArgs.args = {}
NoArgs.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await waitFor(() => {
    // labelが生成されていること
    const label = canvas.queryByText('ラベルテキスト')
    expect(label).not.toBeInTheDocument()

    // placeholderが生成されていること
    const placeholder = canvas.getByPlaceholderText('入力してください')
    expect(placeholder).toBeInTheDocument
  })
}

export const OutlinedMid = Template.bind({})
OutlinedMid.args = {
  label: 'Outlined Medium With Icon',
  placeholder: '検索する文字を入力してください',
  variant: 'outlined',
  size: 'medium',
  InputProps: {
    startAdornment: (
      <InputAdornment position="start">
        <SearchOutlined />
      </InputAdornment>
    ),
  },
}
