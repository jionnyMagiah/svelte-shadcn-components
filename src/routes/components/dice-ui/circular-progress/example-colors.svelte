<script lang="ts">
    import CircularProgressIndicator from '$lib/registry/components/dice-ui/circular-progress/circular-progress-indicator.svelte';
    import CircularProgressRange from '$lib/registry/components/dice-ui/circular-progress/circular-progress-range.svelte';
    import CircularProgressRoot from '$lib/registry/components/dice-ui/circular-progress/circular-progress-root.svelte';
    import CircularProgressTrack from '$lib/registry/components/dice-ui/circular-progress/circular-progress-track.svelte';
    import CircularProgressValueText from '$lib/registry/components/dice-ui/circular-progress/circular-progress-value-text.svelte';
    import { cn } from '$lib/utils';

    const themes = [
        {
            name: 'Default',
            trackClass: 'text-muted-foreground/20',
            rangeClass: 'text-primary',
            textClass: 'text-foreground'
        },
        {
            name: 'Success',
            trackClass: 'text-green-200 dark:text-green-900',
            rangeClass: 'text-green-500',
            textClass: 'text-green-700 dark:text-green-300'
        },
        {
            name: 'Warning',
            trackClass: 'text-yellow-200 dark:text-yellow-900',
            rangeClass: 'text-yellow-500',
            textClass: 'text-yellow-700 dark:text-yellow-300'
        },
        {
            name: 'Destructive',
            trackClass: 'text-red-200 dark:text-red-900',
            rangeClass: 'text-red-500',
            textClass: 'text-red-700 dark:text-red-300'
        },
        {
            name: 'Purple',
            trackClass: 'text-purple-200 dark:text-purple-900',
            rangeClass: 'text-purple-500',
            textClass: 'text-purple-700 dark:text-purple-300'
        },
        {
            name: 'Orange',
            trackClass: 'text-orange-200 dark:text-orange-900',
            rangeClass: 'text-orange-500',
            textClass: 'text-orange-700 dark:text-orange-300'
        },
        {
            name: 'Blue',
            trackClass: 'text-blue-200 dark:text-blue-900',
            rangeClass: 'text-blue-500',
            textClass: 'text-blue-700 dark:text-blue-300'
        },
        {
            name: 'Pink',
            trackClass: 'text-pink-200 dark:text-pink-900',
            rangeClass: 'text-pink-500',
            textClass: 'text-pink-700 dark:text-pink-300'
        }
    ];
    interface AnimatedCircularProgressProps {
        theme: (typeof themes)[0];
        index: number;
    }
</script>

<div class="hidden grid-cols-4 gap-4 sm:grid">
    {#each themes as theme, index (index)}
        {@render AnimatedCircularProgress({ theme, index })}
    {/each}
</div>
<div class="grid grid-cols-2 gap-4 sm:hidden">
    {#each themes.slice(0, 4) as theme, index (index)}
        {@render AnimatedCircularProgress({ theme, index })}
    {/each}
</div>

{#snippet AnimatedCircularProgress(prop: AnimatedCircularProgressProps)}
    <div>
        <CircularProgressRoot value={75} size={80} thickness={6}>
            <CircularProgressIndicator>
                <CircularProgressTrack class={prop.theme.trackClass} />
                <CircularProgressRange class={prop.theme.rangeClass} />
            </CircularProgressIndicator>
            <CircularProgressValueText
                class={cn('text-sm font-semibold', prop.theme.textClass)}
            />
        </CircularProgressRoot>
        <div class="flex flex-col items-center gap-1 text-center">
            <span class="text-sm font-medium">{prop.theme.name}</span>
            <p class="text-xs text-muted-foreground">
                {75}% complete
            </p>
        </div>
    </div>
{/snippet}
