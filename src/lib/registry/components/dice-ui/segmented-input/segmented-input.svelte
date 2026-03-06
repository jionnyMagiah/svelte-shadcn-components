<script lang="ts">
    import { cn } from '$lib/utils';
    import type { Direction, Orientation } from 'bits-ui';
    import { boxWith } from 'svelte-toolbelt';
    import type { HTMLAttributes } from 'svelte/elements';
    import { SegmentedInputContextState, type Size } from './context.svelte';

    type SegmentedInputProps = HTMLAttributes<HTMLDivElement> & {
        dir?: Direction;
        orientation?: Orientation;
        size?: Size;
        disabled?: boolean;
        invalid?: boolean;
        required?: boolean;
    };

    let {
        size = 'default',
        dir,
        orientation = 'horizontal',
        children,
        class: className,
        disabled,
        invalid,
        required,
        ...rootProps
    }: SegmentedInputProps = $props();

    SegmentedInputContextState.create({
        dir: boxWith(() => dir),
        disabled: boxWith(() => disabled),
        invalid: boxWith(() => invalid),
        orientation: boxWith(() => orientation),
        required: boxWith(() => required),
        size: boxWith(() => size)
    });
</script>

<div
    role="group"
    aria-orientation={orientation}
    data-slot="segmented-input"
    data-orientation={orientation}
    data-disabled={disabled ? '' : undefined}
    data-invalid={invalid ? '' : undefined}
    data-required={required ? '' : undefined}
    {dir}
    {...rootProps}
    class={cn(
        'flex',
        orientation === 'horizontal' ? 'flex-row' : 'flex-col',
        className
    )}
>
    {@render children?.()}
</div>
