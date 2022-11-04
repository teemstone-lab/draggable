<script>
    import HSplitPreview from "./HSplitPreview.svelte"
    import PreviewDialog from "./PreviewDialog.svelte"
    import VSplitPreview from "./VSplitPreview.svelte"

    export let paneObject
</script>

{#if paneObject.type === 'h'}
<HSplitPreview leftPaneSize={paneObject.axis[0]} rightPaneSize={paneObject.axis[1]}>
    <left slot="left">
    {#if paneObject.left}
        {#if paneObject.left.type === 'c'}
        <PreviewDialog paneObject={paneObject.left} />
        {:else}
        <svelte:self paneObject={paneObject.left} />
        {/if}
    {/if}
    </left>
    <right slot="right">
    {#if paneObject.right}
        {#if paneObject.right.type === 'c'}
        <PreviewDialog paneObject={paneObject.right} />
        {:else}
        <svelte:self paneObject={paneObject.right} />
        {/if}
    {/if}
    </right>
</HSplitPreview>
{:else if paneObject.type === 'v'}
<VSplitPreview topPaneSize={paneObject.axis[0]} downPaneSize={paneObject.axis[1]}>
    <top slot="top">
    {#if paneObject.top}
        {#if paneObject.top.type === 'c'}
        <PreviewDialog paneObject={paneObject.top} />
        {:else}
        <svelte:self paneObject={paneObject.top} />
        {/if}
    {/if}
    </top>
    <down slot="down">
    {#if paneObject.down}
        {#if paneObject.down.type === 'c'}
        <PreviewDialog paneObject={paneObject.down} />
        {:else}
        <svelte:self paneObject={paneObject.down} />
        {/if}
    {/if}
    </down>
</VSplitPreview>
{:else}
<PreviewDialog bind:paneObject />
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
  