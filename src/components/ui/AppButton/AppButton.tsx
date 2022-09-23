import React from 'react'
import { ButtonProps } from '@mui/material'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'

const StyledButton = styled(Button)<ButtonProps>({
  borderRadius: '1.6rem',
  paddingTop: '0.3rem',
  paddingBottom: '0.3rem',
})

/**
 * MUIボタンをオーバーライドする
 * @param children: ボタンに表示するテキスト
 * @param props: 通常のボタンの属性
 * @returns
 */
type Props = {
  children: string
} & ButtonProps
export const AppButton: React.FC<Props> = ({ children, ...props }) => {
  return (
    <StyledButton variant="outlined" size="small" fullWidth {...props}>
      {children}
    </StyledButton>
  )
}
