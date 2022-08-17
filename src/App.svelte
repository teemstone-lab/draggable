<script lang="ts">
  import {onMount} from 'svelte'
  
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

  const remove = (item) => {
    const newTracklist = items.filter((i) => i !== item);

    items = newTracklist;
  };

</script>

<main>
  <div>
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
  </div>
</main>

<style>
  .clsdialog {
    float: left;
    border: 1px solid #dbdbdb;
    margin: 2px;
    resize: both;
    width: 120px;
  }

  .list {
    background-color: white;
    border-radius: 4px;
    box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  }

  .list-item {
    display: block;
    padding: 0.5em 0em;
    width: 100%;
  }

  .contents {
    height: 80px;
    padding: 0.5em 0em;
    width: 100%;
    background-color: blanchedalmond;
  }

  .btn_Del{
    width: 20px;
    height: 20px;
    font-size: 2px;
    float: right;
  }
</style>