import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { Alert, Box, LinearProgress, Stack } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import AppButton from '@/components/ui/AppButton'
import AppInput from '@/components/ui/AppInput'
import { useLogin } from '@/usecases/user/useLogin'

// フォーム入力内容を保持する変数
type FormState = {
  email: string
  password: string
}

// バリデーションルール
const validationSchema = yup.object({
  email: yup.string().required('必須入力です').email('xxx@yyy.zzz形式で入力してください'),
  password: yup.string().required('必須入力です'),
})

/**
 * email, password入力し、ログインボタンクリックで
 * ログイン実行し、ユーザー情報をグローバルに保存する
 */
export const LoginForm: React.FC = () => {
  // react-hook-form設定
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormState>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(validationSchema),
  })

  // ...register()ではrefがうまく渡せないので個別に渡す
  const { ref: emailRef, name: emailName, onChange: emailOnChange, onBlur: emailOnBlur } = register('email')
  const { ref: passwordRef, name: passwordName, onChange: passwordOnChange, onBlur: passwordOnBlur } = register('password')

  // ログインボタンクリック時の処理
  type AuthType = {
    authEmail: string | undefined
    authPassword: string | undefined
  }
  const [{ authEmail, authPassword }, setAuth] = React.useState<AuthType>({
    authEmail: undefined,
    authPassword: undefined,
  })
  const onSubmit: SubmitHandler<FormState> = (data) => {
    // email, passwordをセットする → useLogin()が再評価される
    setAuth({
      authEmail: data.email,
      authPassword: data.password,
    })
  }

  // ログイン処理（非同期）
  // @return progress: true:実行中, false:完了, undefined: 初期状態
  // @return loggedin: true:ログイン成功, false:未ログイン
  // @return error: エラー発生時のメッセージ
  const { progress, loggedin, error } = useLogin(authEmail, authPassword)

  // ログインすればユーザーリスト検索画面に遷移する
  const router = useRouter()
  if (loggedin) router.push('/list')

  return (
    <Stack direction="column" spacing={3} component="form" onSubmit={handleSubmit(onSubmit)}>
      {/* Error表示 */}
      {error && (
        <Box sx={{ width: '100%' }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}

      {/* Login成功表示 */}
      {loggedin && (
        <Box sx={{ width: '100%' }}>
          <Alert severity="success">ログインに成功しました</Alert>
        </Box>
      )}

      {/* email */}
      <Box sx={{ width: '100%' }}>
        <AppInput
          id="email"
          name={emailName}
          inputRef={emailRef}
          onChange={emailOnChange}
          onBlur={emailOnBlur}
          label="メールアドレス"
          placeholder="メールアドレスを入力してください"
          variant="outlined"
          error={'email' in errors}
          helperText={errors.email?.message}
        />
      </Box>

      {/* password */}
      <Box sx={{ width: '100%' }}>
        <AppInput
          id="password"
          name={passwordName}
          inputRef={passwordRef}
          onChange={passwordOnChange}
          onBlur={passwordOnBlur}
          label="パスワード"
          placeholder="パスワードを入力してください"
          variant="outlined"
          type="password"
          error={'password' in errors}
          helperText={errors.password?.message}
        />
      </Box>

      {/* ログインボタン */}
      <Box sx={{ width: 100 }}>
        <AppButton type="submit" disabled={progress}>
          ログイン
        </AppButton>
      </Box>

      {/* プログレスバー */}
      {progress && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}
    </Stack>
  )
}
