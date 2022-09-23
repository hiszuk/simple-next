import { composeStories } from '@storybook/react'
import { render } from '@testing-library/react'
import * as stories from './AppInput.stories'

const { Default, NoArgs } = composeStories(stories)

describe('AppInput UT', () => {
  it('引数ありのテスト', async () => {
    const { container } = render(<Default />)
    await stories.Default.play?.({ canvasElement: container } as any)
  })

  it('引数なしのテスト', async () => {
    const { container } = render(<NoArgs />)
    await stories.NoArgs.play?.({ canvasElement: container } as any)
  })
})
