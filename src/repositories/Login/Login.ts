import { sleep } from '@/pages/api/users'

/**
 * ユーザー名取得
 * @returns string
 */
export function login(email: string, password: string) {
  return new Promise(async (resolve, reject) => {
    await sleep(2000)
    if (password.length < 3) reject({ error: 'メールアドレスまたはパスワードが違います' })
    else {
      // console.log('loggedin: ', email, password)
      resolve({
        name: 'テストユーザー',
      })
    }
  })
}
