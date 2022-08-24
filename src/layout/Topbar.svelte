<script lang="ts">
  import {createEventDispatcher } from 'svelte'
  import svelteLogo from '../assets/svelte.svg'

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
</div>