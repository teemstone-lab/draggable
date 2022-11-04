<script lang="ts">
    import PreviewImage from "./PreviewImage.svelte"

    export let item
    export let paneObject
    export let fnloadPattern

    $: activeButtonStyle = item.active ? "background: #0000AA; cursor: initial;" : "background: #888; cursor: pointer;"
    $: activeButtonPanelStyle = item.active ? "hidden" : "visible"
</script>

<div class="previewWrapper" style={activeButtonStyle} on:click={fnloadPattern(item.num)}>{item.num}
  <span class="previewPanel" style="--panel-visibility: {activeButtonPanelStyle}">
    <span class="previewImageWrapper"><PreviewImage {paneObject} /></span>
  </span>
</div>

<style>
  .previewWrapper {
    position: relative;
    display: inline-block;
    background: #888;
    color: #FFF;
    cursor: initial;
    padding: 5px 10px 5px 10px;
    border: 1px solid #000;
    cursor: pointer;
  }

  .previewPanel {
    position: absolute;
    visibility: hidden;
    z-index: 1000;
    width: 180px;
    height: 100px;
    top: 35px;
    left: 20px;
    opacity: 0;
    background: #555;
  }

  .previewWrapper:hover .previewPanel {
    visibility: var(--panel-visibility);
    opacity: 1;
  }

  .previewImageWrapper {
    display: block;
    width: 160px;
    height: 90px;
    margin: 5px 10px;    
  }
</style>