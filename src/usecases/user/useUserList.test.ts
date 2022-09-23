import { RecoilRoot } from 'recoil'
import { renderHook } from '@testing-library/react-hooks'
import { act } from 'react-dom/test-utils'
import { useUserList } from './useUserList'

describe('useUserList UT', () => {
  it('初期状態確認', async () => {
    const { result } = renderHook(() => useUserList(), { wrapper: RecoilRoot })
    // 初期状態
    expect(result.current.columns.length).toBe(5)
    expect(result.current.columns[0].field).toEqual('id')
    expect(result.current.columns[1].field).toEqual('firstName')
    expect(result.current.columns[2].field).toEqual('lastName')
    expect(result.current.columns[3].field).toEqual('age')
    expect(result.current.columns[4].field).toEqual('fullName')
    expect(result.current.rows).toBe(undefined)
    expect(result.current.error).toBe(undefined)
    expect(result.current.loading).toBe(false)
  })

  it('全件検索で取得できる件数は９件', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useUserList(), { wrapper: RecoilRoot })

    // 検索条件としてname=''を設定する
    act(() => result.current?.setCondition(''))

    // 読み込み中
    expect(result.current.loading).toBe(true)

    // 読み込み後
    await waitForNextUpdate({ timeout: 3000 })
    expect(result.current.rows?.length).toBe(9)
    expect(result.current.loading).toBe(false)
  })

  it('jon検索で取得できる件数は1件', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useUserList(), { wrapper: RecoilRoot })

    // 検索条件としてname='jon'を設定する
    act(() => result.current?.setCondition('jon'))

    // 読み込み中
    expect(result.current.loading).toBe(true)

    // 読み込み後
    await waitForNextUpdate({ timeout: 3000 })
    expect(result.current.rows?.length).toBe(1)
    expect(result.current.loading).toBe(false)
  })

  it('ar検索で取得できる件数は4件', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useUserList(), { wrapper: RecoilRoot })

    // 検索条件としてname='ar'を設定する
    act(() => result.current?.setCondition('ar'))

    // 読み込み中
    expect(result.current.loading).toBe(true)

    // 読み込み後
    await waitForNextUpdate({ timeout: 3000 })
    expect(result.current.rows?.length).toBe(4)
    expect(result.current.loading).toBe(false)
  })
})
