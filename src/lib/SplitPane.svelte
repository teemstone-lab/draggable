<script lange="ts">
import HSplitPane from './HSplitPane.svelte'
import VSplitPane from './VSplitPane.svelte'
import Dialog from './Dialog.svelte'
  
export let paneObject  

function closeWindow(e) {
    const windowId = e.detail.id

    // paneObject.type이 'c'가 되려면 Dialog가 1개가 남을 때에만 가능
    // 그 이유는 내부에서 <Dialog>에 넘겨주는 bind 값은 paneObject.left/right/top/down값인데 이 때 type은 v/h이기 때문
    if (paneObject.type === 'c') {
      console.log('No longer window deletion is allowed.')
    } else if (paneObject.type === 'h') {
        if (paneObject.left.type === 'c' && paneObject.left.title === windowId) {
            paneObject = paneObject.right
        } else if (paneObject.right.type === 'c' && paneObject.right.title === windowId) {
            paneObject = paneObject.left
        }
    } else if (paneObject.type === 'v') {
        if (paneObject.top.type === 'c' && paneObject.top.title === windowId) {
            paneObject = paneObject.down
        } else if (paneObject.down.type === 'c' && paneObject.down.title === windowId) {
            paneObject = paneObject.top
        }
    }
}
</script>
  
{#if paneObject.type === 'h'}
<HSplitPane>  
    <left slot="left" role="dialog">
    {#if paneObject.left}
        {#if paneObject.left.type === 'c'}
        <Dialog paneObject={paneObject.left} on:closeWindow={closeWindow}/>
        {:else}
        <svelte:self bind:paneObject={paneObject.left} />
        {/if}
    {/if}
    </left>
    <right slot="right">
    {#if paneObject.right}
        {#if paneObject.right.type === 'c'}
        <Dialog paneObject={paneObject.right} on:closeWindow={closeWindow} />
        {:else}
        <svelte:self bind:paneObject={paneObject.right} />
        {/if}
    {/if}
    </right>
</HSplitPane>
{:else if paneObject.type === 'v'}
<VSplitPane>
    <top slot="top">
    {#if paneObject.top}
        {#if paneObject.top.type === 'c'}
        <Dialog paneObject={paneObject.top} on:closeWindow={closeWindow} />
        {:else}
        <svelte:self bind:paneObject={paneObject.top} />
        {/if}
    {/if}
    </top>
    <down slot="down">
    {#if paneObject.down}
        {#if paneObject.down.type === 'c'}
        <Dialog paneObject={paneObject.down} on:closeWindow={closeWindow} />
        {:else}
        <svelte:self bind:paneObject={paneObject.down} />
        {/if}
    {/if}
    </down>
</VSplitPane>
{:else}
<Dialog paneObject={paneObject} on:closeWindow={closeWindow} />
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
  