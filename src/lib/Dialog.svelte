<script lange="ts">
// @ts-nocheck

import {dndzone} from 'svelte-dnd-action'
import {flip} from 'svelte/animate'
import { createEventDispatcher } from 'svelte'

export let paneObject
export let controlVars

let mouseX
let mouseY
let dialogWidth
let dialogHeight
let dragObject
let dragTarget

const flipDurationMs = 200
let items = [ paneObject ]


const dispatch = createEventDispatcher()

function closeWindow() {
    dispatch('closeWindow', { id: paneObject.title })
}

// function handleDragStart(e) {
//     controlVars.hovering = paneObject.title
//     e.dataTransfer.effectAllowed = 'move'
//     e.dataTransfer.setDragImage(dragTarget, 0, 0)
//     console.log(e.currentTarget)
//     console.log(e)
//     //closeWindow()
// }

// function handleDragEnter(e) {
//     controlVars.targetPane = paneObject.title
//     e.preventDefault()
// }

function handleSort(e) {
    items = e.detail.items;
}
</script>

<section use:dndzone={{items, flipDurationMs}} on:consider={handleSort} on:finalize={handleSort}>
{#each items as item (item.id)}
<div role="dialog" class="pane" animate:flip={{duration:flipDurationMs}}>
    <div class="pane_topbar">
        <div>{item.title}</div>
        <div><button on:click={closeWindow} class="closed">X</button></div>        
    </div>
    <div class="pane_container">
        <div class="pane_content">
            <h1>{item.text}</h1>
        </div>
    </div>
</div>
{/each}
</section>
<!-- <div
  role="dialog"
  class="pane"
  on:dragenter={(e) => handleDragEnter(e)}
  bind:clientWidth={dialogWidth}
  bind:clientHeight={dialogHeight}
  bind:this={dragTarget}
  class:is-active={controlVars.targetPane === paneObject.title}
>
    <div
      class="pane_topbar"
      draggable="true"
      bind:this={dragObject}
      on:dragstart={(e) => handleDragStart(e)}    
    >
        <div>{paneObject.title}</div>
        <div><button on:click={closeWindow} class="closed">X</button></div>        
    </div>
    <div class="pane_container">
        <div class="pane_content">
            <h1>{paneObject.text}</h1>
        </div>
    </div>
</div> -->

<!-- <div class="shadow"></div> -->
<style>
    /* .pane.is-active > .shadow {
        visibility: visible;
    }

    .pane > .shadow {
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(100, 100, 255, 0.3);
        z-index: 99;
        visibility: hidden;
    } */
</style>