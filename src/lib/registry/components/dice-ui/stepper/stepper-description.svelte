<script lang="ts" module>
    import type { WithChild } from 'bits-ui';
    import type { HTMLAttributes } from 'svelte/elements';
    import { stepperGetId } from '.';

    export type StepperDescriptionProps = HTMLAttributes<HTMLSpanElement> &
        WithChild;
</script>

<script lang="ts">
    import { cn } from '$lib/utils';
    import { mergeProps } from 'svelte-toolbelt';
    import {
        getStepperContextValue,
        getStepperItemContextValue
    } from './context';

    let {
        class: className,
        child,
        children,
        ref = $bindable(),
        ...descriptionProps
    }: StepperDescriptionProps = $props();

    const { rootId, dir } = $derived(getStepperContextValue()());
    const { value } = $derived(getStepperItemContextValue()());

    const descriptionId = $derived(stepperGetId(rootId, 'description', value));

    const mergedProps = $derived(
        mergeProps({
            id: descriptionId,
            'data-slot': 'description',
            dir: dir,
            class: cn('text-muted-foreground text-xs', className),
            ...descriptionProps
        })
    );
</script>

{#if child}
    {@render child({ props: mergedProps })}
{:else}
    <span bind:this={ref} {...mergedProps}>{@render children?.()}</span>
{/if}
