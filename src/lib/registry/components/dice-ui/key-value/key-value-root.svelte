<!-- <script lang="ts" module>
    import type { HTMLAttributes } from 'svelte/elements';

    interface KeyValueRootProps extends Omit<
        HTMLAttributes<HTMLDivElement>,
        'onPaste' | 'defaultValue'
    > {
        id?: string;
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
        children?: Snippet;
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
    import { isForInStatement } from 'typescript';
    import type { ItemData, KeyValueField } from './types';
    import { cn } from '$lib/utils';
    import VisuallyHiddenInput from '$lib/registry/utils/visually-hidden-input.svelte';

    const {
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
        enablePaste = true,
        trim = true,
        stripQuotes = true,
        disabled = false,
        readOnly = false,
        required = false,
        class: className,
        children,
        id,
        name,
        // ref,
        ...rootProps
    }: KeyValueRootProps = $props();
    const propId = $props.id();
    const rootId = $derived(id ?? propId);

    function getErrorId(rootId: string, itemId: string, field: KeyValueField) {
        return `${rootId}-${itemId}-${field}-error`;
    }

    function removeQuotes(string: string, shouldStrip: boolean): string {
        if (!shouldStrip) return string;

        const trimmed = string.trim();
        if (
            (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
            (trimmed.startsWith("'") && trimmed.endsWith("'"))
        ) {
            return trimmed.slice(1, -1);
        }
        return trimmed;
    }

    let formTrigger = $state(null);
</script>

<div
    {id}
    data-slot="key-value"
    data-disabled={disabled ? '' : undefined}
    data-invalid={isInvalid ? '' : undefined}
    data-readonly={readOnly ? '' : undefined}
    {...rootProps}
    bind:this={composedRef}
    class={cn('flex flex-col gap-2', className)}
>
    {@render children?.()}
</div>
{#if isFormControl}
    <VisuallyHiddenInput
        type="hidden"
        control={formTrigger}
        {name}
        {value}
        {disabled}
        {readOnly}
        {required}
    />
{/if} -->
