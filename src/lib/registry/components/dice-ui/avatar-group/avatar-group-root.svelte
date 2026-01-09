<script lang="ts" module>
    import { type Snippet } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';
    import { tv, type VariantProps } from 'tailwind-variants';

    export const avatarGroupVariants = tv({
        base: 'flex items-center',
        variants: {
            orientation: {
                horizontal: 'flex-row',
                vertical: 'flex-col'
            },
            dir: {
                ltr: '',
                rtl: ''
            }
        },
        compoundVariants: [
            {
                orientation: 'horizontal',
                dir: 'ltr',
                className: '-space-x-1'
            },
            {
                orientation: 'horizontal',
                dir: 'rtl',
                className: 'flex-row-reverse -space-x-1 space-x-reverse'
            },
            {
                orientation: 'vertical',
                dir: 'ltr',
                className: '-space-y-1'
            },
            {
                orientation: 'vertical',
                dir: 'rtl',
                className: 'flex-col-reverse -space-y-1 space-y-reverse'
            }
        ],
        defaultVariants: {
            orientation: 'horizontal',
            dir: 'ltr'
        }
    });

    export type AvatarGroupProps = Omit<HTMLAttributes<HTMLDivElement>, 'dir'> &
        VariantProps<typeof avatarGroupVariants> & {
            size?: number;
            max?: number;
            asChild?: boolean;
            reverse?: boolean;
            // child: Snippet<[{ props: Record<string, unknown> }]>;
            renderOverflow?: (count: number) => Snippet<[number]>;
        };
</script>

<script lang="ts">
    import { cn } from '$lib/utils';
    import { Avatar, mergeProps } from 'bits-ui';
    import { setAvatarContext } from './index.svelte';
    import AvatarGroupItem from './avatar-group-item.svelte';
    let {
        orientation = 'horizontal',
        dir = 'ltr',
        size = 40,
        max = Infinity,
        reverse = false,
        renderOverflow,
        class: className,
        children,
        // child,
        ...rootProps
    }: AvatarGroupProps = $props();

    let items: string[] = [];
    setAvatarContext(items);

    const itemCount = $derived(items.length);
    const shouldTruncate = $derived(max && itemCount > max);
    const visibleItems = $derived(
        shouldTruncate ? [...items.entries()].slice(0, max - 1) : items
    );
    const overflowCount = $derived(shouldTruncate ? itemCount - (max - 1) : 0);
    const totalRenderedItems = $derived(shouldTruncate ? max : itemCount);
</script>

<div
    data-orientation={orientation}
    data-slot="avatar-group"
    {...rootProps}
    class={cn(avatarGroupVariants({ orientation, dir }), className)}
>
    {@render children?.()}
</div>
