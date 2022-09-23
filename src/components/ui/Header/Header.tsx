import React from 'react'
import { useRouter } from 'next/router'
import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { UserStatusType } from '@/stores/userStatus'
import AppButton from '../AppButton'

/**
 * Navi bar
 * @returns
 */
type HeaderProps = {
  user?: UserStatusType
}
export const Header: React.FC<HeaderProps> = ({ user }) => {
  const router = useRouter()
  const goPage = (url: string) => {
    router.push(url)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button color="inherit" onClick={() => goPage('/')}>
              ホーム
            </Button>
            {user && (
              <Button color="inherit" onClick={() => goPage('/list')}>
                ユーザーリスト
              </Button>
            )}
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="flex-end" alignItems="center">
            {user && <Box>{user.name}</Box>}
            <Box sx={{ width: 100 }}>
              {user ? (
                <AppButton color="inherit" href="/">
                  ログアウト
                </AppButton>
              ) : (
                <AppButton color="inherit" href="/login">
                  ログイン
                </AppButton>
              )}
            </Box>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
