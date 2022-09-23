import React from 'react'
import { styled } from '@mui/material/styles'
import TextField, { TextFieldProps } from '@mui/material/TextField'

const StyledInput = styled(TextField)<TextFieldProps>({
  marginTop: '0.2rem',
  marginBottom: '0.2rem',
  marginLeft: '0.1rem',
  marginRight: '0.1rem',
  borderRadius: '8px',
})

/**
 * MUIテキストフィールドをオーバーライドする
 * @param label: ラベル、省略化、省略した場合はラベルを表示しない
 * @param placeholder:省略化、省略した場合は「入力してください」を表示する
 * @returns
 */
type Props = {
  label?: string | undefined
  placeholder?: string | undefined
} & TextFieldProps

export const AppInput: React.FC<Props> = ({ label, placeholder = '入力してください', ...props }) => {
  return (
    <StyledInput
      label={label}
      placeholder={placeholder}
      variant={props.variant || 'standard'}
      size={props.size || 'small'}
      fullWidth
      {...props}
    />
  )
}
