// eslint-disable-next-line import/order
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { AppButton } from './AppButton'

describe('Button UT', () => {
  it('ボタンが表示される', () => {
    render(<AppButton>Test</AppButton>)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })

  it('ボタンラベル表示される', () => {
    render(<AppButton>Test</AppButton>)
    expect(screen.getByText('Test').textContent).toEqual('Test')
  })

  it('onClickイベントが発火する', () => {
    const handleClick = jest.fn()
    render(<AppButton onClick={handleClick}>Test</AppButton>)

    fireEvent.click(screen.getByText('Test'))
    expect(handleClick).toHaveBeenCalled()
  })
})
