<script lang="ts">
import { createEventDispatcher } from 'svelte'

import HSplitPane from './HSplitPane.svelte'
import VSplitPane from './VSplitPane.svelte'
import Dialog from './Dialog.svelte'
  
export let paneObject  
export let LastNum
export let batch

const dispatch = createEventDispatcher()

function closeCallback(e) {
    let currentObj = { ...paneObject }
    const childBatch = e.detail.batch
    const { completion } = e.detail    

    // Dialog
    if (childBatch === "all") console.log('No longer window deletion is allowed.')
    else if (childBatch === "left") currentObj = currentObj.right
    else if (childBatch === "right") currentObj = currentObj.left
    else if (childBatch === "top") currentObj = currentObj.down
    else if (childBatch === "down") currentObj = currentObj.top

    dispatch('paneUpdateCallback', { obj: { ...currentObj }, completion, batch, source: "Close" })
}

function divisionCallback(e) {
    const currentObj = { ...paneObject }
    const childBatch = e.detail.batch
    const { dlgWidth, dlgHeight, completion } = e.detail
    const newDialog = {type: 'c', text: `Dialog ${LastNum}`, title: `Dialog ${LastNum}`, id: `d${LastNum}`}
    let targetObj

    // Dialog
    if (childBatch === 'all') {
        targetObj = currentObj
    } else if (childBatch === "left") {
        targetObj = currentObj.left
    } else if (childBatch === "right") {
        targetObj = currentObj.right
    } else if (childBatch === "top") {
        targetObj = currentObj.top
    } else if (childBatch === "down") {
        targetObj = currentObj.down
    }

    if (dlgWidth >= dlgHeight) {
        targetObj.left = { ...targetObj }
        targetObj.right = newDialog
        targetObj.type = 'h'
        targetObj.axis = ['50%','50%']
    } else {
        targetObj.top = { ...targetObj }
        targetObj.down = newDialog
        targetObj.type = 'v'
        targetObj.axis = ['50%','50%']
    }
    delete targetObj.id

    LastNum += 1

    dispatch('paneUpdateCallback', { obj: { ...currentObj }, completion, batch, source: "Division"})
}

function dragCallback(e) {
    const currentObj = { ...paneObject }
    const childBatch = e.detail.batch
    const childObj = e.detail.obj
    let {completion} = e.detail
    let targetObj

    const { currentState } = e.detail

    // Dialog
    if (childBatch === 'all') {
        targetObj = currentObj
    } else if (childBatch === "left") {
        targetObj = currentObj.left
    } else if (childBatch === "right") {
        targetObj = currentObj.right
    } else if (childBatch === "top") {
        targetObj = currentObj.top
    } else if (childBatch === "down") {
        targetObj = currentObj.down
    }

    if (currentState === 'none') {
        completion = false
    } else if (currentState === 'left') {
        targetObj.left = childObj
        targetObj.right = { ...targetObj }
        targetObj.type = 'h'
        targetObj.axis = ['50%','50%']
        delete targetObj.id
    } else if (currentState === 'right') {
        targetObj.left = { ...targetObj }
        targetObj.right = childObj
        targetObj.type = 'h'
        targetObj.axis = ['50%','50%']
        delete targetObj.id
    } else if (currentState === 'top') {
        targetObj.top = childObj
        targetObj.down = { ...targetObj }
        targetObj.type = 'v'
        targetObj.axis = ['50%','50%']
        delete targetObj.id
    } else if (currentState === 'down') {
        targetObj.top = { ...targetObj }
        targetObj.down = childObj
        targetObj.type = 'v'
        targetObj.axis = ['50%','50%']
        delete targetObj.id
    }

    dispatch('paneUpdateCallback', { obj: { ...currentObj }, completion, batch, source: "Drag"})
}

function updateCallback(a1, a2) {
    const currentObj = { ...paneObject }
    const pixels = [parseInt(a1.slice(0,-2), 10), parseInt(a2.slice(0,-2), 10)]
    const total = pixels[0] + pixels[1]
    const rate = [`${(pixels[0]/total*100).toFixed().toString()}%`, `${(pixels[1]/total*100).toFixed().toString()}%`]
    currentObj.axis = rate

    dispatch('paneUpdateCallback', { obj: { ...currentObj }, completion: true, batch, source: "Resize" })
}

function paneUpdateCallback(e) {
    const currentObj = { ...paneObject }
    const childBatch = e.detail.batch
    const childObj = e.detail.obj
    const {completion, source} = e.detail

    // SplitPane
    if (childBatch === "left") currentObj.left = { ...childObj }
    else if (childBatch === "right") currentObj.right = { ...childObj }
    else if (childBatch === "top") currentObj.top = { ...childObj }
    else if (childBatch === "down") currentObj.down = { ...childObj } 

    dispatch('paneUpdateCallback', { obj: { ...currentObj }, completion, batch, source})
}

</script>

{#if paneObject.type === 'h'}
<HSplitPane updateCallback={updateCallback} leftPaneSize={paneObject.axis[0]} rightPaneSize={paneObject.axis[1]}>
    <left slot="left">
    {#if paneObject.left}
        {#if paneObject.left.type === 'c'}
        <Dialog paneObject={paneObject.left} batch="left" on:closeCallback={closeCallback} on:divisionCallback={divisionCallback} on:dragCallback={dragCallback} />
        {:else}
        <svelte:self paneObject={paneObject.left} batch="left" on:paneUpdateCallback={paneUpdateCallback} bind:LastNum />
        {/if}
    {/if}
    </left>
    <right slot="right">
    {#if paneObject.right}
        {#if paneObject.right.type === 'c'}
        <Dialog paneObject={paneObject.right} batch="right" on:closeCallback={closeCallback} on:divisionCallback={divisionCallback} on:dragCallback={dragCallback} />
        {:else}
        <svelte:self paneObject={paneObject.right} batch="right" on:paneUpdateCallback={paneUpdateCallback} bind:LastNum />
        {/if}
    {/if}
    </right>
</HSplitPane>
{:else if paneObject.type === 'v'}
<VSplitPane updateCallback={updateCallback} topPaneSize={paneObject.axis[0]} downPaneSize={paneObject.axis[1]}>
    <top slot="top">
    {#if paneObject.top}
        {#if paneObject.top.type === 'c'}
        <Dialog paneObject={paneObject.top} batch="top" on:closeCallback={closeCallback} on:divisionCallback={divisionCallback} on:dragCallback={dragCallback} />
        {:else}
        <svelte:self paneObject={paneObject.top} batch="top" on:paneUpdateCallback={paneUpdateCallback} bind:LastNum />
        {/if}
    {/if}
    </top>
    <down slot="down">
    {#if paneObject.down}
        {#if paneObject.down.type === 'c'}
        <Dialog paneObject={paneObject.down} batch="down" on:closeCallback={closeCallback} on:divisionCallback={divisionCallback} on:dragCallback={dragCallback} />
        {:else}
        <svelte:self paneObject={paneObject.down} batch="down" on:paneUpdateCallback={paneUpdateCallback} bind:LastNum />
        {/if}
    {/if}
    </down>
</VSplitPane>
{:else}
<Dialog bind:paneObject batch="all" on:closeCallback={closeCallback} on:divisionCallback={divisionCallback} on:dragCallback={dragCallback} />
{/if}

<style>
    left,
    right,
    top,
    down {
        width: 100%;
        height: 100%;
        display: block;
        text-align: center;
        background-color: #DDDDCC;
    }
</style>
  