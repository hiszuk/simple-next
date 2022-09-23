import { login } from './Login'

describe('Login UT', () => {
  it('取得成功パターン', async () => {
    const result: any = await login('hoge@abc.com', 'abc')
    expect(result.name).toEqual('テストユーザー')
  })

  it('エラーパターン', async () => {
    let errorMessage = ''
    try {
      await login('hoge@abc.com', 'a')
    } catch (err: any) {
      errorMessage = err.error
    }
    expect(errorMessage).toEqual('メールアドレスまたはパスワードが違います')
  })
})
