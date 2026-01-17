<script lang="ts" module>
    import { cn } from '$lib/utils';
    import type { HTMLAttributes } from 'svelte/elements';
    import { tv, type VariantProps } from 'tailwind-variants';
    import ScrollerButton from './scroller-button.svelte';

    const DATA_TOP_SCROLL = 'data-top-scroll';
    const DATA_BOTTOM_SCROLL = 'data-bottom-scroll';
    const DATA_LEFT_SCROLL = 'data-left-scroll';
    const DATA_RIGHT_SCROLL = 'data-right-scroll';
    const DATA_TOP_BOTTOM_SCROLL = 'data-top-bottom-scroll';
    const DATA_LEFT_RIGHT_SCROLL = 'data-left-right-scroll';

    const scrollerVariants = tv({
        base: '',
        variants: {
            orientation: {
                vertical: [
                    'overflow-y-auto',
                    'data-[top-scroll=true]:[mask-image:linear-gradient(0deg,#000_calc(100%_-_var(--scroll-shadow-size)),transparent)]',
                    'data-[bottom-scroll=true]:[mask-image:linear-gradient(180deg,#000_calc(100%_-_var(--scroll-shadow-size)),transparent)]',
                    'data-[top-bottom-scroll=true]:[mask-image:linear-gradient(#000,#000,transparent_0,#000_var(--scroll-shadow-size),#000_calc(100%_-_var(--scroll-shadow-size)),transparent)]'
                ],
                horizontal: [
                    'overflow-x-auto',
                    'data-[left-scroll=true]:[mask-image:linear-gradient(270deg,#000_calc(100%_-_var(--scroll-shadow-size)),transparent)]',
                    'data-[right-scroll=true]:[mask-image:linear-gradient(90deg,#000_calc(100%_-_var(--scroll-shadow-size)),transparent)]',
                    'data-[left-right-scroll=true]:[mask-image:linear-gradient(to_right,#000,#000,transparent_0,#000_var(--scroll-shadow-size),#000_calc(100%_-_var(--scroll-shadow-size)),transparent)]'
                ]
            },
            hideScrollbar: {
                true: '[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
                false: ''
            }
        },
        defaultVariants: {
            orientation: 'vertical',
            hideScrollbar: false
        }
    });

    export type ScrollDirection = 'up' | 'down' | 'left' | 'right';

    type ScrollVisibility = {
        [key in ScrollDirection]: boolean;
    };

    export interface ScrollerRootProps
        extends
            VariantProps<typeof scrollerVariants>,
            HTMLAttributes<HTMLDivElement> {
        size?: number;
        offset?: number;
        withNavigation?: boolean;
        scrollStep?: number;
        scrollTriggerMode?: 'press' | 'hover' | 'click';
        ref?: HTMLDivElement;
    }
</script>

