<script lang="ts" module>
    import { cn } from '$lib/utils';
    import { boxWith } from 'svelte-toolbelt';
    import type { HTMLAttributes } from 'svelte/elements';
    import {
        KeyValueItemContextState,
        KeyValueStoreContext,
        type ItemData
    } from './context.svelte';

    interface KeyValueItemProps extends HTMLAttributes<HTMLDivElement> {
        itemData: ItemData;
    }
</script>

<script lang="ts">
    const {
        children,
        class: className,
        itemData,
        ...itemProps
    }: KeyValueItemProps = $props();

    const store = $derived(KeyValueStoreContext.get());
    const itemContext = KeyValueItemContextState.create({
        id: boxWith(() => itemData.id),
        key: boxWith(() => itemData.key),
        value: boxWith(() => itemData.value)
    });

    const focusedId = $derived(store.stateRef.focusedId);
</script>

<div
    role="listitem"
    data-slot="key-value-item"
    data-highlighted={focusedId === itemContext.opts.id.current
        ? ''
        : undefined}
    {...itemProps}
    class={cn('flex items-start gap-2', className)}
>
    {@render children?.()}
</div>
