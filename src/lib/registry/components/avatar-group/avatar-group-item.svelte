<script lang="ts" module>
    export type AvatarGroupItemProps = Omit<
        HTMLAttributes<HTMLDivElement>,
        'dir'
    > &
        VariantProps<typeof avatarGroupVariants> & {
            children?: Snippet;
            size?: number;
            reverse?: boolean;
            child?: Snippet<[{ props: Record<string, unknown> }]>;
        };
</script>

<script lang="ts">
    import { onMount, type Snippet } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';
    import type { VariantProps } from 'tailwind-variants';
    import * as Avatar from '$lib/components/ui/avatar/index.js';
    import { avatarGroupVariants } from './avatar-group-root.svelte';
    import { getAvatarContext, setAvatarContext } from './index.svelte';
    import { cn } from '$lib/utils';
    import { mergeProps } from 'bits-ui';
    const {
        child,
        children,
        size = 40,
        orientation = 'horizontal',
        dir = 'ltr',
        reverse = false,
        class: className,
        style,
        ...itemProps
    }: AvatarGroupItemProps = $props();

    const id = $props.id();
    let itemCount = $derived(getAvatarContext().length);
    let index = $derived(getAvatarContext().indexOf(id));
    onMount(() => {
        getAvatarContext().push(id);

        return () => {
            setAvatarContext(getAvatarContext().filter((a) => a !== id));
        };
    });

    const maskStyle = $derived.by(() => {
        let maskImage = '';

        let shouldMask = false;

        if (orientation === 'vertical' && dir === 'rtl' && reverse) {
            shouldMask = index !== itemCount - 1;
        } else {
            shouldMask = reverse ? index < itemCount - 1 : index > 0;
        }

        if (shouldMask) {
            const maskRadius = size / 2;
            const maskOffset = size / 4 + size / 10;

            if (orientation === 'vertical') {
                if (dir === 'ltr') {
                    if (reverse) {
                        maskImage = `radial-gradient(circle ${maskRadius}px at 50% ${size + maskOffset}px, transparent 99%, white 100%)`;
                    } else {
                        maskImage = `radial-gradient(circle ${maskRadius}px at 50% -${maskOffset}px, transparent 99%, white 100%)`;
                    }
                } else {
                    if (reverse) {
                        maskImage = `radial-gradient(circle ${maskRadius}px at 50% -${maskOffset}px, transparent 99%, white 100%)`;
                    } else {
                        maskImage = `radial-gradient(circle ${maskRadius}px at 50% ${size + maskOffset}px, transparent 99%, white 100%)`;
                    }
                }
            } else {
                if (dir === 'ltr') {
                    if (reverse) {
                        maskImage = `radial-gradient(circle ${maskRadius}px at ${size + maskOffset}px 50%, transparent 99%, white 100%)`;
                    } else {
                        maskImage = `radial-gradient(circle ${maskRadius}px at -${maskOffset}px 50%, transparent 99%, white 100%)`;
                    }
                } else {
                    if (reverse) {
                        maskImage = `radial-gradient(circle ${maskRadius}px at -${maskOffset}px 50%, transparent 99%, white 100%)`;
                    } else {
                        maskImage = `radial-gradient(circle ${maskRadius}px at ${size + maskOffset}px 50%, transparent 99%, white 100%)`;
                    }
                }
            }
        }

        return {
            width: size,
            height: size,
            maskImage
        };
    });

    const mergedClass = $derived(
        cn(avatarGroupVariants({ dir, orientation }), className)
    );

    const mergedProps = $derived(
        mergeProps(
            itemProps,
            { dir, orientation, class: mergedClass, style },
            // { style: maskStyle }
        )
    );
</script>

{#if child}
    {@render child?.({ props: mergedProps })}
{:else}
    <div data-slot="avatar-group-item" {...mergedProps}>
        <Avatar.Root>
            {@render children?.()}
        </Avatar.Root>
    </div>
{/if}
