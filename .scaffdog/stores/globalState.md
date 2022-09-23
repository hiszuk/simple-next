---
name: 'stores/globalState'
root: '.'
output: 'src/stores'
questions:
  name: 'state名を入力 -> '
---

# `{{ inputs.name }}.ts`

```typescript
import React from 'react'
import { atom, useRecoilValue, useSetRecoilState } from 'recoil'

export type {{ inputs.name | pascal }}Type =
  | {
    value?: string | undefined
  }
  | undefined

const {{ inputs.name }} = atom<{{ inputs.name | pascal }}Type>({
  key: '{{ inputs.name }}',
  default: undefined,
})

export const use{{ inputs.name | pascal }} = () => {
  return useRecoilValue({{ inputs.name }})
}

export const use{{ inputs.name | pascal }}Mutators = () => {
  const set = useSetRecoilState({{ inputs.name }})

  const setState = React.useCallback((state: {{ inputs.name | pascal }}Type) => set(state), [set])
  return { setState }
}
```

# `{{ inputs.name }}.test.ts`

```typescript
import { RecoilRoot } from 'recoil'
import { renderHook } from '@testing-library/react-hooks'
import { act } from 'react-dom/test-utils'
import { use{{ inputs.name | pascal }}, use{{ inputs.name | pascal }}Mutators } from './{{ inputs.name }}'

describe('{{ inputs.name }} UT', () => {
  it('セットした値が読み取れること', async () => {
    const { result } = renderHook(() => ({
      set: use{{ inputs.name | pascal }}Mutators(),
      state: use{{ inputs.name | pascal }}()
    }), {
      wrapper: RecoilRoot
    })

    // 初期値を読み込む
    expect(result.current.state?.value).toBe(undefined)

    // recoilの状態のvalueに値をセットする
    act(() => result.current.set.setState({ value: 'test' }))
    expect(result.current.state?.value).toEqual('test')
  })
})
```
