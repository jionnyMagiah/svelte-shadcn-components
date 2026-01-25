<script lang="ts" module>
    import type { HTMLAttributes } from 'svelte/elements';
    import { CircularProgressContext } from './context.svelte';
    import { cn } from '$lib/utils';

    type CircularProgressValueTextProps = HTMLAttributes<HTMLSpanElement>;
</script>

<script lang="ts">
    const {
        class: className,
        children,
        ...valueTextProps
    }: CircularProgressValueTextProps = $props();
    const context = CircularProgressContext.get();

    const state = $derived(context.opts.state.current);
    const valueTextId = $derived(context.opts.valueTextId?.current);
    const valueText = $derived(context.opts.valueText.current);
</script>

<div
    id={valueTextId}
    data-state={state}
    {...valueTextProps}
    class={cn(
        'absolute inset-0 flex items-center justify-center text-sm font-medium',
        className
    )}
>
    {#if children}
        {@render children()}
    {:else}
        {valueText}
    {/if}
</div>
