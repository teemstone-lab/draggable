const NETWORK_DELAY_MS = 100
const CURRENT_KEY = 'CurrentPattern'
const HOSTNAME = 'http://localhost:8000'
const initServerItems = {
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
let serverItems

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
      const jsonStrItem = JSON.stringify(newItems)
      fetch(`${HOSTNAME}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          number: SessionNum,
          data: jsonStrItem
        })
      })
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(`save API Error: ${error}`)
        })
      resolve(serverItems)
    }, NETWORK_DELAY_MS)
  })
}

export function saveCurrentPattern(newItems) {
  return new Promise((resolve) => {
    setTimeout(() => {
      serverItems = { ...newItems }
      localStorage.setItem(CURRENT_KEY, JSON.stringify(serverItems))
      resolve(newItems)
    }, NETWORK_DELAY_MS)
  })
}

export function getCurrentPattern() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const lsData = localStorage.getItem(CURRENT_KEY)

      if (lsData) {
        const PatternData = JSON.parse(lsData)
        serverItems = { ...PatternData }
      } else {
        serverItems = { ...initServerItems }
      }
      resolve(serverItems)
    }, NETWORK_DELAY_MS)
  })
}

export function resetPattern() {
  return new Promise((resolve) => {
    setTimeout(() => {
      serverItems = { ...initServerItems }
      resolve(serverItems)
    }, NETWORK_DELAY_MS)
  })
}
