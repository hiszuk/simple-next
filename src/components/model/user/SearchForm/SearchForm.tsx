import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { SearchOutlined } from '@mui/icons-material'
import { Stack, Box, InputAdornment } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import AppButton from '@/components/ui/AppButton'
import AppInput from '@/components/ui/AppInput'

// フォーム入力内容を保持する変数
type FormState = {
  condition: string
}

// バリデーションルール
const validationSchema = yup.object({
  condition: yup.string().matches(/(^$|^[a-zA-Z]+$)/, '半角英字のみ入力可能です'),
})

/**
 * ボタンクリックされたら入力された文字で検索を実行する
 * 入力がない場合は全件検索を実行する
 */
type SearchFormProps = {
  onSearch: (name: string) => void
}
export const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  // フォーム入力
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormState>({
    defaultValues: {
      condition: '',
    },
    resolver: yupResolver(validationSchema),
  })

  // 検索ボタンクリックで検索を実行する
  const onSubmit: SubmitHandler<FormState> = (data) => {
    onSearch(data.condition)
  }

  // 条件のプロパティ
  const { onChange, onBlur, name, ref } = register('condition')

  return (
    <Stack
      direction="row"
      spacing={3}
      justifyContent="space-between"
      alignItems="center"
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* 条件入力欄 */}
      <Box sx={{ width: '100%' }}>
        <AppInput
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          inputRef={ref}
          placeholder="検索条件を入力してください"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlined />
              </InputAdornment>
            ),
          }}
          error={'condition' in errors}
          helperText={errors.condition?.message}
        />
      </Box>

      {/* 検索ボタン */}
      <Box sx={{ width: 100 }}>
        <AppButton type="submit">検索する</AppButton>
      </Box>
    </Stack>
  )
}
