<script lange="ts">
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
    dispatch('closeCallback', { obj: { ...currentObj }, flag: false, batch })
}

function divisionCallback(e) {
    let currentObj = { ...paneObject }
    const childObj = e.detail.obj
    const childBatch = e.detail.batch
    const { dlgWidth, dlgHeight } = e.detail
    const newDialog = {type: 'c', text: `Dialog ${LastNum}`, title: `Dialog ${LastNum}`, id: `d${LastNum}`}

    if (e.detail.flag) {
        // Dialog
        const id = childObj.id
        if (currentObj.type === 'c') {
            if (dlgWidth >= dlgHeight) {
                currentObj.left = { ...currentObj }
                currentObj.right = newDialog
                currentObj.type = 'h'
            } else {
                currentObj.top = { ...currentObj }
                currentObj.down = newDialog
                currentObj.type = 'v'
            }
            delete currentObj.id
        } else if (currentObj.type === 'h') {
            if (currentObj.left.type === 'c' && currentObj.left.id === id) {
                if (dlgWidth >= dlgHeight) {
                    currentObj.left.left = { ...currentObj.left }
                    currentObj.left.right = newDialog
                    currentObj.left.type = 'h'
                } else {
                    currentObj.left.top = { ...currentObj.left }
                    currentObj.left.down = newDialog
                    currentObj.left.type = 'v'
                }
                delete currentObj.left.id
                
            } else if (currentObj.right.type === 'c' && currentObj.right.id === id) {
                if (dlgWidth >= dlgHeight) {
                    currentObj.right.left = { ...currentObj.right }
                    currentObj.right.right = newDialog
                    currentObj.right.type = 'h'
                } else {
                    currentObj.right.top = { ...currentObj.right }
                    currentObj.right.down = newDialog
                    currentObj.right.type = 'v'
                }
                delete currentObj.right.id
            }
        } else if (currentObj.type === 'v') {
            if (currentObj.top.type === 'c' && currentObj.top.id === id) {
                // console.log('Top Window.  LastNum == ' + LastNum)
                if (dlgWidth >= dlgHeight) {
                    currentObj.top.left = { ...currentObj.top }
                    currentObj.top.right = newDialog
                    currentObj.top.type = 'h'
                } else {
                    currentObj.top.top = { ...currentObj.top }
                    currentObj.top.down = newDialog
                    currentObj.top.type = 'v'
                }
                delete currentObj.top.id
                
            } else if (currentObj.down.type === 'c' && currentObj.down.id === id) {
                if (dlgWidth >= dlgHeight) {
                    currentObj.down.left = { ...currentObj.down }
                    currentObj.down.right = newDialog
                    currentObj.down.type = 'h'
                } else {
                    currentObj.down.top = { ...currentObj.down }
                    currentObj.down.down = newDialog
                    currentObj.down.type = 'v'
                }
                delete currentObj.down.id
            }
        }        
        LastNum += 1
    } else {
        // SplitPane
        if (childBatch === "left") currentObj.left = { ...childObj }
        else if (childBatch === "right") currentObj.right = { ...childObj }
        else if (childBatch === "top") currentObj.top = { ...childObj }
        else if (childBatch === "down") currentObj.down = { ...childObj }
    }
    dispatch('divisionCallback', { obj: { ...currentObj }, flag: false, dlgHeight, dlgWidth, batch})
}

function updateCallback(e) {
    // const { id, items, dlgWidth, dlgHeight } = e.detail

    // if (items.length > 1) dispatch('divisionCallback', { id, dlgWidth, dlgHeight, dialog1:{...items[0]}, dialog2:{...items[1]} })
    // else if (items.length === 0) dispatch('closeCallback', { id })
}

</script>

{#if paneObject.type === 'h'}
<HSplitPane>  
    <left slot="left">
    {#if paneObject.left}
        {#if paneObject.left.type === 'c'}
        <Dialog paneObject={paneObject.left} batch="left" on:closeCallback={closeCallback} on:divisionCallback={divisionCallback} on:updateCallback={updateCallback} />
        {:else}
        <svelte:self paneObject={paneObject.left} batch="left" on:closeCallback={closeCallback} bind:LastNum />
        {/if}
    {/if}
    </left>
    <right slot="right">
    {#if paneObject.right}
        {#if paneObject.right.type === 'c'}
        <Dialog paneObject={paneObject.right} batch="right" on:closeCallback={closeCallback} on:divisionCallback={divisionCallback} on:updateCallback={updateCallback} />
        {:else}
        <svelte:self paneObject={paneObject.right} batch="right" on:closeCallback={closeCallback} bind:LastNum />
        {/if}
    {/if}
    </right>
</HSplitPane>
{:else if paneObject.type === 'v'}
<VSplitPane>
    <top slot="top">
    {#if paneObject.top}
        {#if paneObject.top.type === 'c'}
        <Dialog paneObject={paneObject.top} batch="top" on:closeCallback={closeCallback} on:divisionCallback={divisionCallback} on:updateCallback={updateCallback} />
        {:else}
        <svelte:self paneObject={paneObject.top} batch="top" on:closeCallback={closeCallback} bind:LastNum />
        {/if}
    {/if}
    </top>
    <down slot="down">
    {#if paneObject.down}
        {#if paneObject.down.type === 'c'}
        <Dialog paneObject={paneObject.down} batch="down" on:closeCallback={closeCallback} on:divisionCallback={divisionCallback} on:updateCallback={updateCallback} />
        {:else}
        <svelte:self paneObject={paneObject.down} batch="down" on:closeCallback={closeCallback} bind:LastNum />
        {/if}
    {/if}
    </down>
</VSplitPane>
{:else}
<Dialog bind:paneObject batch="all" on:closeCallback={closeCallback} on:divisionCallback={divisionCallback} on:updateCallback={updateCallback} />
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
  