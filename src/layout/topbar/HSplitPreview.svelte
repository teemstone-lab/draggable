<script>
    function resetSize() {
        if (left) left.removeAttribute('style');
        if (right) right.removeAttribute('style');
    }

    let left; let right;
    export let leftPaneSize = '50%';
    export let rightPaneSize = '50%';
    export let minLeftPaneSize = '0';
    export let minRightPaneSize = '0';
    $: leftPaneSize && resetSize();
    $: rightPaneSize && resetSize();
</script>

<style>
    div.wrapper {
        width: 100%;
        height: 100%;
        /* background-color: yellow; */
        display: inline-flex;
    }
    div.separator {
        height: 100%;
        width: 2px;
        background-color: #555;
    }
    div.left {
        width: var(--left-pane-size);
        min-width: var(--min-left-pane-size);
        height: 100%;
    }
    div.right {
        width: var(--right-pane-size);
        min-width: var(--min-right-pane-size);
        height: 100%;
    }    
</style>

<div class="wrapper" style="--left-pane-size: {leftPaneSize}; --right-pane-size: {rightPaneSize}; --min-left-pane-size: {minLeftPaneSize}; --min-right-pane-size: {minRightPaneSize};">
    <div bind:this={left} class="left">
        <slot name="left">
            <div style="background-color: red;">
                Left Contents goes here...
            </div>
        </slot>
    </div>
    <div class="separator">
    </div>
    <div bind:this={right} class="right">
        <slot name="right">
            <div style="background-color: yellow;">
                Right Contents goes here...
            </div>
        </slot>
    </div>
</div>
