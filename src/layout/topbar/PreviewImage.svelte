<script>
    import HSplitPreview from "./HSplitPreview.svelte"
    import VSplitPreview from "./VSplitPreview.svelte"

    export let paneObject
</script>

{#if paneObject && paneObject.type === 'h'}
<HSplitPreview leftPaneSize={paneObject.axis[0]} rightPaneSize={paneObject.axis[1]}>
    <left slot="left">
    {#if paneObject.left}
        {#if paneObject.left.type === 'c'}
        <div class="dialog"><p>{paneObject.left.id}</p></div>
        {:else}
        <svelte:self paneObject={paneObject.left} />
        {/if}
    {/if}
    </left>
    <right slot="right">
    {#if paneObject.right}
        {#if paneObject.right.type === 'c'}
        <div class="dialog"><p>{paneObject.right.id}</p></div>
        {:else}
        <svelte:self paneObject={paneObject.right} />
        {/if}
    {/if}
    </right>
</HSplitPreview>
{:else if paneObject && paneObject.type === 'v'}
<VSplitPreview topPaneSize={paneObject.axis[0]} downPaneSize={paneObject.axis[1]}>
    <top slot="top">
    {#if paneObject.top}
        {#if paneObject.top.type === 'c'}
        <div class="dialog"><p>{paneObject.top.id}</p></div>
        {:else}
        <svelte:self paneObject={paneObject.top} />
        {/if}
    {/if}
    </top>
    <down slot="down">
    {#if paneObject.down}
        {#if paneObject.down.type === 'c'}
        <div class="dialog"><p>{paneObject.down.id}</p></div>
        {:else}
        <svelte:self paneObject={paneObject.down} />
        {/if}
    {/if}
    </down>
</VSplitPreview>
{:else}
<div class="dialog"><p>{paneObject && paneObject.id}</p></div>
{/if}

<style>
    left,
    right,
    top,
    down {
        width: 100%;
        height: 100%;
        line-height: 100%;
        display: block;
        text-align: center;
        background-color: #DDDDCC;
    }

    .dialog {
        font: 0.1em sans-serif;
        height: inherit;
        width: inherit;
        display: table;
        color: #777;
        text-align: center;
    }

    .dialog p {
        display: table-cell;
        vertical-align: middle;
    }
</style>
  