<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';
    import { CheckboxGroupContext } from './context.svelte';

    type CheckboxGroupLabelProps = HTMLAttributes<HTMLDivElement> & {
        ref?: HTMLDivElement | null;
    };
    let {
        children,
        ref = $bindable(),
        ...listProps
    }: CheckboxGroupLabelProps = $props();
    const context = $derived(CheckboxGroupContext.get());
</script>

<div
    data-disabled={context.opts.disabled?.current ? '' : undefined}
    id={context.opts.labelId.current}
    {...listProps}
    bind:this={ref}
>
    {@render children?.()}
</div>
