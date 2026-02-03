<script lang="ts">
    import type { HTMLButtonAttributes } from 'svelte/elements';
    import {
        CheckboxGroupContext,
        CheckboxGroupContextItemValue
    } from './context.svelte';
    import { useId } from 'bits-ui';
    import { boxWith } from 'svelte-toolbelt';
    import VisuallyHiddenInput from '$lib/registry/utils/dice-ui/visually-hidden-input.svelte';
    import { getDataState } from './utils';

    type CheckboxGroupItemProps = Omit<
        HTMLButtonAttributes,
        'checked' | 'defaultChecked' | 'onCheckedChange'
    > & {
        /** Value of the checkbox. */
        value: string;

        /** Whether the checkbox is disabled. */
        disabled?: boolean;

        /** Whether the checkbox is required. */
        required?: boolean;

        ref?: HTMLButtonElement | null;
    };

    let {
        value,
        disabled,
        required = false,
        name,
        ref = $bindable(),
        children,
        onclick: onClickProp,
        onkeydown: onKeyDownProp,
        ...itemProps
    }: CheckboxGroupItemProps = $props();

    const context = $derived(CheckboxGroupContext.get());

    const id = useId('checkbox-group-item');
    const isDisabled = $derived(
        disabled || context.opts.disabled?.current || false
    );
    const isChecked = $derived(context.opts.value.current.includes(value));
    const isRequired = $derived(
        (context.opts.required?.current &&
            context.opts.value.current.length === 0) ||
            (required && !isChecked)
    );

    let formTrigger = $state<HTMLDivElement>(null!);
    const isFormControl = $derived(
        formTrigger ? !!formTrigger.closest('form') : true
    );
    let lastClickTime = $state(0);
    let hasConsumerStoppedPropagation = $state(false);

    CheckboxGroupContextItemValue.create({
        checked: boxWith(() => isChecked),
        value: boxWith(() => value),
        disabled: boxWith(() => isDisabled)
    });

    function onclick(
        event: MouseEvent & { currentTarget: HTMLButtonElement & EventTarget }
    ) {
        onClickProp?.(event);
        if (event.defaultPrevented) return;

        const now = Date.now();
        // Ignore rapid subsequent clicks (debounce)
        // This prevents event bubbling from clicking on the indicator
        if (now - lastClickTime < 50) {
            event.stopPropagation();
            return;
        }
        lastClickTime = now;

        context.opts.onItemCheckedChange.current(value, !isChecked);

        // todo: event.isPropagationStopped() does not exists
        // if (isFormControl) {
        //     hasConsumerStoppedPropagation = event.isPropagationStopped();
        //     // Stop button click propagation in forms to ensure only the input's event is triggered,
        //     // allowing native validation and reflecting checkbox updates.
        //     if (!hasConsumerStoppedPropagation) event.stopPropagation();
        // }
    }
    function onkeydown(
        event: KeyboardEvent & {
            currentTarget: HTMLButtonElement & EventTarget;
        }
    ) {
        onKeyDownProp?.(event);
        if (event.defaultPrevented) return;
        if (event.key === 'Enter') event.preventDefault();
    }
</script>

<button
    type="button"
    role="checkbox"
    aria-checked={isChecked}
    aria-disabled={isDisabled}
    aria-invalid={context.opts.isInvalid.current}
    data-state={getDataState(isChecked)}
    data-orientation={context.opts.orientation.current}
    data-disabled={isDisabled ? '' : undefined}
    data-invalid={context.opts.isInvalid.current ? '' : undefined}
    disabled={isDisabled}
    {id}
    {...itemProps}
    bind:this={ref}
    {onclick}
    {onkeydown}
>
    {@render children?.()}
</button>
{#if isFormControl}
    <VisuallyHiddenInput
        type="checkbox"
        control={ref}
        bubbles={!hasConsumerStoppedPropagation}
        {name}
        {value}
        checked={isChecked}
        disabled={isDisabled}
        readonly={context.opts.readOnly.current}
        required={isRequired}
        onreset={() => context.opts.onReset.current()}
    />
{/if}
