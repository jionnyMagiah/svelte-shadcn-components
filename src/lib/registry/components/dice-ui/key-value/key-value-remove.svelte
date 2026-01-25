<script lang="ts" module>
    import {
        KeyValueContext,
        KeyValueItemContext,
        KeyValueStoreContext
    } from './context.svelte';

    type OnClickEvent =
        | (MouseEvent & {
              currentTarget: EventTarget & HTMLButtonElement;
          })
        | (MouseEvent & {
              currentTarget: EventTarget & HTMLAnchorElement;
          });
    interface KeyValueRemoveProps extends Omit<ButtonProps, 'onclick'> {
        onclick?: (event: OnClickEvent) => void;
    }
</script>

<script lang="ts">
    import Button, {
        type ButtonProps
    } from '$lib/components/ui/button/button.svelte';
    import { X } from '@lucide/svelte';

    const {
        onclick: onClickProp,
        children,
        ...removeProps
    }: KeyValueRemoveProps = $props();

    const context = $derived(KeyValueContext.get());
    const store = $derived(KeyValueStoreContext.get());
    const itemData = $derived(KeyValueItemContext.get());

    const value = $derived(store.stateRef.value);

    const isDisabled = $derived(
        context.opts.disabled.current ||
            value.length <= context.opts.minItems.current
    );

    const onClick = (event: OnClickEvent) => {
        onClickProp?.(event);

        const state = store.getState();
        if (state.value.length <= context.opts.minItems.current) return;

        const itemToRemove = state.value.find(
            (item) => item.id === itemData.opts.id.current
        );
        if (!itemToRemove) return;

        const newValue = state.value.filter(
            (item) => item.id !== itemData.opts.id.current
        );
        const newErrors = { ...state.errors };
        delete newErrors[itemData.opts.id.current];

        store.setState('value', newValue);
        store.setState('errors', newErrors);

        context.opts.onRemove?.current?.(itemToRemove);
    };
</script>

<Button
    data-slot="key-value-remove"
    variant="outline"
    size="icon"
    disabled={isDisabled}
    {...removeProps}
    onclick={onClick}
>
    {#if children}
        {@render children()}
    {:else}
        <X />
    {/if}
</Button>
