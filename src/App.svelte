<script lang="ts">
  import { onMount } from 'svelte';
  import Topbar from './layout/Topbar.svelte'
  import SplitPane from './lib/SplitPane.svelte'
  import { getCurrentPattern, saveCurrentPattern, savePattern, loadPattern, resetPattern, loadPatternCount} from './lib/server'

  let paneObject = getCurrentPattern()
  let tempPaneObject = getCurrentPattern()
  let LastPanaType = 'v'
  let LastNum = 4
  let patternCount = 0

  onMount(async () => {
    try {
      const cntResponse = await loadPatternCount()
      patternCount = parseInt(cntResponse as string, 10)
    } catch {
      patternCount = 0
    }
  })

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
    const newObject = await getCurrentPattern()

		const RightTopWindow = getRightTopWindow(newObject)
		if (LastPanaType == 'h') {
			RightTopWindow.type = 'v'
      RightTopWindow.axis = ['50%', '50%']
			RightTopWindow.top = {type: 'c', text: RightTopWindow.text, title: RightTopWindow.text, id: RightTopWindow.id}
			RightTopWindow.down = {type: 'c', text: `Dialog ${LastNum}`, title: `Dialog ${LastNum}`, id: `d${LastNum}`}
			
		} else {
			RightTopWindow.type = 'h'
      RightTopWindow.axis = ['50%', '50%']
			RightTopWindow.left = {type: 'c', text: RightTopWindow.text, title: RightTopWindow.text, id: RightTopWindow.id}
			RightTopWindow.right = {type: 'c', text: `Dialog ${LastNum}`, title: `Dialog ${LastNum}`, id: `d${LastNum}`}
		}
		LastPanaType = RightTopWindow.type
		LastNum += 1
    
    await saveCurrentPattern(newObject)    
    paneObject = Promise.resolve(newObject)
  }

  async function fnResetPattern() {
    paneObject = resetPattern()
    const obj = await paneObject
    await saveCurrentPattern(obj)
  }

  async function fnsavePattern() {
    const obj = await paneObject
    await savePattern(obj, patternCount)
    patternCount += 1
  }

  async function handleUpdate(e) {
    const { obj, completion, source } = e.detail

    if (completion) {
      await saveCurrentPattern(obj)
      paneObject = Promise.resolve(obj)
      tempPaneObject = { ...obj }
    } else if (source === "Close") {
      await saveCurrentPattern(obj)
      paneObject = Promise.resolve(obj)
    } else if (source === "Drag") {
      // Rollback
      paneObject = Promise.resolve(tempPaneObject)
    }

  }

  function fnloadPattern(key) {
    paneObject = loadPattern(key)
  }

</script>

<main>
  <!-- {#await localStorageLength then updatedLength} -->
  <Topbar {addDialog} {fnResetPattern} {fnloadPattern} {fnsavePattern} {patternCount}/>
  <!-- {/await} -->
  {#await paneObject then promiseObject}
  <div id="pane_wrapper" class="wrapper">
    <div class="pane_root">
      <SplitPane
        paneObject={promiseObject}
        batch="all"
        on:paneUpdateCallback={handleUpdate} 
        bind:LastNum
      />
    </div>    
  </div>
  {/await}
</main>
