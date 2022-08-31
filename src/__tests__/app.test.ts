import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/svelte'
import App from '../App.svelte'

test('페이지 로드 시 SplitPane이 생성되어 있어야 함', () => {
  const results = render(App)
  expect(results.findAllByRole('listitem')).toBeTruthy()
})

test('Dialog Add Test(Code modification is needed)', async () => {
  const results = render(App)

  const addBtn = await results.findByTestId('btnAddTest')
  const beforeObjs = await results.findAllByRole('listitem')
  const beforeCount = beforeObjs.length
  await userEvent.click(addBtn)
  const afterObjs = await results.findAllByRole('listitem')
  const afterCount = afterObjs.length
  expect(beforeCount).toEqual(afterCount)
})

test('Dialog Delete Test', async () => {
  const results = render(App)

  const target = await results.findAllByRole('button', { name: 'X' })
  const beforeObjs = await results.findAllByRole('listitem')
  const beforeCount = beforeObjs.length
  await userEvent.click(target[0])
  const afterObjs = await results.findAllByRole('listitem')
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
