<script lang="ts" module>
    import type { HTMLTextareaAttributes } from 'svelte/elements';
    import {
        KeyValueContext,
        KeyValueItemContext,
        KeyValueStoreContext
    } from './context.svelte';
    import Textarea from '$lib/components/ui/textarea/textarea.svelte';
    import { getErrorId } from './utils';
    import type { ComponentProps } from 'svelte';
    import { cn } from '$lib/utils';
    import { mergeProps } from 'svelte-toolbelt';

    type TextareaProps = ComponentProps<typeof Textarea>;
    interface KeyValueValueInputProps extends Omit<TextareaProps, 'rows'> {
        maxRows?: number;
    }
</script>

<script lang="ts">
    const {
        onchange: onChangeProp,
        // child,
        disabled,
        readonly,
        required,
        class: className,
        maxRows,
        style,
        ...valueInputProps
    }: KeyValueValueInputProps = $props();

    const context = $derived(KeyValueContext.get());
    const store = $derived(KeyValueStoreContext.get());
    const itemData = $derived(KeyValueItemContext.get());

    const errors = $derived(store.stateRef.errors);

    const isDisabled = $derived(disabled || context.opts.disabled.current);
    const isReadOnly = $derived(readonly || context.opts.readOnly.current);
    const isRequired = $derived(required || context.opts.required.current);
    const isInvalid = $derived(
        errors[itemData.opts.id.current]?.key !== undefined
    );

    const maxHeight = $derived(
        maxRows ? `calc(${maxRows} * 1.5em + 1rem)` : undefined
    );

    const onChange = (
        event: Event & { currentTarget: EventTarget & HTMLTextAreaElement }
    ) => {
        onChangeProp?.(event);

        const state = store.getState();
        const newValue = state.value.map((item) => {
            if (item.id !== itemData.opts.id.current) return item;
            const updated = { ...item, value: (event.target as HTMLTextAreaElement).value };
            if (context.opts.trim.current) updated.value = updated.value.trim();
            return updated;
        });

        store.setState('value', newValue);

        const updatedItemData = newValue.find(
            (item) => item.id === itemData.opts.id.current
        );
        if (updatedItemData) {
            const errors: { key?: string; value?: string } = {};

            if (context.opts.onKeyValidate?.current) {
                const keyError = context.opts.onKeyValidate.current(
                    updatedItemData.key,
                    newValue
                );
                if (keyError) errors.key = keyError;
            }

            if (!context.opts.allowDuplicateKeys.current) {
                const duplicateKey = newValue.find(
                    (item) =>
                        item.id !== updatedItemData.id &&
                        item.key === updatedItemData.key &&
                        updatedItemData.key !== ''
                );
                if (duplicateKey) {
                    errors.key = 'Duplicate key';
                }
            }

            if (context.opts.onValueValidate?.current) {
                const valueError = context.opts.onValueValidate.current(
                    updatedItemData.value,
                    updatedItemData.key,
                    newValue
                );
                if (valueError) errors.value = valueError;
            }

            const newErrorsState = { ...state.errors };
            if (Object.keys(errors).length > 0) {
                newErrorsState[itemData.opts.id.current] = errors;
            } else {
                delete newErrorsState[itemData.opts.id.current];
            }
            store.setState('errors', newErrorsState);
        }
    };

    const mergedProps = $derived(
        mergeProps(
            {
                'aria-invalid': isInvalid,
                'aria-describedby': isInvalid
                    ? getErrorId(
                          context.opts.rootId.current,
                          itemData.opts.id.current,
                          'value'
                      )
                    : undefined,
                class: cn(
                    'field-sizing-content min-h-9 resize-none',
                    maxRows && 'overflow-y-auto',
                    className
                ),
                'data-slot': 'key-value-value-input',
                autocapitalize: 'off',
                autocomplete: 'off',
                autocorrect: 'off',
                spellcheck: 'false',
                disabled: isDisabled,
                readonly: isReadOnly,
                required: isRequired,
                placeholder: context.opts.valuePlaceholder.current,
                onchange: onChange,
                style: style,
                value: itemData.opts.value
            },
            { style: maxHeight ? `max-height: ${maxHeight}` : '' },
            { ...valueInputProps }
        )
    );
</script>

<Textarea {...mergedProps} value={itemData.opts.value.current} />