<script lang="ts">
    let {
        orientation = 'vertical',
        hideScrollbar,
        class: className,
        size = 40,
        offset = 0,
        scrollStep = 40,
        style,
        children,
        withNavigation = false,
        scrollTriggerMode = 'press',
        ref = $bindable(null!),
        ...scrollerProps
    }: ScrollerRootProps = $props();

    let scrollVisibility = $state<ScrollVisibility>({
        up: false,
        down: false,
        left: false,
        right: false
    });

    function onScrollBy(direction: ScrollDirection) {
        if (!ref) return;

        const scrollMap: Record<ScrollDirection, () => void> = {
            up: () => (ref.scrollTop -= scrollStep),
            down: () => (ref.scrollTop += scrollStep),
            left: () => (ref.scrollLeft -= scrollStep),
            right: () => (ref.scrollLeft += scrollStep)
        };

        scrollMap[direction]();
    }
    const scrollHandlers = $derived.by(() => ({
        up: () => onScrollBy('up'),
        down: () => onScrollBy('down'),
        left: () => onScrollBy('left'),
        right: () => onScrollBy('right')
    }));

    $effect(() => {
        if (!ref) return;

        function onScroll() {
            if (!ref) return;

            const isVertical = orientation === 'vertical';

            if (isVertical) {
                const scrollTop = ref.scrollTop;
                const clientHeight = ref.clientHeight;
                const scrollHeight = ref.scrollHeight;

                if (withNavigation) {
                    scrollVisibility = ((prev) => {
                        const newUp = scrollTop > offset;
                        const newDown = scrollTop + clientHeight < scrollHeight;

                        if (prev.up !== newUp || prev.down !== newDown) {
                            return {
                                ...prev,
                                up: newUp,
                                down: newDown
                            };
                        }
                        return prev;
                    })(scrollVisibility);
                }

                const hasTopScroll = scrollTop > offset;
                const hasBottomScroll =
                    scrollTop + clientHeight + offset < scrollHeight;
                const isVerticallyScrollable = scrollHeight > clientHeight;

                if (hasTopScroll && hasBottomScroll && isVerticallyScrollable) {
                    ref.setAttribute(DATA_TOP_BOTTOM_SCROLL, 'true');
                    ref.removeAttribute(DATA_TOP_SCROLL);
                    ref.removeAttribute(DATA_BOTTOM_SCROLL);
                } else {
                    ref.removeAttribute(DATA_TOP_BOTTOM_SCROLL);
                    if (hasTopScroll) ref.setAttribute(DATA_TOP_SCROLL, 'true');
                    else ref.removeAttribute(DATA_TOP_SCROLL);
                    if (hasBottomScroll && isVerticallyScrollable)
                        ref.setAttribute(DATA_BOTTOM_SCROLL, 'true');
                    else ref.removeAttribute(DATA_BOTTOM_SCROLL);
                }
            }

            const scrollLeft = ref.scrollLeft;
            const clientWidth = ref.clientWidth;
            const scrollWidth = ref.scrollWidth;

            if (withNavigation) {
                scrollVisibility = ((prev) => {
                    const newLeft = scrollLeft > offset;
                    const newRight = scrollLeft + clientWidth < scrollWidth;

                    if (prev.left !== newLeft || prev.right !== newRight) {
                        return {
                            ...prev,
                            left: newLeft,
                            right: newRight
                        };
                    }
                    return prev;
                })(scrollVisibility);
            }

            const hasLeftScroll = scrollLeft > offset;
            const hasRightScroll =
                scrollLeft + clientWidth + offset < scrollWidth;
            const isHorizontallyScrollable = scrollWidth > clientWidth;

            if (hasLeftScroll && hasRightScroll && isHorizontallyScrollable) {
                ref.setAttribute(DATA_LEFT_RIGHT_SCROLL, 'true');
                ref.removeAttribute(DATA_LEFT_SCROLL);
                ref.removeAttribute(DATA_RIGHT_SCROLL);
            } else {
                ref.removeAttribute(DATA_LEFT_RIGHT_SCROLL);
                if (hasLeftScroll) ref.setAttribute(DATA_LEFT_SCROLL, 'true');
                else ref.removeAttribute(DATA_LEFT_SCROLL);
                if (hasRightScroll && isHorizontallyScrollable)
                    ref.setAttribute(DATA_RIGHT_SCROLL, 'true');
                else ref.removeAttribute(DATA_RIGHT_SCROLL);
            }
        }

        onScroll();
        ref?.addEventListener('scroll', onScroll);
        window.addEventListener('resize', onScroll);

        return () => {
            ref?.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    });

    const activeDirection: ['up', 'down'] | ['left', 'right'] | [] =
        $derived.by(() => {
            if (!withNavigation) return [];
            return orientation === 'vertical'
                ? ['up', 'down']
                : ['left', 'right'];
        });
</script>

{#if withNavigation}
    <div class="relative w-full">
        {@render navigationButtons()}
        {@render scrollerImpl()}
    </div>
    {:else}
        {@render scrollerImpl()}
{/if}

{#snippet scrollerImpl()}
    <div
        data-slot="scroller"
        {...scrollerProps}
        bind:this={ref}
        {style}
        style:--scroll-shadow-size={`${size}px`}
        class={cn(scrollerVariants({ orientation, hideScrollbar }), className)}
    >
        {@render children?.()}
    </div>
{/snippet}

{#snippet navigationButtons()}
    {#if withNavigation}
        {#each activeDirection.filter((direction) => scrollVisibility[direction]) as dir, i (i)}
            <ScrollerButton
                data-slot="scroll-button"
                direction={dir}
                onclick={scrollHandlers[dir]}
                triggerMode={scrollTriggerMode}
            />
        {/each}
    {/if}
{/snippet}
