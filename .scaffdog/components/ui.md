---
name: 'components/ui'
root: '.'
output: 'src/components/ui'
questions:
  name: 'コンポーネント名を入力 -> '
  description: '処理概要を入力 -> '
---

# `{{ inputs.name | pascal }}/index.tsx`

```typescript
import { {{ inputs.name | pascal }} } from './{{ inputs.name | pascal }}'

export default {{ inputs.name | pascal }}
```

# `{{ inputs.name | pascal }}/{{ inputs.name | pascal }}.tsx`

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

# `{{ inputs.name | pascal }}/{{ inputs.name | pascal }}.stories.tsx`

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
          <Subtitle>{{ inputs.description }}</Subtitle>
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

# `{{ inputs.name | pascal }}/{{ inputs.name | pascal }}.test.tsx`

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