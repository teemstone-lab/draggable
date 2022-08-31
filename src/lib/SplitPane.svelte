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
    const childObj = e.detail.obj
    const { completion } = e.detail    

    if (e.detail.flag) {
        // Dialog
        if (childBatch === "all") console.log('No longer window deletion is allowed.')
        else if (childBatch === "left") currentObj = currentObj.right
        else if (childBatch === "right") currentObj = currentObj.left
        else if (childBatch === "top") currentObj = currentObj.down
        else if (childBatch === "down") currentObj = currentObj.top
    } else {
        // SplitPane
        if (childBatch === "left") currentObj.left = { ...childObj }
        else if (childBatch === "right") currentObj.right = { ...childObj }
        else if (childBatch === "top") currentObj.top = { ...childObj }
        else if (childBatch === "down") currentObj.down = { ...childObj }
    }
    dispatch('closeCallback', { obj: { ...currentObj }, flag: false, completion, batch })
}

function divisionCallback(e) {
    const currentObj = { ...paneObject }
    const childObj = e.detail.obj
    const childBatch = e.detail.batch
    const { dlgWidth, dlgHeight, completion } = e.detail
    const newDialog = {type: 'c', text: `Dialog ${LastNum}`, title: `Dialog ${LastNum}`, id: `d${LastNum}`}
    let targetObj

    if (e.detail.flag) {
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
        } else {
            targetObj.top = { ...targetObj }
            targetObj.down = newDialog
            targetObj.type = 'v'
        }
        delete targetObj.id

        LastNum += 1
    } else {
        // SplitPane
        if (childBatch === "left") currentObj.left = { ...childObj }
        else if (childBatch === "right") currentObj.right = { ...childObj }
        else if (childBatch === "top") currentObj.top = { ...childObj }
        else if (childBatch === "down") currentObj.down = { ...childObj }
    }
    dispatch('divisionCallback', { obj: { ...currentObj }, flag: false, dlgHeight, dlgWidth, completion, batch})
}

function dragCallback(e) {
    const currentObj = { ...paneObject }
    const childBatch = e.detail.batch
    const childObj = e.detail.obj
    let {completion} = e.detail
    let targetObj

    if (e.detail.flag) {
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
            delete targetObj.id
        } else if (currentState === 'right') {
            targetObj.left = { ...targetObj }
            targetObj.right = childObj
            targetObj.type = 'h'
            delete targetObj.id
        } else if (currentState === 'top') {
            targetObj.top = childObj
            targetObj.down = { ...targetObj }
            targetObj.type = 'v'
            delete targetObj.id
        } else if (currentState === 'down') {
            targetObj.top = { ...targetObj }
            targetObj.down = childObj
            targetObj.type = 'v'
            delete targetObj.id
        }
    } else {
        // SplitPane
        if (childBatch === "left") currentObj.left = { ...childObj }
        else if (childBatch === "right") currentObj.right = { ...childObj }
        else if (childBatch === "top") currentObj.top = { ...childObj }
        else if (childBatch === "down") currentObj.down = { ...childObj }
    }
    dispatch('dragCallback', { obj: { ...currentObj }, flag: false, completion, batch})

}

</script>

{#if paneObject.type === 'h'}
<HSplitPane>  
    <left slot="left">
    {#if paneObject.left}
        {#if paneObject.left.type === 'c'}
        <Dialog paneObject={paneObject.left} batch="left" on:closeCallback={closeCallback} on:divisionCallback={divisionCallback} on:dragCallback={dragCallback} />
        {:else}
        <svelte:self paneObject={paneObject.left} batch="left" on:divisionCallback={divisionCallback} on:closeCallback={closeCallback} on:dragCallback={dragCallback} bind:LastNum />
        {/if}
    {/if}
    </left>
    <right slot="right">
    {#if paneObject.right}
        {#if paneObject.right.type === 'c'}
        <Dialog paneObject={paneObject.right} batch="right" on:closeCallback={closeCallback} on:divisionCallback={divisionCallback} on:dragCallback={dragCallback} />
        {:else}
        <svelte:self paneObject={paneObject.right} batch="right" on:divisionCallback={divisionCallback} on:closeCallback={closeCallback} on:dragCallback={dragCallback} bind:LastNum />
        {/if}
    {/if}
    </right>
</HSplitPane>
{:else if paneObject.type === 'v'}
<VSplitPane>
    <top slot="top">
    {#if paneObject.top}
        {#if paneObject.top.type === 'c'}
        <Dialog paneObject={paneObject.top} batch="top" on:closeCallback={closeCallback} on:divisionCallback={divisionCallback} on:dragCallback={dragCallback} />
        {:else}
        <svelte:self paneObject={paneObject.top} batch="top" on:divisionCallback={divisionCallback} on:closeCallback={closeCallback} on:dragCallback={dragCallback} bind:LastNum />
        {/if}
    {/if}
    </top>
    <down slot="down">
    {#if paneObject.down}
        {#if paneObject.down.type === 'c'}
        <Dialog paneObject={paneObject.down} batch="down" on:closeCallback={closeCallback} on:divisionCallback={divisionCallback} on:dragCallback={dragCallback} />
        {:else}
        <svelte:self paneObject={paneObject.down} batch="down" on:divisionCallback={divisionCallback} on:closeCallback={closeCallback} on:dragCallback={dragCallback} bind:LastNum />
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
  