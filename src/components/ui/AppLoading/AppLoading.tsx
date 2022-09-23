import React from 'react'
import { Backdrop, CircularProgress } from '@mui/material'

/**
 * Loadingのバックドロップ
 * @returns
 */
export const AppLoading: React.FC = () => {
  const [open, setOpen] = React.useState(true)
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={handleClose}>
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}
