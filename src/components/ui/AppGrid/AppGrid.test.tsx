import { composeStories } from '@storybook/react'
import { render } from '@testing-library/react'
import * as stories from './AppGrid.stories'

// @ts-expect-error
const { Default, Loading, GotData } = composeStories(stories)

describe('Grid UT', () => {
  it('空の状態が表示できる', async () => {
    const { container } = render(Default())
    await stories.Default.play?.({ canvasElement: container } as any)
  })

  it('ロード中が表示される', async () => {
    const { container } = render(Loading())
    await stories.Loading.play?.({ canvasElement: container } as any)
  })

  it('3行表示された内容が正しい', async () => {
    const { container } = render(GotData())
    await stories.GotData.play?.({ canvasElement: container } as any)
  })
})
