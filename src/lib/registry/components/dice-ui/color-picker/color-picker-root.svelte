<script lang="ts" module>
    import type { Direction, PopoverRootProps } from 'bits-ui';
    import { boxWith } from 'svelte-toolbelt';
    import type { HTMLAttributes } from 'svelte/elements';
    import { Store } from './context.svelte';
    import { hexToRgb, rgbToHsv, type ColorFormat } from './utils';
    import ColorPickerImpl from './color-picker-impl.svelte';

    export interface ColorPickerRootProps
        extends
            Omit<HTMLAttributes<HTMLDivElement>, 'onvaluechange'>,
            Pick<PopoverRootProps, 'open' | 'onOpenChange'> {
        value?: string;
        defaultValue?: string;
        onValueChange?: (value: string) => void;
        dir?: Direction;
        format?: ColorFormat;
        defaultFormat?: ColorFormat;
        onFormatChange?: (format: ColorFormat) => void;
        name?: string;
        asChild?: boolean;
        disabled?: boolean;
        inline?: boolean;
        readOnly?: boolean;
        required?: boolean;
    }
</script>

<script lang="ts">
    // todo: make value bindable
    const {
        value: valueProp,
        defaultValue = '#000000',
        onValueChange,
        format: formatProp,
        defaultFormat = 'hex',
        onFormatChange,
        open: openProp,
        onOpenChange,
        children,
        name,
        disabled,
        inline,
        readOnly,
        required,
        ...rootProps
    }: ColorPickerRootProps = $props();

    const colorString = $derived(valueProp ?? defaultValue);
    const color = $derived(hexToRgb(colorString));
    Store.create({
        color: boxWith(() => color),
        hsv: boxWith(() => rgbToHsv(color)),
        open: boxWith(() => openProp ?? false),
        format: boxWith(() => formatProp ?? defaultFormat),
        onFormatChange: boxWith(() => onFormatChange),
        onOpenChange: boxWith(() => onOpenChange),
        onValueChange: boxWith(() => onValueChange)
    });
</script>

<ColorPickerImpl
    {...rootProps}
    value={valueProp}
    open={openProp}
    {name}
    {disabled}
    {inline}
    {readOnly}
    {required}>{@render children?.()}</ColorPickerImpl
>
