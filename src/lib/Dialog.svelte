<script lange="ts">
import {createEventDispatcher } from 'svelte'

export let paneObject
let dlgHeight
let dlgWdith

const dispatch = createEventDispatcher()

function closeWindow() {
    dispatch('closeWindow', { id: paneObject.title, val:0  })
}

function divisionWindow() {
    dispatch('closeWindow', { id: paneObject.title, val:1, Height:dlgHeight, Width:dlgWdith  })
}
</script>

<div role="dialog" draggable="true" class="pane" name="dlgname" bind:clientHeight={dlgHeight} bind:clientWidth={dlgWdith}>
    <div class="pane_topbar">
        <div>{paneObject.title}</div>
        <div><button on:click={divisionWindow}>Div</button></div>  
        <div><button on:click={closeWindow} class="closed">X</button></div>        
    </div>
    <div class="pane_container">
        <div class="pane_content">
            <h1>{paneObject.text}</h1>
        </div>
    </div>
</div>
