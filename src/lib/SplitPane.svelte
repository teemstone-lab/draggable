<script lange="ts">
    import { HSplitPane, VSplitPane } from 'svelte-split-pane'
  
    export let paneObject
</script>
  
{#if paneObject.type === 'h'}
<HSplitPane>
    <left slot="left" role="dialog">
    {#if paneObject.left}
        {#if paneObject.left.type === 'c'}
        <div role="dialog" draggable="true">{paneObject.left.text}</div>
        {:else}
        <svelte:self paneObject={paneObject.left} />
        {/if}
    {/if}
    </left>
    <right slot="right">
    {#if paneObject.right}
        {#if paneObject.right.type === 'c'}
        <div role="dialog" draggable="true">{paneObject.right.text}</div>
        {:else}
        <svelte:self paneObject={paneObject.right} />
        {/if}
    {/if}
    </right>
</HSplitPane>
{:else if paneObject.type === 'v'}
<VSplitPane>
    <top slot="top">
    {#if paneObject.top}
        {#if paneObject.top.type === 'c'}
        <div role="dialog" draggable="true">{paneObject.top.text}</div>
        {:else}
        <svelte:self paneObject={paneObject.top} />
        {/if}
    {/if}
    </top>
    <down slot="down">
    {#if paneObject.down}
        {#if paneObject.down.type === 'c'}
        <div role="dialog" draggable="true">{paneObject.down.text}</div>
        {:else}
        <svelte:self paneObject={paneObject.down} />
        {/if}
    {/if}
    </down>
</VSplitPane>
{:else}
<div role="dialog">
    {paneObject.text}
</div>
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
  