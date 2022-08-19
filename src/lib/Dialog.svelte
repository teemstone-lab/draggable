<script lange="ts">
import {createEventDispatcher } from 'svelte'

export let title
export let text

const dispatch = createEventDispatcher()

function closeWindow() {
    dispatch('closeWindow', { id: title })
}
</script>

<div role="dialog" draggable="true" class="pane">
    <div class="pane_topbar">
        <div>{title}</div>
        <div><button on:click={closeWindow} class="closed">X</button></div>        
    </div>
    <div class="pane_container">
        <div class="pane_content">
            <h1>{text}</h1>
        </div>
    </div>
</div>
