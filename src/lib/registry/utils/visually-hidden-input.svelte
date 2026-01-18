<script lang="ts" module>
    import { mergeProps } from 'svelte-toolbelt';
    import type { HTMLInputAttributes } from 'svelte/elements';

    type InputValue = string[] | string;

    export type VisuallyHiddenInputProps<T = InputValue> = Omit<
        HTMLInputAttributes,
        'value' | 'checked' | 'onReset'
    > & {
        value?: T;
        checked?: boolean;
        control: HTMLElement | null;
        bubbles?: boolean;
    };
</script>

<script lang="ts" generics="T = InputValue">
    let {
        control = $bindable(),
        value,
        checked,
        bubbles = true,
        type = 'hidden',
        style,
        ...inputProps
    }: VisuallyHiddenInputProps<T> = $props();

    const isCheckInput = $derived(
        type === 'checkbox' || type === 'radio' || type === 'switch'
    );

    let inputRef = $state<HTMLInputElement>(null!);

    const prevValueRef: {
        value: T | boolean | undefined;
        previous: T | boolean | undefined;
    } = $derived({
        value: isCheckInput ? checked : value,
        previous: isCheckInput ? checked : value
    });

    const prevValue = $derived.by(() => {
        const currentValue = isCheckInput ? checked : value;
        if (prevValueRef.value !== currentValue) {
            prevValueRef.previous = prevValueRef.value;
            prevValueRef.value = currentValue;
        }
        return prevValueRef.previous;
    });

    let controlSize = $state<{
        width?: number;
        height?: number;
    }>({});

    $effect(() => {
        if (!control) {
            controlSize = {};
            return;
        }

        controlSize = {
            width: control.offsetWidth,
            height: control.offsetHeight
        };

        if (typeof window === 'undefined') return;

        const resizeObserver = new ResizeObserver((entries) => {
            if (!Array.isArray(entries) || !entries.length) return;

            const entry = entries[0];
            if (!entry) return;

            let width: number;
            let height: number;

            if ('borderBoxSize' in entry) {
                const borderSizeEntry = entry.borderBoxSize;
                const borderSize = Array.isArray(borderSizeEntry)
                    ? borderSizeEntry[0]
                    : borderSizeEntry;
                width = borderSize.inlineSize;
                height = borderSize.blockSize;
            } else {
                width = control.offsetWidth;
                height = control.offsetHeight;
            }

            controlSize = { width, height };
        });

        resizeObserver.observe(control, { box: 'border-box' });
        return () => {
            resizeObserver.disconnect();
        };
    });

    $effect(() => {
        const input = inputRef;
        if (!input) return;

        const inputProto = window.HTMLInputElement.prototype;
        const propertyKey = isCheckInput ? 'checked' : 'value';
        const eventType = isCheckInput ? 'click' : 'input';
        const currentValue = isCheckInput ? checked : value;

        const serializedCurrentValue = isCheckInput
            ? checked
            : typeof value === 'object' && value !== null
              ? JSON.stringify(value)
              : value;

        const descriptor = Object.getOwnPropertyDescriptor(
            inputProto,
            propertyKey
        );

        const setter = descriptor?.set;

        if (prevValue !== currentValue && setter) {
            const event = new Event(eventType, { bubbles });
            setter.call(input, serializedCurrentValue);
            input.dispatchEvent(event);
        }
    });

    const controlStyle = $derived(
        controlSize.width !== undefined && controlSize.height !== undefined
            ? `width: ${controlSize.width}px; height: ${controlSize.height}px;`
            : ''
    );

    const mergedStyle = $derived(mergeProps({ style }, { style: controlSize }));
</script>

<input
    {type}
    {...inputProps}
    bind:this={inputRef}
    aria-hidden={isCheckInput}
    tabIndex={-1}
    defaultChecked={isCheckInput ? checked : undefined}
    style:border={0}
    style:clip={'rect(0 0 0 0)'}
    style:clipPath={'inset(50%)'}
    style:height={'1px'}
    style:margin={'-1px'}
    style:overflow={'hidden'}
    style:padding={0}
    style:position={'absolute'}
    style:whiteSpace={'nowrap'}
    style:width={'1px'}
    {...mergedStyle}
/>
