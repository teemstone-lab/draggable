<script lange="ts">
import {dndzone} from 'svelte-dnd-action'
import {flip} from 'svelte/animate'
import { createEventDispatcher } from 'svelte'

export let paneObject
export let batch

let dlgHeight
let dlgWidth

const flipDurationMs = 200
let items = [ paneObject ]

const dispatch = createEventDispatcher()

function closeCallback() {
    dispatch('closeCallback', { obj: { ...paneObject }, flag: true, batch })
}

function divisionCallback() {
    dispatch('divisionCallback', { obj: { ...paneObject }, flag: true, dlgHeight, dlgWidth, batch })
}

function handleConsider(e) {
    items = e.detail.items
}

function handleFinalize(e) {
    items = e.detail.items    
    dispatch('updateCallback', { id: paneObject.id, items, dlgHeight, dlgWidth })
}
</script>

<section use:dndzone={{items, flipDurationMs}} on:consider={handleConsider} on:finalize={handleFinalize}>
{#each items as item (item.id)}
<div class="pane" name="dlgname" bind:clientHeight={dlgHeight} bind:clientWidth={dlgWidth} animate:flip={{duration:flipDurationMs}}>
    <div class="pane_topbar">
        <div>{item.title}</div>
        <div><button on:click={divisionCallback} class="division">Div</button><button on:click={closeCallback} class="closed">X</button></div>        
    </div>
    <div class="pane_container">
        <div class="pane_content">
            <h1>{item.text}</h1>
        </div>
    </div>
</div>
{/each}
</section>
