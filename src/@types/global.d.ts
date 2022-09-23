/**
 * @description API 仕様
 */

export type User = {
  id: number
  lastName: string
  firstName?: string | null
  age?: number | null
}

export type UserErrorResponseType = {
  code: string
  message?: string | undefined
}

export type UserResponseType = User[] | User | UserErrorResponseType | string | null

export type UserInfo = {
  email: string
  name?: string | undefined
  isLoggedIn: boolean
}
