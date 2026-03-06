<script lang="ts">
    import Input from '$lib/components/ui/input/input.svelte';
    import { cn } from '$lib/utils';
    import { onMount, type ComponentProps, type Snippet } from 'svelte';
    import { mergeProps } from 'svelte-toolbelt';
    import type { VariantProps } from 'tailwind-variants';
    import { tv } from 'tailwind-variants';
    import { SegmentedInputContext } from './context.svelte';

    const segmentedInputItemVariants = tv({
        base: '',
        variants: {
            position: {
                isolated: '',
                first: 'rounded-e-none',
                middle: '-ms-px rounded-none border-l-0',
                last: '-ms-px rounded-s-none border-l-0'
            },
            orientation: {
                horizontal: '',
                vertical: ''
            },
            size: {
                sm: 'h-8 px-2 text-xs',
                default: 'h-9 px-3',
                lg: 'h-11 px-4'
            }
        },
        compoundVariants: [
            {
                position: 'first',
                orientation: 'vertical',
                class: 'ms-0 rounded-e-md rounded-b-none border-l'
            },
            {
                position: 'middle',
                orientation: 'vertical',
                class: 'ms-0 -mt-px rounded-none border-t-0 border-l'
            },
            {
                position: 'last',
                orientation: 'vertical',
                class: 'ms-0 -mt-px rounded-s-md rounded-t-none border-t-0 border-l'
            }
        ],
        defaultVariants: {
            position: 'isolated',
            orientation: 'horizontal',
            size: 'default'
        }
    });
    type SegmentedInputItemVariants = typeof segmentedInputItemVariants;

    type SegmentedInputItemProps = ComponentProps<typeof Input> &
        Omit<VariantProps<SegmentedInputItemVariants>, 'size'> & {
            child?: Snippet<[{ props: Record<string, unknown> }]>;
        };

    const {
        child,
        class: className,
        position: positionProp,
        disabled,
        required,
        ...inputProps
    }: SegmentedInputItemProps = $props();
    const propId = $props.id();

    const inputId = $derived(inputProps.id ?? propId);
    const context = $derived(SegmentedInputContext.get());

    const isDisabled = $derived(disabled ?? context.opts.disabled?.current);
    const isRequired = $derived(required ?? context.opts.required?.current);
    const isInvalid = $derived(context.opts.invalid?.current);
    const orientation = $derived(context.opts.orientation?.current);
    const size = $derived(context.opts.size?.current);

    let index = $state(-1);

    const position = $derived.by(() => {
        if (positionProp) return positionProp;
        else {
            const childCount = context.childLength();

            if (childCount === 1) {
                return 'isolated';
            } else if (index === 0) {
                return 'first';
            } else if (index === childCount - 1) {
                return 'last';
            } else {
                return 'middle';
            }
        }
    });

    const mergedProps = $derived(
        mergeProps(
            {
                'aria-invalid': isInvalid,
                'aria-required': isRequired,
                'data-disabled': isDisabled ? '' : undefined,
                'data-invalid': isInvalid ? '' : undefined,
                'data-orientation': orientation,
                'data-position': position,
                'data-required': isRequired ? '' : undefined,
                'data-slot': 'segmented-input-item',
                disabled: isDisabled,
                required: isRequired,
                class: cn(
                    segmentedInputItemVariants({
                        position,
                        orientation,
                        size
                    }),
                    className
                )
            },
            inputProps
        )
    );

    onMount(() => {
        index = context.addChild(inputId, position ?? '');
        return () => {
            context.removeChild(inputId);
        };
    });
</script>

{#if child}
    {@render child({ props: mergedProps })}
{:else}
    <Input {...mergedProps} />
{/if}
