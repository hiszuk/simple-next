import { User } from '@/@types/global'
import axios from 'axios'

const baseUrl = 'http://localhost:3000/api'

/**
 * nameで指定された名前に部分一致するユーザーリストを戻す
 * @param name
 * @returns User[]
 */
export async function getUsersByName(name: string | undefined): Promise<User[] | undefined> {
  axios.defaults.baseURL = baseUrl
  try {
    if (name !== undefined) {
      const result = await axios({
        method: 'GET',
        url: `/users?name=${name}`,
      })
      if (result.status === 200) return result.data
      else throw new Error(`${result.status}:${result.statusText}`)
    }
  } catch (error) {
    throw new Error(error as any)
  }
}
