<script>
    import { onMount, onDestroy } from 'svelte';
    
    let separator;
    export let updateCallback = (_a1, _a2) => {
        // do nothing
        
    }
    export let onMouseDown = () => {
        // do nothing

        
    }
    export let onMouseUp = () => {
        // do nothing
        
    }
    let md;
    const onMouseDownWrapper = (e) => {
        e.preventDefault();
        onMouseDown();
        if (e.button !== 0) return;
        md = {e,
            offsetLeft:  separator.offsetLeft,
            offsetTop:   separator.offsetTop,
            firstHeight:  top.offsetHeight,
            secondHeight: down.offsetHeight
        };
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUpWrapper);
        window.addEventListener('touchmove', onMouseMove);
        window.addEventListener('touchend', onMouseUpWrapper);
    };
    const onMouseMove = (e) => {
        e.preventDefault();
        if (e.button !== 0) return;
        const delta = {x: e.clientX - md.e.clientX,
                y: e.clientY - md.e.clientY};
        // Prevent negative-sized elements
        delta.y = Math.min(Math.max(delta.y, -md.firstHeight),
                    md.secondHeight);

        separator.style.top = `${md.offsetTop + delta.y  }px`;
        top.style.height = `${md.firstHeight + delta.y  }px`;
        down.style.height = `${md.secondHeight - delta.y  }px`;
        // updateCallback();
    }
    const onMouseUpWrapper = (e) => {
        onMouseUp();
        if (e) {
            e.preventDefault();
            if (e.button !== 0) return;
        }
        updateCallback(top.style.height, down.style.height);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUpWrapper);
        window.removeEventListener('touchmove', onMouseMove);
        window.removeEventListener('touchend', onMouseUpWrapper);
    }
    function resetSize() {
        if (top) top.removeAttribute('style');
        if (down) down.removeAttribute('style');
        if (separator) separator.removeAttribute('style');
    }
    function onResize() {
        onMouseUpWrapper();
        resetSize();
    }
    onMount(() => {
        window.addEventListener('resize', onResize);
    });
    onDestroy(() => {
        window.removeEventListener('resize', onResize);
    });
    let top; let down;
    export let topPaneSize = '50%';
    export let downPaneSize = '50%';
    export let minTopPaneSize = '0';
    export let minDownPaneSize = '0';
    $: topPaneSize && resetSize();
    $: downPaneSize && resetSize();
</script>

<style>
    div.wrapper {
        width: 100%;
        height: 100%;
        /* background-color: yellow; */
        display: flex;
        flex-direction: column;
    }
    div.separator {
        cursor: row-resize;
        width: 100%;
        height: 4px;
        margin-top: -2px;
        z-index: 1;
        background-color: #aaa;
    }
    div.top {
        height: var(--top-pane-size);
        min-height: var(--min-top-pane-size);
        width: 100%;
    }
    div.down {
        height: var(--down-pane-size);
        min-height: var(--min-down-pane-size);
        width: 100%;
    }
</style>

<div class="wrapper" style="--top-pane-size: {topPaneSize}; --down-pane-size: {downPaneSize}; --min-top-pane-size:{minTopPaneSize}; --min-down-pane-size: {minDownPaneSize};">
    <div bind:this={top} class="top">
        <slot name="top">
            <div style="background-color: red;">
                Top Contents goes here...
            </div>
        </slot>
    </div>
    <div bind:this={separator} class="separator" on:mousedown={onMouseDownWrapper} on:touchstart={onMouseDownWrapper}>
    </div>
    <div bind:this={down} class="down">
        <slot name="down">
            <div style="background-color: yellow;">
                Down Contents goes here...
            </div>
        </slot>
    </div>
    <div class="shadow sh-left" />
    <div class="shadow sh-right" />
    <div class="shadow sh-top" />
    <div class="shadow sh-down" />    
</div>
