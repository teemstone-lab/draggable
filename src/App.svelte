<script lang="ts">
  import Topbar from './layout/Topbar.svelte'
  import SplitPane from './lib/SplitPane.svelte'
  import { getItemsFromServer, saveItemsToServer } from './lib/server'

  let paneObject = getItemsFromServer()
  let LastPanaType = 'v'
  let LastNum = 4

  function getRightTopWindow(SplitObject){
		let ReturnValue;
		if (SplitObject.type == 'c') {
			ReturnValue = SplitObject
		} else if(SplitObject.type == 'h') {
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
  }

  async function updateElement(e) {
    const { obj } = e.detail
    paneObject = obj
    await saveItemsToServer(obj)
  }
</script>

<main>
  {#await paneObject}
  <h1>Fetching objects..</h1>
  {:then paneObject}
  <Topbar {addDialog} />
  <div id="pane_wrapper" class="wrapper">
    <div class="pane_root">
      <SplitPane 
        {paneObject}
        batch="all"
        on:closeCallback={updateElement} 
        on:divisionCallback={updateElement}
        bind:LastNum  
      />
    </div>    
  </div>
  {/await}
</main>
