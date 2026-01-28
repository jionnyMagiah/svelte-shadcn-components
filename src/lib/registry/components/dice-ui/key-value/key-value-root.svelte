<script lang="ts" module>
    import VisuallyHiddenInput from '$lib/registry/utils/dice-ui/visually-hidden-input.svelte';
    import { cn } from '$lib/utils';
    import { watch } from 'runed';
    import { boxWith } from 'svelte-toolbelt';
    import type { HTMLAttributes } from 'svelte/elements';
    import {
        KeyValueContextState,
        Store,
        type ItemData
    } from './context.svelte';
    import { useId } from 'bits-ui';

    interface KeyValueProps extends Omit<
        HTMLAttributes<HTMLDivElement>,
        'onPaste' | 'defaultValue'
    > {
        id?: string;
        ref?: HTMLDivElement | null;
        defaultValue?: ItemData[];
        value?: ItemData[];
        onValueChange?: (value: ItemData[]) => void;
        maxItems?: number;
        minItems?: number;
        keyPlaceholder?: string;
        valuePlaceholder?: string;
        name?: string;
        allowDuplicateKeys?: boolean;
        enablePaste?: boolean;
        trim?: boolean;
        stripQuotes?: boolean;
        disabled?: boolean;
        readOnly?: boolean;
        required?: boolean;
        onPaste?: (event: ClipboardEvent, items: ItemData[]) => void;
        onAdd?: (value: ItemData) => void;
        onRemove?: (value: ItemData) => void;
        onKeyValidate?: (key: string, value: ItemData[]) => string | undefined;
        onValueValidate?: (
            value: string,
            key: string,
            items: ItemData[]
        ) => string | undefined;
    }
</script>

<script lang="ts">
    let {
        value: valueProp,
        defaultValue,
        onValueChange,
        onPaste,
        onAdd,
        onRemove,
        onKeyValidate,
        onValueValidate,
        maxItems,
        minItems = 0,
        keyPlaceholder = 'Key',
        valuePlaceholder = 'Value',
        allowDuplicateKeys = false,
        children,
        enablePaste = true,
        trim = true,
        stripQuotes = true,
        disabled = false,
        readOnly = false,
        required = false,
        class: className,
        id,
        name,
        ref = $bindable(),
        ...rootProps
    }: KeyValueProps = $props();

    const instanceId = $props.id();
    const rootId = $derived(id ?? instanceId);
    const isFormControl = $derived(ref ? !!ref.closest('form') : true);

    const store = Store.create({
        errors: boxWith(() => ({})),
        focusedId: boxWith(() => null),
        value: boxWith(
            () => defaultValue ?? [{ id: useId(), key: '', value: '' }]
        ),
        onAdd: boxWith(() => onAdd),
        onKeyValidate: boxWith(() => onKeyValidate),
        onPaste: boxWith(() => onPaste),
        onRemove: boxWith(() => onRemove),
        onValueValidate: boxWith(() => onValueValidate),
        onValueChange: boxWith(() => onValueChange)
    });

    const value = $derived(store.getState().value);
    const errors = $derived(store.getState().errors);
    const isInvalid = $derived(Object.keys(errors).length > 0);

    watch([() => valueProp], () => {
        if (valueProp !== undefined) {
            store.setState('value', valueProp);
        }
    });

    KeyValueContextState.create({
        allowDuplicateKeys: boxWith(() => allowDuplicateKeys),
        disabled: boxWith(() => disabled),
        enablePaste: boxWith(() => enablePaste),
        keyPlaceholder: boxWith(() => keyPlaceholder),
        minItems: boxWith(() => minItems),
        readOnly: boxWith(() => readOnly),
        required: boxWith(() => required),
        rootId: boxWith(() => rootId),
        stripQuotes: boxWith(() => stripQuotes),
        trim: boxWith(() => trim),
        valuePlaceholder: boxWith(() => valuePlaceholder),
        maxItems: boxWith(() => maxItems),
        onAdd: boxWith(() => onAdd),
        onKeyValidate: boxWith(() => onKeyValidate),
        onPaste: boxWith(() => onPaste),
        onRemove: boxWith(() => onRemove),
        onValueValidate: boxWith(() => onValueValidate)
    });
</script>

<div
    {id}
    data-slot="key-value"
    data-disabled={disabled ? '' : undefined}
    data-invalid={isInvalid ? '' : undefined}
    data-readonly={readOnly ? '' : undefined}
    {...rootProps}
    bind:this={ref}
    class={cn('flex flex-col gap-2', className)}
>
    {@render children?.()}
</div>
{#if isFormControl}
    <VisuallyHiddenInput
        type="hidden"
        control={ref}
        {name}
        {value}
        {disabled}
        {required}
    />
{/if}
