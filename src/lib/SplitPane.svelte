<script lange="ts">

import HSplitPane from './HSplitPane.svelte'
import VSplitPane from './VSplitPane.svelte'
import Dialog from './Dialog.svelte'
  
export let paneObject  
export let LastNum

function closeWindow(id) {
    if (paneObject.type === 'c') {
        console.log('No longer window deletion is allowed.')
    } else if (paneObject.type === 'h') {
        if (paneObject.left.id === id) {
            paneObject = paneObject.right
        } else if (paneObject.right.id === id) {
            paneObject = paneObject.left
        }
    } else if (paneObject.type === 'v') {
        if (paneObject.top.id === id) {
            paneObject = paneObject.down
        } else if (paneObject.down.id === id) {
            paneObject = paneObject.top
        }
    }
}

function closeCallback(e) {
    closeWindow(e.detail.id)
}

function divisionCallback(e) {
    const windowId = e.detail.id
    const { dlgWidth, dlgHeight } = e.detail
    const newDialog = {type: 'c', text: `Dialog ${LastNum}`, title: `Dialog ${LastNum}`, id: `d${LastNum}`}

    // dispatch('divWindow', { id: windowId })
    if (paneObject.type === 'c') {
        if (dlgWidth >= dlgHeight) {
            paneObject.left = { ...paneObject }
            paneObject.right = newDialog
            paneObject.type = 'h'
        } else {
            paneObject.top = { ...paneObject }
            paneObject.down = newDialog
            paneObject.type = 'v'
        }
        delete paneObject.id
        LastNum += 1
    } else if (paneObject.type === 'h') {
        if (paneObject.left.id === windowId) {
            if (dlgWidth >= dlgHeight) {
                paneObject.left.left = { ...paneObject.left }
                paneObject.left.right = newDialog
                paneObject.left.type = 'h'
            } else {
                paneObject.left.top = { ...paneObject.left }
                paneObject.left.down = newDialog
                paneObject.left.type = 'v'
            }
            delete paneObject.left.id
            
        } else if (paneObject.right.id === windowId) {
            if (dlgWidth >= dlgHeight) {
                paneObject.right.left = { ...paneObject.right }
                paneObject.right.right = newDialog
                paneObject.right.type = 'h'
            } else {
                paneObject.right.top = { ...paneObject.right }
                paneObject.right.down = newDialog
                paneObject.right.type = 'v'
            }
            delete paneObject.right.id
        }
        LastNum += 1
    } else if (paneObject.type === 'v') {
        if (paneObject.top.id === windowId) {
            // console.log('Top Window.  LastNum == ' + LastNum)
            if (dlgWidth >= dlgHeight) {
                paneObject.top.left = { ...paneObject.top }
                paneObject.top.right = newDialog
                paneObject.top.type = 'h'
            } else {
                paneObject.top.top = { ...paneObject.top }
                paneObject.top.down = newDialog
                paneObject.top.type = 'v'
            }
            delete paneObject.top.id
            
        } else if (paneObject.down.id === windowId) {
            // console.log('Bottom Window.')
            if (dlgWidth >= dlgHeight) {
                paneObject.down.left = { ...paneObject.down }
                paneObject.down.right = newDialog
                paneObject.down.type = 'h'
            } else {
                paneObject.down.top = { ...paneObject.down }
                paneObject.down.down = newDialog
                paneObject.down.type = 'v'
            }
            delete paneObject.down.id
        }
        LastNum += 1
    }        
}

function updateWindow(e) {
    const { items, id } = e.detail

    // if (items.length === 0) closeWindow(id)
    // else if (items.length > 1) {

    // }
}

</script>

{#if paneObject.type === 'h'}
<HSplitPane>  
    <left slot="left">
    {#if paneObject.left}
        {#if paneObject.left.type === 'c'}
        <Dialog paneObject={paneObject.left} on:closeCallback={closeCallback} on:divisionCallback={divisionCallback} on:updateWindow={updateWindow} />
        {:else}
        <svelte:self bind:paneObject={paneObject.left} bind:LastNum />
        {/if}
    {/if}
    </left>
    <right slot="right">
    {#if paneObject.right}
        {#if paneObject.right.type === 'c'}
        <Dialog paneObject={paneObject.right} on:closeCallback={closeCallback} on:divisionCallback={divisionCallback} on:updateWindow={updateWindow} />
        {:else}
        <svelte:self bind:paneObject={paneObject.right} bind:LastNum />
        {/if}
    {/if}
    </right>
</HSplitPane>
{:else if paneObject.type === 'v'}
<VSplitPane>
    <top slot="top">
    {#if paneObject.top}
        {#if paneObject.top.type === 'c'}
        <Dialog paneObject={paneObject.top} on:closeCallback={closeCallback} on:divisionCallback={divisionCallback} on:updateWindow={updateWindow} />
        {:else}
        <svelte:self bind:paneObject={paneObject.top} bind:LastNum />
        {/if}
    {/if}
    </top>
    <down slot="down">
    {#if paneObject.down}
        {#if paneObject.down.type === 'c'}
        <Dialog paneObject={paneObject.down} on:closeCallback={closeCallback} on:divisionCallback={divisionCallback} on:updateWindow={updateWindow} />
        {:else}
        <svelte:self bind:paneObject={paneObject.down} bind:LastNum />
        {/if}
    {/if}
    </down>
</VSplitPane>
{:else}
<Dialog bind:paneObject on:closeCallback={closeCallback} on:divisionCallback={divisionCallback} on:updateWindow={updateWindow} />
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
  