const NETWORK_DELAY_MS = 100
const CURRENT_KEY = 'CurrentPattern'
const HOSTNAME = 'http://localhost:8000'
const initPattern = {
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
let currentPattern: PatternType

interface PatternType {
  idx: number
  pattern: unknown
}

export function loadPattern(key) {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      fetch(`${HOSTNAME}/getPane/${key}`, {
        method: 'POST'
      })
        .then((response) => resolve(response.json()))
        .catch((error) => {
          console.log(error)
          resolve({})
        })
    }, NETWORK_DELAY_MS)
  })
}

export function savePattern(newItems, patternNumber) {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      const jsonStrItem = JSON.stringify(newItems)
      fetch(`${HOSTNAME}/setPane`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          number: patternNumber,
          data: jsonStrItem
        })
      })
        .then((response) => resolve(response))
        .catch((error) => {
          console.log(`save API Error: ${error}`)
        })
      resolve(currentPattern)
    }, NETWORK_DELAY_MS)
  })
}

export function setCurrentPattern(newPattern) {
  return new Promise((resolve) => {
    setTimeout(() => {
      currentPattern = { ...newPattern }
      localStorage.setItem(CURRENT_KEY, JSON.stringify(currentPattern))
      resolve(currentPattern)
    }, NETWORK_DELAY_MS)
  })
}

export function getCurrentPattern() {
  return new Promise<PatternType>((resolve) => {
    setTimeout(async () => {
      const lsData = localStorage.getItem(CURRENT_KEY)

      if (lsData) {
        const patternData = JSON.parse(lsData)
        currentPattern = { ...patternData }
      } else {
        currentPattern = {
          idx: 0,
          pattern: initPattern
        }
        await setCurrentPattern(currentPattern)
      }
      resolve(currentPattern)
    }, NETWORK_DELAY_MS)
  })
}

export function resetPattern(patternNumber) {
  return new Promise<PatternType>((resolve) => {
    setTimeout(() => {
      currentPattern = {
        idx: patternNumber,
        pattern: initPattern
      }
      resolve(currentPattern)
    }, NETWORK_DELAY_MS)
  })
}
