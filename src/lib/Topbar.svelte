<script lang="ts">
    import svelteLogo from '../assets/svelte.svg'
</script>

<div id="topbar">
    <a href="https://svelte.dev" target="_blank">
        <img src={svelteLogo} alt="Svelte Logo" />
    </a>      
</div>

<style>
    #topbar {
        width: 100%;
        height: 50px;
        line-height: 50px;
        color: white;
        background: #334433;
        font-weight: 600;
        place-items: center;
        padding: 0 10px 0 10px;
        display: inline-block;
        vertical-align: middle;
    }
</style>

