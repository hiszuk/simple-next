import React from 'react'
import Box from '@mui/material/Box'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

export type AppGridProps = {
  columns: GridColDef[]
  data?: Array<any> | undefined
  loading?: boolean
}
export const AppGrid: React.FC<AppGridProps> = ({ columns, data = [], loading = false }) => {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid loading={loading} rows={data} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
    </Box>
  )
}
