import React, { useEffect } from 'react'
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { User } from '@/@types/global'
import useSWR from 'swr'
import { getUsersByName } from '@/repositories/UserList/UserList'

export const useUserListByName = (name: string | undefined) => {
  // console.log('name', name)
  return useSWR<User[] | undefined>(
    () => ['/users', name],
    () => getUsersByName(name)
  )
}

export const useColumnHeader = () => {
  // columnヘッダ情報
  const col: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      headerAlign: 'center',
      type: 'number',
      width: 90,
    },
    {
      field: 'firstName',
      headerName: 'First name',
      headerAlign: 'center',
      width: 150,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      headerAlign: 'center',
      width: 150,
    },
    {
      field: 'age',
      headerName: 'Age',
      headerAlign: 'center',
      type: 'number',
      width: 110,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      headerAlign: 'center',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) => `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ]
  return { columns: col }
}

export const useUserList = () => {
  // 列ヘッダ定義の取得
  const { columns } = useColumnHeader()

  // 検索条件
  const [name, setName] = React.useState<string | undefined>(undefined)

  // リスト検索
  const { data, error } = useUserListByName(name)

  // 初回(name===undefined)またはdataがある場合はloadingはfalseとする
  const loading = !(name === undefined || data)

  // コールバック
  // setConditionでcondition(=name)が設定されると検索処理が起動する
  const setCondition = React.useCallback((condition: string | undefined) => {
    setName(condition)
  }, [])

  // 確認
  useEffect(() => {
    console.log('condition name:', name, loading, data?.length)
  }, [data?.length, loading, name])

  return {
    columns,
    rows: data,
    error,
    loading,
    setCondition,
  }
}
