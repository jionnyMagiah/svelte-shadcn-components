<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';
    import { CheckboxGroupContext } from './context.svelte';
    import { useId } from 'bits-ui';

    type CheckboxGroupListProps = HTMLAttributes<HTMLDivElement> & {
        ref?: HTMLDivElement | null;
    };
    let {
        children,
        ref = $bindable(),
        ...listProps
    }: CheckboxGroupListProps = $props();
    const context = $derived(CheckboxGroupContext.get());
    const id = useId('checkbox-group-list');
</script>

<div
    role="group"
    {id}
    data-orientation={context.opts.orientation.current}
    data-invalid={context.opts.isInvalid.current ? '' : undefined}
    {...listProps}
    bind:this={ref}
>
    {@render children?.()}
</div>
