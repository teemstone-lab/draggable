<script lang="ts">
   import {onMount} from 'svelte'

  import Topbar from './lib/Topbar.svelte'
  import SplitPane from './lib/SplitPane.svelte'

  let paneObject
  let LastPanaType = 'v'
  let LastNum : number

  onMount(() => {
    LastNum = 4
  });

  paneObject = {
    type: 'h',
    left: { type: 'c', text: 'Dialog 1', title: 'Dialog 1' },
    right: {
      type: 'v',
      top: {type: 'c', text: 'Dialog 2', title: 'Dialog 2'},
      down: { type: 'c', text: 'Dialog 3', title: 'Dialog 3' }
    }
  }

  function getRightTopWindow(SpliteObject){
		let ReturnValue;
		if(SpliteObject.type == 'c'){
			ReturnValue = SpliteObject
		}else if(SpliteObject.type == 'h'){
   				ReturnValue = getRightTopWindow(SpliteObject.right)
   			}else{
   				ReturnValue = getRightTopWindow(SpliteObject.top)
   			}
		return ReturnValue
	}

	function addDialog() {
		const RigtheTopWindow = getRightTopWindow(paneObject)
		if(LastPanaType == 'h'){
			RigtheTopWindow.type = 'v'
			RigtheTopWindow.top = {type: 'c', text: RigtheTopWindow.text, title: RigtheTopWindow.text}
			RigtheTopWindow.down = {type: 'c', text: `Dialog ${LastNum}`, title: `Dialog ${LastNum}`}
			
		}else{
			RigtheTopWindow.type = 'h'
			RigtheTopWindow.left = {type: 'c', text: RigtheTopWindow.text, title: RigtheTopWindow.text}
			RigtheTopWindow.right = {type: 'c', text: `Dialog ${LastNum}`, title: `Dialog ${LastNum}`}
		}
		LastPanaType = RigtheTopWindow.type
		LastNum += 1
		
		paneObject = paneObject
  }

  function closeWindow(e) {
    const windowId = e.detail.id
    console.log(windowId)
  }  
</script>

<main>
  <Topbar on:addDialog={addDialog}/>
  <div class="wrapper">
    <div class="pane_root">
      <SplitPane {paneObject} on:closeWindow={closeWindow} />
    </div>    
  </div>
</main>
