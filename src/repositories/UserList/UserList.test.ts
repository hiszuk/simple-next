import { User } from '@/@types/global'
import { getUsersByName } from './UserList'

describe('getUser UT', () => {
  it('全件取得する', async () => {
    const users: User[] | undefined = await getUsersByName('')
    expect(users?.length).toEqual(9)
  })

  it('名前指定で検索（１件）', async () => {
    const users: User[] | undefined = await getUsersByName('jon')
    expect(users?.length).toEqual(1)
  })

  it('名前指定で検索（0件）', async () => {
    const users: User[] | undefined = await getUsersByName('hoge')
    expect(users?.length).toEqual(0)
  })
})
