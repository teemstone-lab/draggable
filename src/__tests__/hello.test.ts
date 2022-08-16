import { render } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'
import App from '../App.svelte'

test('Window Add Fail Test', async () => {
  const results = render(App)

  const addBtn = results.getByTestId('btnAddTest')
  const beforeCount = results.getAllByRole('dialog').length
  await userEvent.click(addBtn)
  const AfterCount = results.getAllByRole('dialog').length
  expect(beforeCount).toEqual(AfterCount) // 버튼을 클릭 하였으나 기존과 동일한 Count라면 Fail
})

test('Window Add Test', async () => {
  const results = render(App)

  const addBtn = results.getByTestId('btnAddTest')
  const beforeCount = results.getAllByRole('dialog').length
  await userEvent.click(addBtn)
  const AfterCount = results.getAllByRole('dialog').length
  expect(beforeCount + 1).toEqual(AfterCount)
})
