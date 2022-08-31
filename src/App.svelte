<script lang="ts">
  import { onMount } from 'svelte';
  import Topbar from './layout/Topbar.svelte'
  import SplitPane from './lib/SplitPane.svelte'
  import { getItemsFromServer, saveItemsToServer, savePattern, loadPattern} from './lib/server'

  let paneObject = getItemsFromServer()
  let tempPaneObject = getItemsFromServer()
  let LastPanaType = 'v'
  let LastNum = 4
  let SessionNum 

  onMount(() => {
    if(localStorage.length === 0){
      SessionNum = 0;
    }else{
      SessionNum = localStorage.length;
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
    const newObject = await getItemsFromServer()

		const RightTopWindow = getRightTopWindow(newObject)
		if (LastPanaType == 'h') {
			RightTopWindow.type = 'v'
			RightTopWindow.top = {type: 'c', text: RightTopWindow.text, title: RightTopWindow.text, id: RightTopWindow.id}
			RightTopWindow.down = {type: 'c', text: `Dialog ${LastNum}`, title: `Dialog ${LastNum}`, id: `d${LastNum}`}
			
		} else {
			RightTopWindow.type = 'h'
			RightTopWindow.left = {type: 'c', text: RightTopWindow.text, title: RightTopWindow.text, id: RightTopWindow.id}
			RightTopWindow.right = {type: 'c', text: `Dialog ${LastNum}`, title: `Dialog ${LastNum}`, id: `d${LastNum}`}
		}
		LastPanaType = RightTopWindow.type
		LastNum += 1
    
    await saveItemsToServer(newObject)    
    paneObject = newObject
  }

  async function fnsavePattern() {
    await savePattern(paneObject, SessionNum)
    SessionNum += 1
    paneObject = getItemsFromServer()
  }

  async function handleUpdate(e) {
    const { obj, completion } = e.detail
    await saveItemsToServer(obj)

    paneObject = obj
    if (completion) tempPaneObject = { ...obj }
  }

  async function handleDrag(e) {
    const { obj, completion } = e.detail

    if (completion) {
      await saveItemsToServer(obj)
      paneObject = obj
      tempPaneObject = { ...obj }
    } else {
      // Rollback
      paneObject = tempPaneObject
    }
  }

  function fnloadPattern(key) {
    paneObject = loadPattern(key)
  }
</script>

<main>
  {#await paneObject then promiseObject}
  <Topbar {addDialog} {fnloadPattern} {fnsavePattern}/>
  <div id="pane_wrapper" class="wrapper">
    <div class="pane_root">
      <SplitPane
        paneObject={promiseObject}
        batch="all"
        on:closeCallback={handleUpdate} 
        on:divisionCallback={handleUpdate}
        on:dragCallback={handleDrag}
        bind:LastNum  
      />
    </div>    
  </div>
  {/await}
</main>
