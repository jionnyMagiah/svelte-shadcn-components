<script lang="ts" module>
    import type { HTMLAttributes } from 'svelte/elements';
    import { getErrorId, type Field } from './utils';
    import {
        KeyValueContext,
        KeyValueItemContext,
        KeyValueStoreContext
    } from './context.svelte';
    import { cn } from '$lib/utils';

    interface KeyValueErrorProps extends HTMLAttributes<HTMLSpanElement> {
        field: Field;
    }
</script>

<script lang="ts">
    const {
        field,
        children,
        class: className,
        ...errorProps
    }: KeyValueErrorProps = $props();

    const context = $derived(KeyValueContext.get());
    const store = $derived(KeyValueStoreContext.get());
    const itemData = $derived(KeyValueItemContext.get());

    const errors = $derived(store.stateRef.errors);
    const error = $derived(errors[itemData.opts.id.current]?.[field]);
</script>

{#if error}
    <span
        id={getErrorId(
            context.opts.rootId.current,
            itemData.opts.id.current,
            field
        )}
        role="alert"
        {...errorProps}
        class={cn('text-sm font-medium text-destructive', className)}
    >
        {error}
    </span>
{/if}
