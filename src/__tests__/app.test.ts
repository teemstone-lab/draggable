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
  await new Promise((resolve) => setTimeout(resolve, 1000))

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

test('Dialog Split Test', async () => {
  render(App)

  const target = await screen.findAllByRole('button', { name: 'Div' })
  const beforeObjs = screen.getAllByRole('dialog')
  const beforeCount = beforeObjs.length

  await userEvent.click(target[0])
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const afterObjs = screen.getAllByRole('dialog')
  const afterCount = afterObjs.length
  expect(beforeCount + 1).toEqual(afterCount)
})

test('Pattern Add Localstorage', async () => {
  const results = render(App)

  const addBtn = await results.findByTestId('btnAddPattern')
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const BtnBefore = results.getAllByRole('button')
  const beforeCount = BtnBefore.length

  await userEvent.click(addBtn)
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const BtnAfter = results.getAllByRole('button')
  const afterCount = BtnAfter.length
  expect(beforeCount + 1).toEqual(afterCount)
})

// Drag는 솔직히 Testing Case를 만드는 시간 자체가 더 오래 걸릴 것 같음..
