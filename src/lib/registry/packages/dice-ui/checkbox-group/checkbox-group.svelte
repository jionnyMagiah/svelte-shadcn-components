<script lang="ts" module>
    import { Checkbox, useId, type Direction } from 'bits-ui';
    import type { HTMLAttributes } from 'svelte/elements';
    import { CheckboxGroupContextValue } from './context.svelte';
    import { boxWith } from 'svelte-toolbelt';
    import { watch } from 'runed';

    interface CheckboxGroupRootProps extends Omit<
        HTMLAttributes<HTMLDivElement>,
        'value' | 'defaultValue' | 'onchange' | 'oninvalid'
    > {
        /** Controlled value. */
        value?: string[];

        /** Initial value when uncontrolled. */
        defaultValue?: string[];

        /** Callback when value changes. */
        onvaluechange?: (value: string[]) => void;

        /** Callback when value is validated. */
        onvalidate?: (
            value: string[]
        ) => string | string[] | true | null | undefined;

        /** Whether the checkbox group is disabled. */
        disabled?: boolean;

        /** Whether the checkbox group is invalid. */
        invalid?: boolean;

        /**
         * Whether the checkbox group is read-only.
         * @default false
         */
        readOnly?: boolean;

        /**
         * Whether the checkbox group is required in a form context.
         * @default false
         */
        required?: boolean;

        /**
         * The reading direction of the checkbox group.
         * @default "ltr"
         */
        dir?: Direction;

        /**
         * The orientation of the checkbox group.
         * @default "vertical"
         */
        orientation?: 'horizontal' | 'vertical';

        /**
         * The underlying DOM element being rendered. You can bind to this to get a reference to the element.
         */
        ref?: HTMLDivElement | null;
    }
</script>

<script lang="ts">
    let {
        value,
        defaultValue,
        onvaluechange: onValueChangeProp,
        onvalidate: onValidateProp,
        disabled = false,
        invalid = false,
        readOnly = false,
        required = false,
        dir = 'ltr',
        orientation = 'vertical',
        children,
        ref = $bindable(),
        ...rootProps
    }: CheckboxGroupRootProps = $props();

    let validationMessage = $state<string | string[]>();
    const isInvalid = $derived(invalid || !!validationMessage);
    const id = $props.id();
    const labelId = useId('checkbox-group-root-label');
    const descriptionId = useId('checkbox-group-root-description');
    const messageId = useId('checkbox-group-root-message');

    watch([() => value], () => {
        if (onValidateProp) {
            const validationResult = onValidateProp(value ?? []);
            if (
                typeof validationResult === 'string' ||
                Array.isArray(validationResult)
            ) {
                validationMessage = validationResult;
            } else if (validationResult === true || validationResult == null) {
                validationMessage = undefined;
            }
        }

        onValueChangeProp?.(value ?? []);
    });

    const onItemCheckedChange = (payload: string, checked: boolean) => {
        if (readOnly) return;

        const newValue = checked
            ? [...(value ?? []), payload]
            : value?.filter((v) => v !== payload);

        value = newValue;
    };

    const onReset = () => {
        value = defaultValue ?? [];
        validationMessage = undefined;
    };

    CheckboxGroupContextValue.create({
        descriptionId: boxWith(() => descriptionId),
        dir: boxWith(() => dir),
        id: boxWith(() => id),
        isInvalid: boxWith(() => isInvalid),
        labelId: boxWith(() => labelId),
        messageId: boxWith(() => messageId),
        onItemCheckedChange: boxWith(() => onItemCheckedChange),
        onReset: boxWith(() => onReset),
        onValueChange: boxWith(() => onValueChangeProp),
        orientation: boxWith(() => orientation),
        readOnly: boxWith(() => readOnly),
        value: boxWith(() => value ?? []),
        disabled: boxWith(() => disabled),
        required: boxWith(() => required),
        validationMessage: boxWith(() => validationMessage)
    });
</script>

<div
    role="group"
    aria-labelledby={labelId}
    aria-describedby={`${descriptionId} ${isInvalid ? messageId : ''}`}
    aria-readonly={readOnly}
    aria-orientation={orientation}
    data-orientation={orientation}
    data-disabled={disabled ? '' : undefined}
    data-invalid={isInvalid ? '' : undefined}
    {dir}
    {...rootProps}
    bind:this={ref}
>
    {@render children?.()}
</div>
