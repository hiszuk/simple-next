// import { waitFor } from '@testing-library/react';
import { RecoilRoot } from 'recoil'
import { renderHook } from '@testing-library/react-hooks'
import { act } from 'react-dom/test-utils'
import { useLogin } from './useLogin'

describe('useLogin UT', () => {
  type AuthParamType = {
    email?: string | undefined
    password?: string | undefined
  }
  const initAuthParam: AuthParamType = {
    email: undefined,
    password: undefined,
  }
  const okAuthParam: AuthParamType = {
    email: 'abc@def.com',
    password: 'abc',
  }
  const ngAuthParam: AuthParamType = {
    email: 'abc@def.com',
    password: 'a',
  }

  it('メールとパスワード入力がない時は初期状態を返す', async () => {
    await act(async () => {
      const { result, waitForNextUpdate } = renderHook((payload: AuthParamType) => useLogin(payload.email, payload.password), {
        initialProps: initAuthParam,
        // @ts-ignore
        wrapper: RecoilRoot,
      })

      // 初期状態
      await waitForNextUpdate({ timeout: 3000 })
      expect(result.current.progress).toBe(undefined)
      expect(result.current?.loggedin).toBe(false)
      expect(result.current?.error).toBe(undefined)
    })
  })

  it('正しいメールとパスワード入力がある場合', async () => {
    await act(async () => {
      const { result, rerender, waitForNextUpdate } = renderHook(
        (payload: AuthParamType) => useLogin(payload.email, payload.password),
        {
          initialProps: initAuthParam,
          // @ts-ignore
          wrapper: RecoilRoot,
        }
      )

      // 初期状態
      await waitForNextUpdate({ timeout: 3000 })
      expect(result.current.progress).toBe(undefined)
      expect(result.current?.loggedin).toBe(false)
      expect(result.current?.error).toBe(undefined)

      // OK入力
      rerender(okAuthParam)

      // 処理中になる
      expect(result.current.progress).toBe(true)
      expect(result.current?.loggedin).toBe(false)
      expect(result.current?.error).toBe(undefined)

      // ログイン状態になる
      await waitForNextUpdate({ timeout: 3000 })
      expect(result.current.progress).toBe(false)
      expect(result.current?.loggedin).toBe(true)
      expect(result.current?.error).toBe(undefined)
    })
  })

  it('パスワードが短い場合はエラーを返す', async () => {
    await act(async () => {
      const { result, rerender, waitForNextUpdate } = renderHook(
        (payload: AuthParamType) => useLogin(payload.email, payload.password),
        {
          initialProps: initAuthParam,
          // @ts-ignore
          wrapper: RecoilRoot,
        }
      )

      // 初期状態
      await waitForNextUpdate({ timeout: 3000 })
      expect(result.current.progress).toBe(undefined)
      expect(result.current?.loggedin).toBe(false)
      expect(result.current?.error).toBe(undefined)

      // NG入力
      rerender(ngAuthParam)

      // 処理中になる
      expect(result.current.progress).toBe(true)
      expect(result.current?.loggedin).toBe(false)
      expect(result.current?.error).toBe(undefined)

      // エラーになる
      await waitForNextUpdate({ timeout: 3000 })
      expect(result.current.progress).toBe(false)
      expect(result.current?.loggedin).toBe(false)
      expect(result.current.error).toEqual('メールアドレスまたはパスワードが違います')
    })
  })
})
