<script lang="ts" module>
    import { cn } from '$lib/utils';
    import type { Orientation } from 'bits-ui';
    import type { Snippet } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';
    import { KeyValueStoreContext, type ItemData } from './context.svelte';

    interface KeyValueListProps extends HTMLAttributes<HTMLDivElement> {
        orientation?: Orientation;
        child?: Snippet<
            [
                {
                    itemData: ItemData;
                }
            ]
        >;
    }
</script>

<script lang="ts">
    const {
        orientation = 'vertical',
        child,
        class: className,
        ...listProps
    }: KeyValueListProps = $props();

    const store = $derived(KeyValueStoreContext.get());
    const value = $derived(store.getState().value);
</script>

<div
    aria-orientation={orientation}
    role="list"
    data-slot="key-value-list"
    data-orientation={orientation}
    {...listProps}
    class={cn(
        'flex',
        orientation === 'vertical' ? 'flex-col gap-2' : 'flex-row gap-2',
        className
    )}
>
    {#each value as item (item.id)}
        {@const itemData = {
            key: item.key,
            value: item.value,
            id: item.id
        }}
        {@render child?.({
            itemData: itemData
        })}
    {/each}
</div>
