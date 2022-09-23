import React from 'react'
import type { NextPage } from 'next'
import { Stack } from '@mui/material'
import SearchForm from '@/components/model/user/SearchForm'
import UserList from '@/components/model/user/UserList'
import { useUserList } from '@/usecases/user/useUserList'

export const List: NextPage = () => {
  // ユーザー検索処理を定義する
  // setConditionに名前をセットすると非同期検索が実行されてrows,columns,loadingにデータが入る
  const { columns, rows, error, loading, setCondition } = useUserList()

  // エラー発生時は（発生しないはずだが）エラー表示する
  if (error) return <div>Error Occured</div>

  return (
    <>
      <Stack direction="column" spacing={2} sx={{ m: 3, width: 700 }}>
        <SearchForm onSearch={setCondition} />
        <UserList columns={columns} rows={rows} loading={loading} />
      </Stack>
    </>
  )
}
