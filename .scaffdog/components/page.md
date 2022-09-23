---
name: 'components/page'
root: '.'
output: '.'
questions:
  name: 'コンポーネント名を入力 -> '
  title: 'pageのタイトルを入力 -> '
  description: 'pageの処理概要を入力 -> '
  url: 'ルーティングするURLを入力(ex: blog, blog/post[id]) -> '
---

# `src/components/page/{{ inputs.name | pascal }}/index.tsx`

```typescript
import type { NextPage } from 'next'
import Layout from '@/components/layout/DefaultLayout'
import { {{ inputs.name | pascal }} } from './{{ inputs.name | pascal }}'

const {{ inputs.name | pascal }}Page: NextPage = () => {
  return (
    <Layout title="{{ inputs.title }}">
      <{{ inputs.name | pascal }} />
    </Layout>
  )
}
export default {{ inputs.name | pascal }}Page
```

# `src/components/page/{{ inputs.name | pascal }}/{{ inputs.name | pascal }}.tsx`

```typescript
import React from 'react'

/** 
 * {{ inputs.description }}
 * @param
 * @result
 */
type Props = {}

export const {{ inputs.name | pascal }}: React.FC<Props> = () => {
  return (
    <div>{{ inputs.name }}</div>
  )
}
```

# `src/components/page/{{ inputs.name | pascal }}/{{ inputs.name | pascal }}.stories.tsx`

```typescript
import React from 'react'
import { Title, Subtitle, Description, Primary, ArgsTable, Stories, PRIMARY_STORY } from '@storybook/addon-docs'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { {{ inputs.name | pascal }} } from './{{ inputs.name | pascal }}'

export default {
  component: '{{ inputs.name | pascal }}',
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>{{ inputs.title }}</Subtitle>
          <Description>
            {{ inputs.description }}
          </Description>
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </>
      ),
    },
  },
} as unknown as ComponentMeta<typeof {{ inputs.name | pascal }}>

const Template: ComponentStory<typeof {{ inputs.name | pascal }}> = (args) => <{{ inputs.name | pascal }} {...args} />

export const Deafult = Template.bind({})
```

# `src/components/page/{{ inputs.name | pascal }}/{{ inputs.name | pascal }}.test.tsx`

```typescript
// eslint-disable-next-line import/order
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { {{ inputs.name | pascal }} } from './{{ inputs.name | pascal }}'

describe('{{ inputs.name | pascal }} UT', () => {
  it('{{ inputs.name | pascal }}がマウントされること', () => {
    render(<{{ inputs.name | pascal }} />)
    expect(screen.getByText('{{ inputs.name }}')).toBeInTheDocument()
  })
})
```

# `src/pages/{{ inputs.url }}.tsx`

```typescript
import {{ inputs.name | pascal }} from '@/components/page/{{ inputs.name | pascal }}'
// import WithAuth from '@/components/functional/WithAuth'

// 認証不要なページの場合
export default {{ inputs.name | pascal }}

// 認証が必要なページの場合
// export default WithAuth({{ inputs.name | pascal }})
```
