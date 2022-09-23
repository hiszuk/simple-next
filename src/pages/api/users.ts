import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import { User, UserErrorResponseType, UserResponseType } from '../../@types/global'

let Users: User[] = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
]

// CORS のミドルウェアを初期化
const cors = Cors({
  methods: ['GET', 'HEAD'],
})

// 後続の処理を行う前にミドルウェアの実行を待ち、
// また、ミドルウェアでエラーが発生したときエラーを投げるためのヘルパーメソッド
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse<UserResponseType>,
  fn: (arg0: NextApiRequest, arg1: NextApiResponse<UserResponseType>, arg2: (result: any) => void) => void
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }
      return resolve(result)
    })
  })
}

/**
 * @description ダミー用sleep関数 引数指定したミリ秒待つ
 * @param miliseconds
 * @returns Promise
 */
export async function sleep(miliseconds: number): Promise<void> {
  return new Promise((response) => {
    setTimeout(() => {
      response()
    }, miliseconds)
  })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<UserResponseType>) {
  await runMiddleware(req, res, cors)

  switch (req.method) {
    case 'GET':
      console.log('query', req.query)
      await sleep(2000)

      if (req.query.name) {
        const filterUser = Users.filter((rec) =>
          (rec.lastName + rec.firstName).toUpperCase().includes((req.query.name as string).toUpperCase())
        )
        res.status(200).json(filterUser)
        return
      }
      res.status(200).json(Users)
      return

    default:
      const error: UserErrorResponseType = {
        code: 'NO METHODS',
        message: 'There are no method in thi interface',
      }
      res.status(405).json(error)
      return
  }
}
