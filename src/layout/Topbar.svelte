<script lang="ts">
  import {createEventDispatcher } from 'svelte'
  import svelteLogo from '../assets/svelte.svg'

  export let controlVars
  const dispatch = createEventDispatcher()

  function addDialog() {
    dispatch('addDialog')
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
    </div>
    <div class="topbar_elements">
        {controlVars.hovering}
    </div>
    <div class="topbar_elements">
        {controlVars.targetPane}
    </div>
</div>