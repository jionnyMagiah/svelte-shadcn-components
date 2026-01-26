<script lang="ts" module>
    import Input from '$lib/components/ui/input/input.svelte';
    import type { ComponentProps } from 'svelte';
    import {
        KeyValueContext,
        KeyValueItemContext,
        KeyValueStoreContext,
        type ItemData
    } from './context.svelte';
    import { getErrorId, removeQuotes } from './utils';
    import { useId } from 'bits-ui';

    type InputProps = ComponentProps<typeof Input> & { type?: 'text' };

    type KeyValueKeyInputProps = InputProps;
</script>

<script lang="ts">
    const {
        onchange: onChangeProp,
        onpaste: onPasteProp,
        // children,
        disabled,
        readonly,
        required,
        ...keyInputProps
    }: KeyValueKeyInputProps = $props();

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

    const onChange = (
        event: Event & { currentTarget: EventTarget & HTMLInputElement }
    ) => {
        const state = store.getState();
        const newValue = state.value.map((item) => {
            if (item.id !== itemData.opts.id.current) return item;
            const updated = {
                ...item,
                key: (event.target as HTMLInputElement).value
            };
            if (context.opts.trim.current) updated.key = updated.key.trim();
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

        onChangeProp?.(event);
    };

    const onPaste = (
        event: ClipboardEvent & {
            currentTarget: EventTarget & HTMLInputElement;
        }
    ) => {
        if (!context.opts.enablePaste.current) return;

        onPasteProp?.(event);
        if (event.defaultPrevented) return;

        const content = event.clipboardData?.getData('text') ?? '';
        const lines = content.split(/\r?\n/).filter((line) => line.trim());

        if (lines.length > 1) {
            event.preventDefault();

            const parsed: ItemData[] = [];

            for (const line of lines) {
                let key = '';
                let value = '';

                if (line.includes('=')) {
                    const parts = line.split('=');
                    key = parts[0]?.trim() ?? '';
                    value = removeQuotes(
                        parts.slice(1).join('=').trim(),
                        context.opts.stripQuotes.current
                    );
                } else if (line.includes(':')) {
                    const parts = line.split(':');
                    key = parts[0]?.trim() ?? '';
                    value = removeQuotes(
                        parts.slice(1).join(':').trim(),
                        context.opts.stripQuotes.current
                    );
                } else if (/\s{2,}|\t/.test(line)) {
                    const parts = line.split(/\s{2,}|\t/);
                    key = parts[0]?.trim() ?? '';
                    value = removeQuotes(
                        parts.slice(1).join(' ').trim(),
                        context.opts.stripQuotes.current
                    );
                }

                if (key) {
                    parsed.push({ id: useId(), key, value });
                }
            }

            if (parsed.length > 0) {
                const state = store.getState();
                const currentIndex = state.value.findIndex(
                    (item) => item.id === itemData.opts.id.current
                );

                let newValue: ItemData[];
                if (
                    itemData.opts.key.current === '' &&
                    itemData.opts.value.current === ''
                ) {
                    newValue = [
                        ...state.value.slice(0, currentIndex),
                        ...parsed,
                        ...state.value.slice(currentIndex + 1)
                    ];
                } else {
                    newValue = [
                        ...state.value.slice(0, currentIndex + 1),
                        ...parsed,
                        ...state.value.slice(currentIndex + 1)
                    ];
                }

                if (context.opts.maxItems?.current !== undefined) {
                    newValue = newValue.slice(0, context.opts.maxItems.current);
                }

                store.setState('value', newValue);

                if (context.opts.onPaste?.current) {
                    context.opts.onPaste.current(
                        event as unknown as ClipboardEvent,
                        parsed
                    );
                }
            }
        }
    };
</script>

<Input
    aria-invalid={isInvalid}
    aria-describedby={isInvalid
        ? getErrorId(
              context.opts.rootId.current,
              itemData.opts.id.current,
              'key'
          )
        : undefined}
    data-slot="key-value-key-input"
    autocapitalize="off"
    autocomplete="off"
    autocorrect="off"
    spellcheck="false"
    disabled={isDisabled}
    readonly={isReadOnly}
    required={isRequired}
    placeholder={context.opts.keyPlaceholder.current}
    {...keyInputProps}
    value={itemData.opts.key.current}
    onchange={onChange}
    onpaste={onPaste}
/>
