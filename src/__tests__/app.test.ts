import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/svelte'
import App from '../App.svelte'

test('페이지 로드 시 SplitPane이 생성되어 있어야 함', () => {
  render(App)
  expect(screen.findAllByRole('dialog')).toBeTruthy()
})

test('Dialog Add Test', async () => {
  render(App)

  const addBtn = await screen.findByTestId('btnAddTest')
  const beforeObjs = screen.getAllByRole('dialog')
  const beforeCount = beforeObjs.length

  await userEvent.click(addBtn)
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const afterObjs = screen.getAllByRole('dialog')
  const afterCount = afterObjs.length
  expect(beforeCount + 1).toEqual(afterCount)
})

test('Dialog Delete Test', async () => {
  render(App)

  const target = await screen.findAllByRole('button', { name: 'X' })
  const beforeObjs = screen.getAllByRole('dialog')
  const beforeCount = beforeObjs.length

  await userEvent.click(target[0])
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const afterObjs = screen.getAllByRole('dialog')
  const afterCount = afterObjs.length
  expect(beforeCount - 1).toEqual(afterCount)
})

test('Pattern Add Localstorage', async () => {
  const results = render(App)

  const addBtn = await results.findByTestId('btnAddPattern')
  const BtnBefore = await results.findAllByRole('button')
  let beforeCount = BtnBefore.length;
  await userEvent.click(addBtn)
  const BtnAfter = await results.findAllByRole('button')
  const afterCount = BtnAfter.length;
  expect(beforeCount).toEqual(afterCount)
})
