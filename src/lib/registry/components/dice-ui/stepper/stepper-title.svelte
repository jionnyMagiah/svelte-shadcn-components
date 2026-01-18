<script lang="ts" module>
    import type { WithChild } from 'bits-ui';
    import type { HTMLAttributes } from 'svelte/elements';
    import { stepperGetId } from '.';

    export type StepperTitleProps = HTMLAttributes<HTMLSpanElement> & WithChild;
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
        ...titleProps
    }: StepperTitleProps = $props();

    const context = $derived(getStepperContextValue()());
    const itemContext = $derived(getStepperItemContextValue()());

    const titleId = $derived(
        stepperGetId(context.rootId, 'title', itemContext.value)
    );

    const mergedProps = $derived(
        mergeProps({
            id: titleId,
            'data-slot': 'title',
            dir: context.dir,
            class: cn('font-medium text-sm', className),
            ...titleProps
        })
    );
</script>

{#if child}
    {@render child({ props: mergedProps })}
{:else}
    <span bind:this={ref} {...mergedProps}>{@render children?.()}</span>
{/if}
