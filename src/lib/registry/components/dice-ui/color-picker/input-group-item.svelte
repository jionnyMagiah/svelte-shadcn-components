<script lang="ts" module>
    import Input from '$lib/components/ui/input/input.svelte';
    import { cn } from '$lib/utils';
    import type { ComponentProps } from 'svelte';
    import { tv, type VariantProps } from 'tailwind-variants';

    const inputGroupItemVariants = tv({
        base: 'h-8 [-moz-appearance:textfield] focus-visible:z-10 focus-visible:ring-1 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none',
        variants: {
            position: {
                first: 'rounded-e-none',
                middle: '-ms-px rounded-none border-l-0',
                last: '-ms-px rounded-s-none border-l-0',
                isolated: ''
            }
        },
        defaultVariants: {
            position: 'isolated'
        }
    });

    type InputGroupItemProps = ComponentProps<typeof Input> &
        VariantProps<typeof inputGroupItemVariants> & {};
</script>

<script lang="ts">
    let {
        class: className,
        position,
        value = $bindable(),
        ...props
    }: InputGroupItemProps = $props();
</script>

<Input
    data-slot="color-picker-input"
    bind:value
    class={cn(inputGroupItemVariants({ position }), className)}
    {...props}
/>
