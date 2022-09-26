<script lang="ts">
  import svelteLogo from '../assets/svelte.svg'
  
  export let addDialog
  export let fnResetPattern
  export let fnloadPattern
  export let fnsavePattern
  export let paneIndex
  
  const patternCount = 5
  const PatternList = []
  let pidx = -1

  for(let i = 0; i < patternCount; i += 1 ){
    PatternList.push({
      num: i,
      active: false
    })
  }    

  function updatePatternList(idx) {
    if (pidx > -1) PatternList[pidx].active = false
    if (idx > -1) PatternList[idx].active = true
    pidx = idx
  }

  $: updatePatternList(paneIndex)

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
        {#each PatternList as item (item.num)}
            <input type="button" value={item.num} on:click={fnloadPattern(item.num)} class:activeButton={item.active}/>
        {/each}
    </div>
</div>

<style>
  input { 
    cursor: pointer;
  }

  .activeButton {
    background: #0000AA;
    color: #FFF;
    cursor: initial;
  }
</style>