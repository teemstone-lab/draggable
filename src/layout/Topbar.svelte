<script lang="ts">
  import svelteLogo from '../assets/svelte.svg'
  
  export let addDialog
  export let fnResetPattern
  export let fnloadPattern
  export let fnsavePattern
  export let patternCount 
  
  let PatternList = []

  function updatePatternList(ll) {
    PatternList = []
    for(let i = 0; i < ll; i += 1 ){
      PatternList.push({num: i, key: `pattern${i}`})
    }
  }

  $: updatePatternList(patternCount)

</script>

<div class="topbar">
    <div class="topbar_elements">
        <a href="https://svelte.dev" target="_blank">
            <img src={svelteLogo} alt="Svelte Logo" />
        </a>      
    </div>
    <div class="topbar_elements">
        <input type="button" value="Dialog Add" on:click={addDialog} data-testid="btnAddTest"/>
        <input type="button" value="Reset" on:click={fnResetPattern} data-testid="btnResetPattern"/>
        &nbsp&nbsp&nbsp|  &nbsp&nbsp Pattern &nbsp
        <input type="button" value="Save" on:click={fnsavePattern} data-testid="btnAddPattern"/>
        &nbsp
        {#each PatternList as item, idx (item.num)}
            <input type="button" value={item.num} on:click={fnloadPattern(item.key)}/>
        {/each}
    </div>
</div>