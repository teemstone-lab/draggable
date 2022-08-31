<script lang="ts">
import { createEventDispatcher } from 'svelte'

export let paneObject
export let batch

let dlgHeight
let dlgWidth
let dlgObject
let shadowAxis
let entryCount = 0
let currentState = 'none'

const dispatch = createEventDispatcher()

function closeCallback() {
    dispatch('closeCallback', { obj: { ...paneObject }, flag: true, completion: true, batch })
}

function divisionCallback() {
    dispatch('divisionCallback', { obj: { ...paneObject }, flag: true, dlgHeight, dlgWidth, completion: true, batch })
}

function handleDragStart(e) {
    e.dataTransfer.dropEffect = 'move'
    e.dataTransfer.setDragImage(dlgObject, 0, 0)
    e.dataTransfer.setData("text/plain", JSON.stringify(paneObject))
    dispatch('closeCallback', { obj: { ...paneObject }, flag: true, completion: false, batch })
}

function handleDrop(e) {
    e.preventDefault()
    const obj = JSON.parse(e.dataTransfer.getData("text/plain"))
    dispatch('dragCallback', { obj, flag: true, currentState, completion: true, batch})
}

function handleDragEnter(e) {
    e.preventDefault()
    entryCount += 1

    if (entryCount === 1) {
        setShadowState(e.layerX, e.layerY)
    }
}

function handleDragLeave(e) {
    e.preventDefault()
    entryCount -= 1

    if (entryCount === 0) {
        currentState = 'none'
    }
}

function handleDragOver(e) {
    e.preventDefault()
    if (currentState === 'none') {
        setShadowState(e.layerX, e.layerY)
    } else if (currentState === 'top' && e.layerY > Math.round(dlgHeight / 4)) {
        setShadowState(e.layerX, e.layerY)
    } else if (currentState === 'down' && e.layerY < Math.round(dlgHeight * 3 / 4)) {
        setShadowState(e.layerX, e.layerY)
    }
}

function setShadowState(x, y) {
    if (x <= Math.round(dlgWidth / 4)) {
        currentState = 'left'
    } else if (x >= Math.round(dlgWidth * 3 / 4)) {
        currentState = 'right'
    } else if (y <= Math.round(dlgHeight / 4)) {
        currentState = 'top'
    } else if (y >= Math.round(dlgHeight * 3 / 4)) {
        currentState = 'down'
    }
}

function setShadowAxis(state) {
    let axisData
    if (state === 'left') {
        axisData = { left: 0, top: 0, width: '50%', height: '100%', visibility: 'visible' }
    } else if (state === 'right') {
        axisData = { left: '50%', top: 0, width: '50%', height: '100%', visibility: 'visible' }
    } else if (state === 'top') {
        axisData = { left: 0, top: 0, width: '100%', height: '50%', visibility: 'visible' }
    } else if (state === 'down') {
        axisData = { left: 0, top: '50%', width: '100%', height: '50%', visibility: 'visible' }
    } else {
        axisData = { left: 0, top: 0, width: 0, height: 0, visibility: 'hidden'}
    }

    return Object.entries(axisData)
    .map(([key,value]) => `--${key}:${value}`)
    .join(';')
}

function handleShadowLeave(e) {
    e.preventDefault()
    currentState = 'none'    
}

$: shadowAxis = setShadowAxis(currentState)
</script>

<div 
  role="dialog"
  class="pane"
  name="dlgname"
  bind:this={dlgObject}
  bind:clientHeight={dlgHeight}
  bind:clientWidth={dlgWidth}
  on:dragenter={handleDragEnter}
  on:dragleave={handleDragLeave}
  on:dragover={handleDragOver}
  on:drop={handleDrop}  
>
    <div class="pane_topbar" draggable="true" on:dragstart={handleDragStart}>
        <div>{paneObject.title}</div>
        <div><button on:click={divisionCallback} class="division">Div</button><button on:click={closeCallback} class="closed">X</button></div>        
    </div>
    <div class="pane_container">
        <div class="pane_content">
            <h1>{paneObject.text}</h1>
        </div>
    </div>
    <div class="shadow" style={shadowAxis} on:dragleave={handleShadowLeave} />
</div>
<style>
    .shadow {
        z-index: 100;
        position: absolute;
        background: rgba(100, 100, 255, 0.2);
        visibility: var(--visibility, hidden);
        left: var(--left, 0);
        top: var(--top, 0);
        width: var(--width, 0);
        height: var(--height, 0);
        border: 1px solid #0000FF;
    }
</style>