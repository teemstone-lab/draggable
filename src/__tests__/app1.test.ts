import { render } from '@testing-library/svelte'
import App from '../App.svelte'

test('페이지 로드 시 창을 놓을 수 있는 공간이 존재해야 함', () => {
  const results = render(App)
  expect(results.getByRole('grid')).toBeTruthy()
})
