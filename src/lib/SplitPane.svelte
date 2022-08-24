<script lange="ts">

import HSplitPane from './HSplitPane.svelte'
import VSplitPane from './VSplitPane.svelte'
import Dialog from './Dialog.svelte'
  
export let paneObject  
export let LastNum

function closeWindow(e) {
    const windowId = e.detail.id
    if(e.detail.val == 0){  
        if (paneObject.type === 'c') {
        console.log('No longer window deletion is allowed.')
        } else if (paneObject.type === 'h') {
            if (paneObject.left.id === windowId) {
                paneObject = paneObject.right
            } else if (paneObject.right.id === windowId) {
                paneObject = paneObject.left
            }
        } else if (paneObject.type === 'v') {
            if (paneObject.top.id === windowId) {
                paneObject = paneObject.down
            } else if (paneObject.down.id === windowId) {
                paneObject = paneObject.top
            }
        }
    } else if(e.detail.val == 1){
        console.log(`e.detail.val  == ${  e.detail.val}`)
        const dlgWidth = e.detail.Width
        const dlgHeight = e.detail.Height
        // dispatch('divWindow', { id: windowId })
        if (paneObject.type === 'c') {
            if(dlgWidth >= dlgHeight){
                paneObject.type = 'h'
                paneObject.left = {type: 'c', text: paneObject.text, title: paneObject.title, id: paneObject.id}
                paneObject.right = {type: 'c', text: `Dialog ${LastNum}`, title: `Dialog ${LastNum}`, id: `d${LastNum}`}
            }else{
                paneObject.type = 'v'
                paneObject.top = {type: 'c', text: paneObject.text, title: paneObject.title, id: paneObject.id}
                paneObject.down = {type: 'c', text: `Dialog ${LastNum}`, title: `Dialog ${LastNum}`, id: `d${LastNum}`}
            }
            LastNum += 1
        } else if (paneObject.type === 'h') {
            if (paneObject.left.id === windowId) {

                if(dlgWidth >= dlgHeight){
                    paneObject.left.type = 'h'
                    paneObject.left.left = {type: 'c', text: paneObject.left.text, title: paneObject.left.title, id: paneObject.left.id}
                    paneObject.left.right = {type: 'c', text: `Dialog ${LastNum}`, title: `Dialog ${LastNum}`, id: `d${LastNum}`}
                }else{
                    paneObject.left.type = 'v'
                    paneObject.left.top = {type: 'c', text: paneObject.left.text, title: paneObject.left.title, id: paneObject.left.id}
                    paneObject.left.down = {type: 'c', text: `Dialog ${LastNum}`, title: `Dialog ${LastNum}`, id: `d${LastNum}`}
                }
                
            } else if (paneObject.right.id === windowId) {
                if(dlgWidth >= dlgHeight){
                    paneObject.right.type = 'h'
                    paneObject.right.left = {type: 'c', text: paneObject.right.text, title: paneObject.right.title, id: paneObject.right.id}
                    paneObject.right.right = {type: 'c', text: `Dialog ${LastNum}`, title: `Dialog ${LastNum}`, id: `d${LastNum}`}
                }else{
                    paneObject.right.type = 'v'
                    paneObject.right.top = {type: 'c', text: paneObject.right.text, title: paneObject.right.title, id: paneObject.right.id}
                    paneObject.right.down = {type: 'c', text: `Dialog ${LastNum}`, title: `Dialog ${LastNum}`, id: `d${LastNum}`}
                }
            }
            LastNum += 1
        } else if (paneObject.type === 'v') {
            if (paneObject.top.id === windowId) {
                // console.log('Top Window.  LastNum == ' + LastNum)
                if(dlgWidth >= dlgHeight){
                    paneObject.top.type = 'h'
                    paneObject.top.left = {type: 'c', text: paneObject.top.text, title: paneObject.top.title, id: paneObject.top.id}
                    paneObject.top.right = {type: 'c', text: `Dialog ${LastNum}`, title: `Dialog ${LastNum}`, id: `d${LastNum}`}
                }else{
                    paneObject.top.type = 'v'
                    paneObject.top.top = {type: 'c', text: paneObject.top.text, title: paneObject.top.title, id: paneObject.top.id}
                    paneObject.top.down = {type: 'c', text: `Dialog ${LastNum}`, title: `Dialog ${LastNum}`, id: `d${LastNum}`}
                }
                
            } else if (paneObject.down.type === 'c' && paneObject.down.id === windowId) {
                // console.log('Bottom Window.')
                if(dlgWidth >= dlgHeight){
                    paneObject.down.type = 'h'
                    paneObject.down.left = {type: 'c', text: paneObject.down.text, title: paneObject.down.title, id: paneObject.down.id}
                    paneObject.down.right = {type: 'c', text: `Dialog ${LastNum}`, title: `Dialog ${LastNum}`, id: `d${LastNum}`}
                }else{
                    paneObject.down.type = 'v'
                    paneObject.down.top = {type: 'c', text: paneObject.down.text, title: paneObject.down.title, id: paneObject.down.id}
                    paneObject.down.down = {type: 'c', text: `Dialog ${LastNum}`, title: `Dialog ${LastNum}`, id: `d${LastNum}`}
                }
            }
            LastNum += 1
        }        
    }
}

function updateWindow(e) {
    const { items, id } = e.detail

    if (paneObject.type === 'h') {

    }
}

</script>

{#if paneObject.type === 'h'}
<HSplitPane>  
    <left slot="left">
    {#if paneObject.left}
        {#if paneObject.left.type === 'c'}
        <Dialog paneObject={paneObject.left} on:closeWindow={closeWindow} on:updateWindow={updateWindow} />
        {:else}
        <svelte:self bind:paneObject={paneObject.left} bind:LastNum />
        {/if}
    {/if}
    </left>
    <right slot="right">
    {#if paneObject.right}
        {#if paneObject.right.type === 'c'}
        <Dialog paneObject={paneObject.right} on:closeWindow={closeWindow} on:updateWindow={updateWindow} />
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
        <Dialog paneObject={paneObject.top} on:closeWindow={closeWindow} on:updateWindow={updateWindow} />
        {:else}
        <svelte:self bind:paneObject={paneObject.top} bind:LastNum />
        {/if}
    {/if}
    </top>
    <down slot="down">
    {#if paneObject.down}
        {#if paneObject.down.type === 'c'}
        <Dialog paneObject={paneObject.down} on:closeWindow={closeWindow} on:updateWindow={updateWindow} />
        {:else}
        <svelte:self bind:paneObject={paneObject.down} bind:LastNum />
        {/if}
    {/if}
    </down>
</VSplitPane>
{:else}
<Dialog bind:paneObject on:closeWindow={closeWindow} on:updateWindow={updateWindow} />
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
  