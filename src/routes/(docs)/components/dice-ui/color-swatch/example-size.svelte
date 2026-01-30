<script lang="ts">
    import ColorSwatch from '$lib/registry/components/dice-ui/color-swatch/color-swatch.svelte';

    const colors = [
        '#ef4444', // red
        '#f97316', // orange
        '#eab308', // yellow
        '#22c55e', // green
        '#3b82f6' // blue
    ];
</script>

<div class="flex flex-col gap-6">
    <div class="flex flex-col gap-2">
        <span class="text-sm font-medium">Small (sm)</span>
        <div class="flex gap-2">
            {#each colors as color, idx (idx)}
                <ColorSwatch {color} size="sm" />
            {/each}
        </div>
    </div>
    <div class="flex flex-col gap-2">
        <span class="text-sm font-medium">Default</span>
        <div class="flex gap-2">
            {#each colors as color, idx (idx)}
                <ColorSwatch {color} size="default" />
            {/each}
        </div>
    </div>

    <div class="flex flex-col gap-2">
        <span class="text-sm font-medium">Large (lg)</span>
        <div class="flex gap-2">
            {#each colors as color, idx (idx)}
                <ColorSwatch {color} size="lg" />
            {/each}
        </div>
    </div>
</div>
