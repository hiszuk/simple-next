import React from 'react'
import { GridColDef } from '@mui/x-data-grid'
import { User } from '@/@types/global'
import AppGrid from '@/components/ui/AppGrid'

/**
 * ユーザーリストを読み込んで表示する
 * @returns エラー：エラー表示、読み込み中：loadingの表示、データ取得完了：ユーザーリスト表示
 */
type UserListProps = {
  columns: GridColDef[]
  rows?: User[] | undefined
  loading?: boolean | undefined
}
export const UserList: React.FC<UserListProps> = ({ columns, rows, loading = false }) => {
  if (loading) return <AppGrid columns={columns} loading />
  else return <AppGrid columns={columns} data={rows} />
}
