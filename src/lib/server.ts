const NETWORK_DELAY_MS = 100

let serverItems = {
  type: 'h',
  axis: ['50%', '50%'],
  left: { type: 'c', text: 'Dialog 1', title: 'Dialog 1', id: 'd1' },
  right: {
    type: 'v',
    axis: ['50%', '50%'],
    top: { type: 'c', text: 'Dialog 2', title: 'Dialog 2', id: 'd2' },
    down: { type: 'c', text: 'Dialog 3', title: 'Dialog 3', id: 'd3' }
  }
}

export function loadPattern(key) {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      const PatternData = JSON.parse(localStorage.getItem(key))
      serverItems = { ...PatternData }
      resolve(PatternData)
    }, NETWORK_DELAY_MS)
  })
}

export function savePattern(newItems, SessionNum) {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      localStorage.setItem(`pattern${SessionNum}`, JSON.stringify(serverItems))
      resolve(serverItems)
    }, NETWORK_DELAY_MS)
  })
}

export function saveItemsToServer(newItems) {
  return new Promise((resolve) => {
    setTimeout(() => {
      serverItems = { ...newItems }
      resolve(newItems)
    }, NETWORK_DELAY_MS)
  })
}

export function getItemsFromServer() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ...serverItems })
    }, NETWORK_DELAY_MS)
  })
}
