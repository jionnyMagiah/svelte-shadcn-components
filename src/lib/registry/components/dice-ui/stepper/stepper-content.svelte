<script lang="ts" module>
    import { cn } from '$lib/utils';
    import type { HTMLAttributes } from 'svelte/elements';
    import { stepperGetId } from '.';
    import { getStepperContextStore, getStepperContextValue } from './context';

    export type StepperContentProps = HTMLAttributes<HTMLDivElement> & {
        value: string;
        forceMount?: boolean;
        ref?: HTMLDivElement;
    };
</script>

<script lang="ts">
    let {
        value: valueProp,
        children,
        forceMount = false,
        ref,
        class: className,
        ...contentProps
    }: StepperContentProps = $props();

    const { rootId, dir } = $derived(getStepperContextValue()());
    const store = $derived(getStepperContextStore()());

    const value = $derived(store.getState().value());
    const contentId = $derived(stepperGetId(rootId, 'content', valueProp));
    const triggerId = $derived(stepperGetId(rootId, 'trigger', valueProp));

    const empty = $derived(valueProp !== value && !forceMount);
</script>

{#if !empty}
    <div
        id={contentId}
        role="tabpanel"
        aria-labelledby={triggerId}
        data-slot="stepper-content"
        {dir}
        {...contentProps}
        bind:this={ref}
        class={cn('flex-1 outline-none', className)}
    >
        {@render children?.()}
    </div>
{/if}
