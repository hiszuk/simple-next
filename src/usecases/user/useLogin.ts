import React, { useEffect } from 'react'
import { login } from '@/repositories/Login/Login'
import { useUserMutators } from '@/stores/userStatus'

/**
 * ログイン処理（非同期）
 * @param email: ログインするメールアドレス
 * @param password: ログインパスワード
 * @return progress: true:実行中, false:完了, undefined: 初期状態
 * @return loggedin: true:ログイン成功, false:未ログイン
 * @return error: エラー発生時のメッセージ
 */
export type UseLoginReturnType =
  | {
      progress?: boolean | undefined
      loggedin?: boolean | undefined
      error?: string | undefined
    }
  | undefined
export const useLogin = (email: string | undefined, password: string | undefined) => {
  const [status, setStatus] = React.useState<UseLoginReturnType>(undefined)

  // ユーザー情報設定用関数
  const { setUser } = useUserMutators()

  /**
   * email, passwordが変更された場合ログイン処理を非同期実行する
   * email, passwordに入力がある場合はログイン処理を非同期で実行する
   *   成功:ユーザー情報をuserStateに設定後、処理中をfalseにする
   *   失敗:ユーザ情報、処理中をfalseにしエラーメッセージをセットする
   * email, passwordがない場合(初期状態)ステータスを初期化する
   */
  useEffect(() => {
    // console.log('useLogin:', email, password)
    if (email && password) {
      // 入力がありボタンクリックされた
      // 処理中の状態にする
      setStatus({
        progress: true,
        loggedin: false,
        error: undefined,
      })

      // ログイン処理実行
      login(email, password)
        .then((res: any) => {
          // ユーザー情報をuserStateに設定
          setUser({
            email: email,
            name: res.name as string,
            isLoggedIn: true,
          })

          // ログイン成功、処理完了、エラーなし
          setStatus({
            progress: false,
            loggedin: true,
            error: undefined,
          })
        })
        .catch((err) => {
          // console.error(err.error)
          // ユーザー情報をundefinedに設定
          setUser(undefined)

          // ログイン失敗、処理完了、エラー表示必要
          setStatus({
            progress: false,
            loggedin: false,
            error: err.error,
          })
        })
    } else {
      // 初期状態(メールとパスワード入力がない状態)
      // ステータス初期化
      setStatus({
        progress: undefined,
        loggedin: false,
        error: undefined,
      })
    }
  }, [email, password, setUser])

  return {
    progress: status?.progress,
    loggedin: status?.loggedin,
    error: status?.error,
  }
}
