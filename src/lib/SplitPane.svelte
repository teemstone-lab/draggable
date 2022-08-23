<script lange="ts">

import HSplitPane from './HSplitPane.svelte'
import VSplitPane from './VSplitPane.svelte'
import Dialog from './Dialog.svelte'
  
export let paneObject  
export let LastNum

function testFunction(){
    console.log('test Func')
}

function closeWindow(e) {
    const windowId = e.detail.id
    if(e.detail.val == 0){  
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
    } else if(e.detail.val == 1){
        console.log(`e.detail.val  == ${  e.detail.val}`)
        const dlgWidth = e.detail.Width
        const dlgHeight = e.detail.Height
        // dispatch('divWindow', { id: windowId })
        if (paneObject.type === 'c') {
            if(dlgWidth >= dlgHeight){
                paneObject.type = 'h'
                paneObject.left = {type: 'c', text: paneObject.text, title: paneObject.title}
                paneObject.right = {type: 'c', text: `Dialog ${LastNum}`, title: `Dialog ${LastNum}`}
            }else{
                paneObject.type = 'v'
                paneObject.top = {type: 'c', text: paneObject.text, title: paneObject.title}
                paneObject.down = {type: 'c', text: `Dialog ${LastNum}`, title: `Dialog ${LastNum}`}
            }
            LastNum += 1
        } else if (paneObject.type === 'h') {
            if (paneObject.left.type === 'c' && paneObject.left.title === windowId) {

                if(dlgWidth >= dlgHeight){
                    paneObject.left.type = 'h'
                    paneObject.left.left = {type: 'c', text: paneObject.left.text, title: paneObject.left.title}
                    paneObject.left.right = {type: 'c', text: `Dialog ${LastNum}`, title: `Dialog ${LastNum}`}
                }else{
                    paneObject.left.type = 'v'
                    paneObject.left.top = {type: 'c', text: paneObject.left.text, title: paneObject.left.title}
                    paneObject.left.down = {type: 'c', text: `Dialog ${LastNum}`, title: `Dialog ${LastNum}`}
                }
                
            } else if (paneObject.right.type === 'c' && paneObject.right.title === windowId) {
                if(dlgWidth >= dlgHeight){
                    paneObject.right.type = 'h'
                    paneObject.right.left = {type: 'c', text: paneObject.right.text, title: paneObject.right.title}
                    paneObject.right.right = {type: 'c', text: `Dialog ${LastNum}`, title: `Dialog ${LastNum}`}
                }else{
                    paneObject.right.type = 'v'
                    paneObject.right.top = {type: 'c', text: paneObject.right.text, title: paneObject.right.title}
                    paneObject.right.down = {type: 'c', text: `Dialog ${LastNum}`, title: `Dialog ${LastNum}`}
                }
            }
            LastNum += 1
        } else if (paneObject.type === 'v') {
            if (paneObject.top.type === 'c' && paneObject.top.title === windowId) {
                // console.log('Top Window.  LastNum == ' + LastNum)
                if(dlgWidth >= dlgHeight){
                    paneObject.top.type = 'h'
                    paneObject.top.left = {type: 'c', text: paneObject.top.text, title: paneObject.top.title}
                    paneObject.top.right = {type: 'c', text: `Dialog ${LastNum}`, title: `Dialog ${LastNum}`}
                }else{
                    paneObject.top.type = 'v'
                    paneObject.top.top = {type: 'c', text: paneObject.top.text, title: paneObject.top.title}
                    paneObject.top.down = {type: 'c', text: `Dialog ${LastNum}`, title: `Dialog ${LastNum}`}
                }
                
            } else if (paneObject.down.type === 'c' && paneObject.down.title === windowId) {
                // console.log('Bottom Window.')
                if(dlgWidth >= dlgHeight){
                    paneObject.down.type = 'h'
                    paneObject.down.left = {type: 'c', text: paneObject.down.text, title: paneObject.down.title}
                    paneObject.down.right = {type: 'c', text: `Dialog ${LastNum}`, title: `Dialog ${LastNum}`}
                }else{
                    paneObject.down.type = 'v'
                    paneObject.down.top = {type: 'c', text: paneObject.down.text, title: paneObject.down.title}
                    paneObject.down.down = {type: 'c', text: `Dialog ${LastNum}`, title: `Dialog ${LastNum}`}
                }
            }
            LastNum += 1
        }
        
    }
    
}
</script>

{#if paneObject.type === 'h'}
<HSplitPane>  
    <left slot="left">
    {#if paneObject.left}
        {#if paneObject.left.type === 'c'}
        <Dialog paneObject={paneObject.left} on:closeWindow={closeWindow}/>
        {:else}
        <svelte:self bind:paneObject={paneObject.left} bind:LastNum={LastNum} />
        {/if}
    {/if}
    </left>
    <right slot="right">
    {#if paneObject.right}
        {#if paneObject.right.type === 'c'}
        <Dialog paneObject={paneObject.right} on:closeWindow={closeWindow}/>
        {:else}
        <svelte:self bind:paneObject={paneObject.right}  bind:LastNum={LastNum}/>
        {/if}
    {/if}
    </right>
</HSplitPane>
{:else if paneObject.type === 'v'}
<VSplitPane>
    <top slot="top">
    {#if paneObject.top}
        {#if paneObject.top.type === 'c'}
        <Dialog paneObject={paneObject.top} on:closeWindow={closeWindow}/>
        {:else}
        <svelte:self bind:paneObject={paneObject.top}  bind:LastNum={LastNum}/>
        {/if}
    {/if}
    </top>
    <down slot="down">
    {#if paneObject.down}
        {#if paneObject.down.type === 'c'}
        <Dialog paneObject={paneObject.down} on:closeWindow={closeWindow} />
        {:else}
        <svelte:self bind:paneObject={paneObject.down}  bind:LastNum={LastNum}/>
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
  