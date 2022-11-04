<script lang="ts">
  import { onMount } from 'svelte';
  import Topbar from './layout/topbar/Topbar.svelte'
  import SplitPane from './layout/pane/SplitPane.svelte'
  import { getCurrentPattern, setCurrentPattern, savePattern, loadPattern, resetPattern, setInitPattern } from './lib/server'

  let paneIndex = -1
  let currentPattern = getCurrentPattern()
  let tempPattern
  let patternArray = []
  const patternCount = 5

  let LastPanaType = 'v'
  let LastNum = 4  

  onMount(async () => {
    tempPattern = currentPattern
    const ptnData = await currentPattern
    paneIndex = ptnData.idx
    fnInitPattern()
  })

  async function fnInitPattern() {
    try {
      patternArray = await Promise.all(
        Array.from({length:patternCount}, (_,i)=>i).map(async (i) => {
          const pattern = await loadPattern(i)
          const newPattern = {
            idx: i,
            pattern
          }
          await setInitPattern(newPattern)
          return newPattern.pattern
        })
      )      
    } catch {
      alert('Pattern Init Fail!!')
    }
  }

  function getRightTopWindow(SplitObject){
		let ReturnValue
    
		if (SplitObject.type == 'c') {
			ReturnValue = SplitObject
		} else if (SplitObject.type == 'h') {
			ReturnValue = getRightTopWindow(SplitObject.right)
		} else {
      ReturnValue = getRightTopWindow(SplitObject.top)
    }
		return ReturnValue
	}

	async function addDialog() {
    const ptnData = await currentPattern

		const rightTopWindow = getRightTopWindow(ptnData.pattern)
		if (LastPanaType == 'h') {
			rightTopWindow.type = 'v'
      rightTopWindow.axis = ['50%', '50%']
			rightTopWindow.top = {type: 'c', text: rightTopWindow.text, title: rightTopWindow.text, id: rightTopWindow.id}
			rightTopWindow.down = {type: 'c', text: `Dialog ${LastNum}`, title: `Dialog ${LastNum}`, id: `d${LastNum}`}
			
		} else {
			rightTopWindow.type = 'h'
      rightTopWindow.axis = ['50%', '50%']
			rightTopWindow.left = {type: 'c', text: rightTopWindow.text, title: rightTopWindow.text, id: rightTopWindow.id}
			rightTopWindow.right = {type: 'c', text: `Dialog ${LastNum}`, title: `Dialog ${LastNum}`, id: `d${LastNum}`}
		}
		LastPanaType = rightTopWindow.type
		LastNum += 1
    
    const pattern = {
      idx: paneIndex,
      pattern: ptnData.pattern
    }

    await setCurrentPattern(pattern)
    currentPattern = Promise.resolve(pattern)
  }

  async function fnResetPattern() {
    currentPattern = resetPattern(paneIndex)
    const obj = await currentPattern
    await setCurrentPattern({
      idx: paneIndex,
      pattern: obj.pattern
    })
  }

  async function handleUpdate(e) {
    const { obj, completion, source } = e.detail
    const pattern = {
      idx: paneIndex,
      pattern: obj
    }

    if (completion) {
      await setCurrentPattern(pattern)
      currentPattern = Promise.resolve(pattern)
      tempPattern = Promise.resolve(pattern)
    } else if (source === "Close") {
      await setCurrentPattern(pattern)
      currentPattern = Promise.resolve(pattern)
    } else if (source === "Drag") {
      // Rollback
      currentPattern = Promise.resolve(tempPattern)
    }

  }

  async function fnloadPattern(key) {
    paneIndex = key
    const ptnData = await currentPattern

    try {
      const pattern = await loadPattern(key)
      const newPattern = {
        idx: key,
        pattern
      }
      currentPattern = Promise.resolve(newPattern)
      await setCurrentPattern(newPattern)
    } catch {
      await savePattern(ptnData.pattern, key)
    }
  }

  async function fnsavePattern() {
    const ptnData = await currentPattern
    await savePattern(ptnData.pattern, paneIndex)
    patternArray[paneIndex] = ptnData.pattern
  }

</script>

<main>
  {#await patternArray then pArray}
  <Topbar patternArray={pArray} {patternCount} {addDialog} {fnResetPattern} {fnloadPattern} {fnsavePattern} {paneIndex} />
  {/await}
  {#await currentPattern then promisePattern}
  <div id="pane_wrapper" class="wrapper">
    <div class="pane_root">
      <SplitPane
        paneObject={promisePattern.pattern}
        batch="all"
        on:paneUpdateCallback={handleUpdate} 
        bind:LastNum
      />
    </div>    
  </div>
  {/await}
</main>
