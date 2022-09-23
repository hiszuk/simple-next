---
name: 'hooks/setState'
root: '.'
output: 'src/usecases'
questions:
  name: 'カスタムフック名を入力 -> '
---

# `{{ inputs.name }}.ts`

```typescript
import React from 'react'

export const {{ inputs.name }} = () => {
  const [state, setState] = React.useState<string>('')
  const setter = React.useCallback((value: string) => {setState(value)}, [setState])

  return {
    state,
    setState: setter
  }
}
```

# `{{ inputs.name }}.test.ts`

```typescript
import { renderHook } from '@testing-library/react-hooks'
import { act } from 'react-dom/test-utils'
import { {{ inputs.name }} } from './{{ inputs.name }}'

describe('{{ inputs.name }} UT', () => {
  it('セットした値が読み取れること', async () => {
    const { result } = renderHook(() => {{ inputs.name }}())

    // 初期値を読み込む
    expect(result.current.state).toEqual('')

    // 状態に値をセットする
    act(() => result.current.setState('test'))

    // 入力内容と同じことを確認する
    expect(result.current.state).toEqual('test')
  })
})
```
