import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/svelte'
import App from '../App.svelte'

test('페이지 로드 시 SplitPane이 생성되어 있어야 함', () => {
  const results = render(App)
  expect(results.getAllByRole('dialog')).toBeTruthy()
})

test('Dialog Add Test', async () => {
  const results = render(App)

  const addBtn = results.getByTestId('btnAddTest')
  const beforeCount = results.getAllByRole('dialog').length
  await userEvent.click(addBtn)
  const AfterCount = results.getAllByRole('dialog').length
  expect(beforeCount + 1).toEqual(AfterCount)
})

test('Dialog Delete Test', async () => {
  const results = render(App)
  const target = results.getAllByRole('button', { name: 'X' })[0]
  const beforeWindowCount = results.getAllByRole('dialog').length
  await userEvent.click(target)
  const afterWindowCount = results.getAllByRole('dialog').length
  expect(beforeWindowCount - 1).toEqual(afterWindowCount)
})
