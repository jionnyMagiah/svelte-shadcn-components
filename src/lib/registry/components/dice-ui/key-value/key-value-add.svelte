<script lang="ts" module>
    import {
        KeyValueContext,
        KeyValueStoreContext,
        type ItemData
    } from './context.svelte';

    type OnClickEvent =
        | (MouseEvent & {
              currentTarget: EventTarget & HTMLButtonElement;
          })
        | (MouseEvent & {
              currentTarget: EventTarget & HTMLAnchorElement;
          });
    interface KeyValueAddProps extends Omit<ButtonProps, 'onclick'> {
        onclick?: (event: OnClickEvent) => void;
    }
</script>

<script lang="ts">
    import Button, {
        type ButtonProps
    } from '$lib/components/ui/button/button.svelte';
    import { Plus } from '@lucide/svelte';
    import { useId } from 'bits-ui';

    const {
        onclick: onClickProp,
        children,
        ...addProps
    }: KeyValueAddProps = $props();

    const context = $derived(KeyValueContext.get());
    const store = $derived(KeyValueStoreContext.get());

    const value = $derived(store.stateRef.value);

    const isDisabled = $derived(
        context.opts.disabled.current ||
            (context.opts.maxItems?.current !== undefined &&
                value.length >= context.opts.maxItems.current)
    );

    const onClick = (event: OnClickEvent) => {
        onClickProp?.(event);

        const state = store.getState();
        if (
            context.opts.maxItems?.current !== undefined &&
            state.value.length >= context.opts.maxItems.current
        ) {
            return;
        }

        const newItem: ItemData = {
            id: useId(''),
            key: '',
            value: ''
        };

        const newValue = [...state.value, newItem];
        store.setState('value', newValue);
        store.setState('focusedId', newItem.id);

        context.opts.onAdd?.current?.(newItem);
    };
</script>

<Button
    type="button"
    data-slot="key-value-add"
    variant="outline"
    disabled={isDisabled}
    {...addProps}
    onclick={onClick}
>
    {#if children}
        {@render children()}
    {:else}
        <Plus /> Add
    {/if}
</Button>
