<script lang="ts">
    import { Label } from '$lib/components/ui/label/index.js';
    import DarkModeToggle from '$lib/components/dark-mode-toggle.svelte';
    import Switch from '$lib/components/ui/switch/switch.svelte';
    import { cn } from '$lib/utils';
    let { children } = $props();
    let full = $state(true);
    let debugBorders = $state(false);
    function toggleFull(event: KeyboardEvent) {
        if (event.key === 'm' && event.ctrlKey) {
            full = !full;
        }
        if (event.key === 'b' && event.ctrlKey) {
            event.preventDefault();
            debugBorders = !debugBorders;
        }
    }
</script>

<svelte:body onkeydown={toggleFull} />
<div class={cn('h-screen w-screen bg-muted', { 'bg-background': full })}>
    {#if !full}
        <div class="flex flex-row gap-2 border-b">
            <DarkModeToggle />
            <div class="flex items-center space-x-2">
                <Switch id="full" bind:checked={full} />
                <Label for="full">fullMode (ctrl+M)</Label>
            </div>
            <div class="flex items-center space-x-2">
                <Switch id="full" bind:checked={debugBorders} />
                <Label for="full">borders (ctrl+B)</Label>
            </div>
        </div>
    {/if}
    <div
        class={cn({
            'm-2 rounded-md border-2 bg-background': !full,
            'debug-borders': debugBorders
        })}
    >
        {@render children()}
    </div>
</div>
