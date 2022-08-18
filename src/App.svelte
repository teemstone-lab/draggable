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
    left: {
      type: 'c',
      text: 'Dialog 1'
    },
    right: {
      type: 'v',
      top: {type: 'c', text: 'Dialog 2'},
      down: { type: 'c', text: 'Dialog 3' }
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
			RigtheTopWindow.top = {type: 'c', text: RigtheTopWindow.text}
			RigtheTopWindow.down = {type: 'c', text: `Dialog  ${LastNum}`}
			
		}else{
			RigtheTopWindow.type = 'h'
			RigtheTopWindow.left = {type: 'c', text: RigtheTopWindow.text}
			RigtheTopWindow.right = {type: 'c', text: `Dialog  ${LastNum}`}
		}
		LastPanaType = RigtheTopWindow.type

		LastNum += 1
		
		paneObject = paneObject
  }
  // let items = null
  // let idVal = 0

  // onMount(() => {
  //   items = [{ id: idVal, text: `Item ${idVal}` }]
  //   idVal+= 1 
  // });

  // function addDialog() {
  //   if (items != null) {
  //     const newTracklist = items
  //     newTracklist.push({ id: idVal, text: `Item ${idVal}` })
  //     items = newTracklist
  //   } else {
  //     items = [{ id: idVal, text: `Item ${idVal}`}]
  //   }
  //   idVal+= 1
  // }

  // const remove = (item) => {
  //   const newTracklist = items.filter((i) => i !== item);

  //   items = newTracklist;
  // };

</script>

<main>
  <Topbar />
  <p style="width: 800px;">Splite Test</p>
	<input type="button" value="Win Add" on:click={addDialog} data-testid="btnAddTest"/>
  <div class="wrapper">
    <SplitPane {paneObject}/>
  </div>
  <!-- <div>
    <button on:click={addDialog} name="btnAdd">Add</button>
  </div>
  <div class="list" name="dlgList">
    {#if items != null}
      {#each items as item, index (item.id)}
      <div class="clsdialog" >
          <div class="list-item">
            Title
            {#if item.id != 0}
              <input type="button" on:click={() => remove(item)} class="btn_Del" role="button" value="X"/>
            {/if}
          </div>
          <div class="contents" >
            {item.text}
          </div>
      </div>
      {/each}
    {/if}
  </div> -->
</main>

<style>
  div.wrapper {
    display: block;
    width: 100%;
    height: 100vh;
    margin: auto;
    background: #ffff00;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
  }  
</style>
