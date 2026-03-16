<script lang="ts">
    import { Label } from '$lib/components/ui/label/index.js';
    import DarkModeToggle from '$lib/components/dark-mode-toggle.svelte';
    import Switch from '$lib/components/ui/switch/switch.svelte';
    import { cn } from '$lib/utils';
    import * as Resizable from '$lib/components/ui/resizable/index.js';
    let { children } = $props();
    let full = $state(false);
    let debugBorders = $state(false);
    let resizable = $state(false);
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
<div
    class={cn('flex h-screen w-screen flex-col bg-muted', {
        'bg-background': full
    })}
>
    {#if !full}
        <div class="flex flex-row gap-2 border-b">
            <DarkModeToggle />
            <div class="flex items-center space-x-2">
                <Switch id="full" bind:checked={full} />
                <Label for="full">fullMode (ctrl+M)</Label>
            </div>
            <div class="flex items-center space-x-2">
                <Switch id="borders" bind:checked={debugBorders} />
                <Label for="borders">borders (ctrl+B)</Label>
            </div>
            <div class="flex items-center space-x-2">
                <Switch id="resize" bind:checked={resizable} />
                <Label for="resize">resizable</Label>
            </div>
        </div>
    {/if}
    <div
        class={cn('h-full', {
            'm-2 rounded-md border-2 bg-background': !full,
            'debug-borders': debugBorders
        })}
    >
        {#if resizable}
            <Resizable.PaneGroup direction="horizontal">
                <Resizable.Pane>
                    {@render children()}
                </Resizable.Pane>
                <Resizable.Handle withHandle />
                <Resizable.Pane></Resizable.Pane>
            </Resizable.PaneGroup>
        {:else}
            {@render children()}
        {/if}
    </div>
</div>
