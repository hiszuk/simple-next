import { RecoilRoot } from 'recoil'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { LoginForm } from './LoginForm'

describe('LoginForm UT', () => {
  it('必須入力チェック', async () => {
    render(
      <RecoilRoot>
        <LoginForm />
      </RecoilRoot>
    )
    const email = screen.getByPlaceholderText('メールアドレスを入力してください')
    const password = screen.getByPlaceholderText('パスワードを入力してください')
    const button = screen.getByRole('button', { name: 'ログイン' })
    fireEvent.submit(button)

    await waitFor(() => {
      expect(screen.getAllByText('必須入力です').find((el) => el.id === 'email-helper-text')).toBeInTheDocument()
      expect(email).toHaveAttribute('aria-invalid', 'true')

      expect(screen.getAllByText('必須入力です').find((el) => el.id === 'password-helper-text')).toBeInTheDocument()
      expect(password).toHaveAttribute('aria-invalid', 'true')
    })
  })

  it('email書式チェック', async () => {
    render(
      <RecoilRoot>
        <LoginForm />
      </RecoilRoot>
    )
    const email = screen.getByPlaceholderText('メールアドレスを入力してください')
    const button = screen.getByRole('button', { name: 'ログイン' })
    fireEvent.input(email, { target: { value: 'abc' } })
    fireEvent.submit(button)

    await waitFor(() => {
      expect(screen.getByText('xxx@yyy.zzz形式で入力してください')).toBeInTheDocument()
      expect(email).toHaveAttribute('aria-invalid', 'true')
    })
  })

  it('入力欄への正常入力', () => {
    render(
      <RecoilRoot>
        <LoginForm />
      </RecoilRoot>
    )
    const email = screen.getByPlaceholderText('メールアドレスを入力してください')
    const password = screen.getByPlaceholderText('パスワードを入力してください')

    fireEvent.input(email, { target: { value: 'taro@test.com' } })
    fireEvent.input(password, { target: { value: '123' } })
    expect(email).toHaveValue('taro@test.com')
    expect(password).toHaveValue('123')
  })

  it('メールアドレス・パスワード組み合わせエラー', async () => {
    render(
      <RecoilRoot>
        <LoginForm />
      </RecoilRoot>
    )
    const email = screen.getByPlaceholderText('メールアドレスを入力してください')
    const password = screen.getByPlaceholderText('パスワードを入力してください')
    const button = screen.getByRole('button', { name: 'ログイン' })

    fireEvent.input(email, { target: { value: 'taro@test.com' } })
    fireEvent.input(password, { target: { value: '12' } })
    fireEvent.submit(button)
    waitFor(
      () => {
        expect(screen.getByText('メールアドレスまたはパスワードが違います')).toBeInTheDocument()
      },
      { timeout: 3000 }
    )
  })

  it('メールアドレス・パスワード入力、ログイン成功', async () => {
    render(
      <RecoilRoot>
        <LoginForm />
      </RecoilRoot>
    )
    const email = screen.getByPlaceholderText('メールアドレスを入力してください')
    const password = screen.getByPlaceholderText('パスワードを入力してください')
    const button = screen.getByRole('button', { name: 'ログイン' })

    fireEvent.input(email, { target: { value: 'taro@test.com' } })
    fireEvent.input(password, { target: { value: '123' } })
    fireEvent.submit(button)
    waitFor(
      () => {
        expect(screen.getByText('ログインに成功しました')).toBeInTheDocument()
      },
      { timeout: 3000 }
    )
  })
})
