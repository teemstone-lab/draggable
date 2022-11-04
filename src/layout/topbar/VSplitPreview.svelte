<script>
    function resetSize() {
        if (top) top.removeAttribute('style');
        if (down) down.removeAttribute('style');
    }
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
        height: 2px;
        background-color: #555;
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
    <div class="separator">
    </div>
    <div bind:this={down} class="down">
        <slot name="down">
            <div style="background-color: yellow;">
                Down Contents goes here...
            </div>
        </slot>
    </div>
</div>
