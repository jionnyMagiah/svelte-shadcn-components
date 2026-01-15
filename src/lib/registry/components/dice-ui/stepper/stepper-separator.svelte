<script lang="ts" module>
    import type { HTMLAttributes } from 'svelte/elements';
    import { StepperSeparatorState } from './context.svelte';
    import { boxWith, mergeProps } from 'svelte-toolbelt';
    import { cn } from '$lib/utils';

    interface StepperSeparatorProps extends HTMLAttributes<HTMLDivElement> {
        forceMount?: boolean;
        ref?: HTMLDivElement;
    }
</script>

<script lang="ts">
    let {
        class: className,
        forceMount = false,
        ref,
        children,
        ...separatorProps
    }: StepperSeparatorProps = $props();

    const separatorState = StepperSeparatorState.create({
        forceMount: boxWith(() => forceMount)
    });

    const mergedProps = $derived(
        mergeProps(separatorProps, separatorState.props, {
            class: cn(
                'bg-border transition-colors data-[state=active]:bg-primary data-[state=completed]:bg-primary h-10 w-px data-[orientation=horizontal]:h-px data-[orientation=horizontal]:flex-1',
                className
            )
        })
    );
</script>

{#if !separatorState.empty}
    <div {...mergedProps}>{@render children?.()}</div>
{/if}
