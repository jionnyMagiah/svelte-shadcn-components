<script lang="ts" module>
    import { cn } from '$lib/utils';
    import type { Snippet } from 'svelte';
    import { mergeProps } from 'svelte-toolbelt';
    import type { HTMLAttributes } from 'svelte/elements';
    import {
        KeyValueContext,
        KeyValueItemContext,
        KeyValueStoreContext
    } from './context.svelte';
    import { getErrorId, type Field } from './utils';

    type KeyValueErrorProps = HTMLAttributes<HTMLSpanElement> & {
        field: Field;
    } & {
        child?: Snippet<[{ props: Record<string, unknown>; error: string }]>;
    };
</script>

<script lang="ts">
    const {
        field,
        child,
        class: className,
        ...errorProps
    }: KeyValueErrorProps = $props();

    const context = $derived(KeyValueContext.get());
    const store = $derived(KeyValueStoreContext.get());
    const itemData = $derived(KeyValueItemContext.get());

    const errors = $derived(store.stateRef.errors);
    const error = $derived(errors[itemData.opts.id.current]?.[field]);

    const mergedProps = $derived(
        mergeProps({
            id: getErrorId(
                context.opts.rootId.current,
                itemData.opts.id.current,
                field
            ),
            role: 'alert',
            class: cn('text-sm font-medium text-destructive', className),
            ...errorProps
        })
    );
</script>

{#if error}
    {#if child}
        {@render child({ props: mergedProps, error })}
    {:else}
        <span {...mergedProps}>
            {error}
        </span>
    {/if}
{/if}
