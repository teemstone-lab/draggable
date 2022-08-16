<script lang="ts">
  import {onMount} from 'svelte'

  import Topbar from './lib/Topbar.svelte'
  import Panel from './lib/Panel.svelte'
  
  let items = null
  let idVal = 0

  onMount(() => {
    items = [{ id: idVal, text: `Item ${idVal}` }]
    idVal+= 1 
  });

  function addDialog() {
    if (items != null) {
      const newTracklist = items
      newTracklist.push({ id: idVal, text: `Item ${idVal}` })
      items = newTracklist
    } else {
      items = [{ id: idVal, text: `Item ${idVal}`}]
    }
    idVal+= 1
  }
</script>

<main>
  <Topbar />
  <Panel />
  <div>
    <button on:click={addDialog} name="btnAdd" data-testid="btnAddTest">Add</button>
  </div>
  <div class="list" name="dlgList">
    {#if items != null}
      {#each items as item, index (item.id)}
      <div class="clsdialog" role="dialog">
          <div class="list-item">
            Title
          </div>
          <div class="contents" >
            {item.text}
          </div>
      </div>
      {/each}
    {/if}
  </div>
</main>
