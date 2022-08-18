<script lang="ts">
  // import {onMount} from 'svelte'

  import Topbar from './lib/Topbar.svelte'
  import SplitPane from './lib/SplitPane.svelte'

  let paneObject
  
  paneObject = {
    type: 'h',
    left: {
      type: 'v',
      top: {
        type: 'h',
        left: { type: 'c', text: 'Dialog1' },
        right: { type: 'c', text: 'Dialog2' }
      },
      down: { type: 'c', text: 'Dialog3' }
    },
    right: {
      type: 'h',
      left: { 
        type: 'v',
        top: { type: 'c', text: 'Dialog4' },
        down: { type: 'c', text: 'Dialog5' }
      },
      right: { type: 'c', text: 'Dialog6' }
    }
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
  <div class="wrapper">
    <SplitPane {paneObject}/>
  </div>
  <!-- <div>
    <button on:click={addDialog} name="btnAdd" data-testid="btnAddTest">Add</button>
  </div>
  <div class="list" name="dlgList">
    {#if items != null}
      {#each items as item, index (item.id)}
      <div class="clsdialog" role="dialog">
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
  }  
</style>
