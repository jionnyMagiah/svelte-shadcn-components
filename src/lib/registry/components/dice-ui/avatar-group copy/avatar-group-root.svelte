<script lang="ts" module>
    import { type Snippet } from 'svelte';
    import { SvelteMap } from 'svelte/reactivity';
    import { tv, type VariantProps } from 'tailwind-variants';
    import { setAvatarContext } from './index.svelte';

    const avatarGroupVariants = tv({
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

    export type AvatarGroupRootProps = Avatar.RootProps &
        VariantProps<typeof avatarGroupVariants> & {
            size?: number;
            max?: number;
            children?: Snippet;
            child?: Snippet<[{ props: Record<string, unknown> }]>;
            reverse?: boolean;
            renderOverflow?: Snippet<[number]>;
        };
</script>

<script lang="ts">
    import { cn } from '$lib/utils';
    import { Avatar, mergeProps, type AvatarRootProps } from 'bits-ui';
    let {
        orientation = 'horizontal',
        dir = 'ltr',
        size = 40,
        max = Infinity,
        reverse = false,
        renderOverflow,
        class: className,
        children,
        child,
        ...rootProps
    }: AvatarGroupRootProps = $props();

    let items = new SvelteMap<
        string,
        { snippet: Snippet; props: AvatarRootProps }
    >();
    setAvatarContext(items);

    const itemCount = $derived(items.size);
    const shouldTruncate = $derived(max && itemCount > max);
    const visibleItems = $derived(
        shouldTruncate ? [...items.entries()].slice(0, max - 1) : items
    );
    const overflowCount = $derived(shouldTruncate ? itemCount - (max - 1) : 0);
</script>

{@render children?.()}
<div
    data-orientation={orientation}
    data-slot="avatar-group"
    class={cn(avatarGroupVariants({ orientation, dir }), className)}
>
    {#each visibleItems as item (item[0])}
        <Avatar.Root
            data-orientation={orientation}
            data-slot="avatar-root"
            class={cn(
                className,
                'relative flex size-8 shrink-0 overflow-hidden rounded-full'
            )}
            {...mergeProps(rootProps, item[1].props)}
        >
            {#if child}
                {@render child?.({
                    props: { ...mergeProps(rootProps, item[1].props) }
                })}
            {:else}
                {@render item[1].snippet?.()}
            {/if}
        </Avatar.Root>
    {/each}
    <Avatar.Root
        data-orientation={orientation}
        data-slot="avatar-root"
        class={cn(
            className,
            'relative flex size-8 shrink-0 overflow-hidden rounded-full'
        )}
        {...rootProps}
    >
        {#if shouldTruncate}
            {#if renderOverflow}
                {@render renderOverflow(overflowCount)}
            {:else}
                <div
                    class="inline-flex size-full items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground"
                >
                    +{overflowCount}
                </div>
            {/if}
        {/if}
    </Avatar.Root>
</div>
