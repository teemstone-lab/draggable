import { render } from '@testing-library/svelte'
import App from '../App.svelte'

test('testtest', () => {
  const results = render(App)

  expect(() => results.getByText('Vite + Svelte')).not.toThrow()
})
