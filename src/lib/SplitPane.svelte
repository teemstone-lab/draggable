<script lange="ts">
import {createEventDispatcher } from 'svelte'
import HSplitPane from './HSplitPane.svelte'
import VSplitPane from './VSplitPane.svelte'
import Dialog from './Dialog.svelte'
  
export let paneObject  

const dispatch = createEventDispatcher()

function closeWindow(e) {
    dispatch('closeWindow', { id: e.detail.id })
}
</script>
  
{#if paneObject.type === 'h'}
<HSplitPane>  
    <left slot="left" role="dialog">
    {#if paneObject.left}
        {#if paneObject.left.type === 'c'}
        <Dialog text={paneObject.left.text} title={paneObject.left.title} on:closeWindow={closeWindow}/>
        {:else}
        <svelte:self paneObject={paneObject.left} on:closeWindow={closeWindow} />
        {/if}
    {/if}
    </left>
    <right slot="right">
    {#if paneObject.right}
        {#if paneObject.right.type === 'c'}
        <Dialog text={paneObject.right.text} title={paneObject.right.title} on:closeWindow={closeWindow} />
        {:else}
        <svelte:self paneObject={paneObject.right} on:closeWindow={closeWindow} />
        {/if}
    {/if}
    </right>
</HSplitPane>
{:else if paneObject.type === 'v'}
<VSplitPane>
    <top slot="top">
    {#if paneObject.top}
        {#if paneObject.top.type === 'c'}
        <Dialog text={paneObject.top.text} title={paneObject.top.title} on:closeWindow={closeWindow} />
        {:else}
        <svelte:self paneObject={paneObject.top} on:closeWindow={closeWindow} />
        {/if}
    {/if}
    </top>
    <down slot="down">
    {#if paneObject.down}
        {#if paneObject.down.type === 'c'}
        <Dialog text={paneObject.down.text} title={paneObject.down.title} on:closeWindow={closeWindow} />
        {:else}
        <svelte:self paneObject={paneObject.down} on:closeWindow={closeWindow} />
        {/if}
    {/if}
    </down>
</VSplitPane>
{:else}
<Dialog text={paneObject.text} title={paneObject.title} on:closeWindow={closeWindow} />
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
  