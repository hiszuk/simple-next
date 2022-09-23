import React from 'react'
import type { NextPage } from 'next'
import { Paper } from '@mui/material'
import LoginForm from '@/components/model/user/LoginForm'

export const Login: NextPage = () => {
  return (
    <Paper
      sx={{
        p: 5,
        width: 450,
        border: '1px solid lightgray',
        borderRadius: '8px',
        margin: 'auto',
        mt: 10,
      }}
    >
      <LoginForm />
    </Paper>
  )
}
