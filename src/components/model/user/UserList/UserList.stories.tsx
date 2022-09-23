import React from 'react'
import { RecoilRoot } from 'recoil'
import { GridColDef } from '@mui/x-data-grid'
import { Title, Subtitle, Description, Primary, ArgsTable, Stories, PRIMARY_STORY } from '@storybook/addon-docs'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { UserList } from './UserList'

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
  component: 'UserList',
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>ユーザーリスト表示グリッド</Subtitle>
          <Description>ユーザーリストをグリッドで表示する</Description>
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </>
      ),
    },
  },
} as unknown as ComponentMeta<typeof UserList>

const Template: ComponentStory<typeof UserList> = (args) => (
  <RecoilRoot>
    <UserList {...args} />
  </RecoilRoot>
)

export const Default = Template.bind({})
Default.args = {
  columns: columns,
  rows: rows,
}
