<script lang="ts" module>
    import Separator from '$lib/components/ui/separator/separator.svelte';
    import { cn } from '$lib/utils';
    import type { SeparatorRootProps } from 'bits-ui';

    export type ActionBarSeparatorProps = SeparatorRootProps;
</script>

<script lang="ts">
    let {
        children,
        orientation = 'vertical',
        class: className
    }: ActionBarSeparatorProps = $props();
</script>

{#if children}
    {@render children()}
{:else}
    <Separator
        {orientation}
        data-slot="action-bar-separator"
        role="separator"
        aria-orientation={orientation}
        aria-hidden="true"
        class={cn(
            'bg-border in-data-[slot=action-bar-selection]:ml-0.5 in-data-[slot=action-bar-selection]:h-4 in-data-[slot=action-bar-selection]:w-px',
            className
        )}
    />
{/if}
