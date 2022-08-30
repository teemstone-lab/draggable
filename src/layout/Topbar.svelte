<script lang="ts">
  import svelteLogo from '../assets/svelte.svg'
  
  export let addDialog
  export let fnloadPattern
  export let fnsavePattern

  const localStorageLength = localStorage.length
  const PatternList = [
  ]

  for(let i = 0; i < localStorageLength; i += 1 ){
    PatternList.push({num: i, key: `pattern${i}`})
  }
</script>

<div class="topbar">
    <div class="topbar_elements">
        <a href="https://svelte.dev" target="_blank">
            <img src={svelteLogo} alt="Svelte Logo" />
        </a>      
    </div>
    <div class="topbar_elements">
        <input type="button" value="Dialog Add" on:click={addDialog} data-testid="btnAddTest"/>
        &nbsp&nbsp&nbsp|  &nbsp&nbsp Pattern &nbsp
        <input type="button" value="Save" on:click={fnsavePattern}/>
        &nbsp
        {#each PatternList as item, idx (item.num)}
            <input type="button" value={item.num} on:click={fnloadPattern(item.key)}/>
        {/each}
    </div>
</div>