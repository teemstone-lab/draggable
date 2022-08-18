import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/svelte'
import App from '../App.svelte'

test('페이지 로드 시 SplitPane이 생성되어 있어야 함', () => {
  const results = render(App)
  expect(results.getAllByRole('dialog')).toBeTruthy()
})

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
  expect(beforeCount + 2).toEqual(AfterCount)
})

// test('Window Add Fail Test', async () => {
//   const results = render(App)

//   const addBtn = results.getByTestId('btnAddTest')
//   const beforeCount = results.getAllByRole('dialog').length
//   await userEvent.click(addBtn)
//   const AfterCount = results.getAllByRole('dialog').length
//   expect(beforeCount).toEqual(AfterCount) // 버튼을 클릭 하였으나 기존과 동일한 Count라면 Fail
// })

// test('Window Add Test', async () => {
//   const results = render(App)

//   const addBtn = results.getByTestId('btnAddTest')
//   const beforeCount = results.getAllByRole('dialog').length
//   await userEvent.click(addBtn)
//   const AfterCount = results.getAllByRole('dialog').length
//   expect(beforeCount + 1).toEqual(AfterCount)
// })

// test('Window Del Button Create Fail Test', async () => {
//   const results = render(App)
//   const addBtn = results.getByTestId('btnAddTest')
//   await userEvent.click(addBtn)
//   // const DlgCnt = results.getAllByRole('dialog').length - 2
//   const delBtnCnt = results.getAllByRole('button', { name: 'X' }).length

//   expect(delBtnCnt).toEqual(0)
// })

// test('Window Del Button Create Test', async () => {
//   const results = render(App)
//   const addBtn = results.getByTestId('btnAddTest')
//   await userEvent.click(addBtn)
//   // const DlgCnt = results.getAllByRole('dialog').length - 1
//   const delBtnCnt = results.getAllByRole('button', { name: 'X' }).length

//   expect(delBtnCnt).toEqual(1)
// })

// test('Window Del Fail Test', async () => {
//   const results = render(App)
//   const addBtn = results.getByTestId('btnAddTest')
//   await userEvent.click(addBtn)

//   if (results.getAllByRole('button').length > 0) {
//     const delBtn = results.getAllByRole('button')[0]
//     const beforeCount = results.getAllByRole('dialog').length
//     await userEvent.click(delBtn)
//     const AfterCount = results.getAllByRole('dialog').length
//     expect(beforeCount).toEqual(AfterCount)
//   }
// })

// test('Window Del Test', async () => {
//   const results = render(App)
//   const addBtn = results.getByTestId('btnAddTest')
//   await userEvent.click(addBtn)

//   if (results.getAllByRole('button').length > 0) {
//     const delBtn = results.getAllByRole('button')[0]
//     const beforeCount = results.getAllByRole('dialog').length
//     await userEvent.click(delBtn)
//     const AfterCount = results.getAllByRole('dialog').length
//     expect(beforeCount).toEqual(AfterCount - 1)
//   }
// })
