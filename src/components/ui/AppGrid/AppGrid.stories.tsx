import React from 'react'
import { GridColDef } from '@mui/x-data-grid'
import { Title, Subtitle, Description, Primary, ArgsTable, Stories, PRIMARY_STORY } from '@storybook/addon-docs'
import { expect } from '@storybook/jest'
import { ComponentMeta, ComponentStory, Story } from '@storybook/react'
import { within, waitFor } from '@storybook/testing-library'
import { AppGrid, AppGridProps } from './AppGrid'

/**
 * テストデータ
 */
const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 90,
  },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
  },
]
const rows = [
  { id: 1, firstName: 'John', lastName: 'Doe' },
  { id: 2, firstName: 'Steave', lastName: 'Jobs' },
  { id: 3, firstName: 'Michel', lastName: 'Jackson' },
]

export default {
  component: 'Grid',
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>汎用グリッド表示</Subtitle>
          <Description>標準グリッド表示。高さ400、幅100％、1ページの行数5、シングルセレクション</Description>
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </>
      ),
    },
  },
} as unknown as ComponentMeta<typeof AppGrid>

const Template: ComponentStory<typeof AppGrid> = (args) => <AppGrid {...args} />

export const Default: Story<AppGridProps> = Template.bind({})
Default.args = {
  columns: columns,
}
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  expect(canvas.getByText('No rows')).toBeInTheDocument()
}

export const Loading = Template.bind({})
Loading.args = {
  columns: columns,
  data: [],
  loading: true,
}
Loading.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await waitFor(() => {
    const rows = canvas.getAllByRole('rowgroup')
    expect(rows.length).toBe(1)
    expect(canvas.getByRole('progressbar')).toBeInTheDocument()
  })
}

export const GotData = Template.bind({})
GotData.args = {
  columns: columns,
  data: rows,
}
GotData.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await waitFor(() => {
    const rows = canvas.getAllByRole('rowgroup')
    expect(rows.length).toBe(1)
    expect(canvas.getByText('John')).toBeInTheDocument()
    expect(canvas.getByText('Steave')).toBeInTheDocument()
    expect(canvas.getByText('Michel')).toBeInTheDocument()
  })
}
