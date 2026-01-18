<script lang="ts" module>
    import { cn } from '$lib/utils';
    import type { Snippet } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';
    import { SvelteMap } from 'svelte/reactivity';

    export type BadgeOverflowProps<T> = HTMLAttributes<HTMLDivElement> & {
        items: T[];
        getBadgeLabel?: (item: T) => string;
        lineCount?: number;
        renderBadge: Snippet<[{ item: T; label: string }]>;
        renderOverflow?: Snippet<[number]>;
        ref?: HTMLDivElement;
    };
</script>

<script lang="ts" generics="T">
    const {
        items,
        getBadgeLabel: getBadgeLabelProp,
        lineCount = 1,
        renderBadge,
        renderOverflow,
        class: className,
        style,
        ref,
        ...rootProps
    }: BadgeOverflowProps<T> = $props();

    const getBadgeLabel = (item: T): string => {
        if (typeof item === 'object' && !getBadgeLabelProp) {
            throw new Error(
                '`getBadgeLabel` is required when using array of objects'
            );
        }
        return getBadgeLabelProp ? getBadgeLabelProp(item) : (item as string);
    };

    let rootRef = $state<HTMLDivElement>(null!);
    let measureRef = $state<HTMLDivElement>(null!);
    let containerWidth = $state(0);
    let badgeGap = $state(4);
    let badgeHeight = $state(20);
    let overflowBadgeWidth = $state(40);
    let isMeasured = $state(false);
    // todo: use sveltemap
    let badgeWidths = new SvelteMap<string, number>();

    const placeholderHeight = $derived(
        badgeHeight * lineCount + badgeGap * (lineCount - 1)
    );

    const { visibleItems, hiddenCount } = $derived.by(() => {
        if (!containerWidth || items.length === 0 || badgeWidths.size === 0) {
            return { visibleItems: items, hiddenCount: 0 };
        }

        let currentLineWidth = 0;
        let currentLine = 1;
        const visible: T[] = [];

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (!item) continue;

            const label = getBadgeLabel(item);
            const badgeWidth = badgeWidths.get(label);

            if (!badgeWidth) {
                // Skip items that haven't been measured yet
                continue;
            }

            const widthWithGap = badgeWidth + badgeGap;
            const isLastLine = currentLine === lineCount;
            const hasMoreItems = i < items.length - 1;

            const availableWidth =
                isLastLine && hasMoreItems
                    ? containerWidth - overflowBadgeWidth - badgeGap
                    : containerWidth;

            if (currentLineWidth + widthWithGap <= availableWidth) {
                currentLineWidth += widthWithGap;
                visible.push(item);
            } else if (currentLine < lineCount) {
                currentLine++;
                currentLineWidth = widthWithGap;
                visible.push(item);
            } else {
                // We're on the last line and this badge doesn't fit
                break;
            }
        }

        return {
            visibleItems: visible,
            hiddenCount: Math.max(0, items.length - visible.length)
        };
    });

    $effect(() => {
        if (!rootRef || !measureRef) return;

        function measureContainer() {
            if (!rootRef || !measureRef) return;

            const computedStyle = getComputedStyle(rootRef);

            const gapValue = computedStyle.gap;
            const gap = gapValue ? parseFloat(gapValue) : 4;

            badgeGap = gap;

            const paddingLeft = parseFloat(computedStyle.paddingLeft) || 0;
            const paddingRight = parseFloat(computedStyle.paddingRight) || 0;
            const totalPadding = paddingLeft + paddingRight;

            const widthMap = new SvelteMap<string, number>();
            const measureChildren = measureRef.children;

            for (let i = 0; i < items.length; i++) {
                const child = measureChildren[i] as HTMLElement | undefined;
                if (child) {
                    const label = getBadgeLabel(items[i] as T);
                    widthMap.set(label, child.offsetWidth);
                }
            }
            badgeWidths = widthMap;

            const firstBadge = measureChildren[0] as HTMLElement | undefined;
            if (firstBadge) {
                badgeHeight = firstBadge.offsetHeight || 20;
            }

            const overflowChild = measureChildren[items.length] as
                | HTMLElement
                | undefined;

            if (overflowChild) {
                overflowBadgeWidth = overflowChild.offsetWidth || 40;
            }

            const width = rootRef.clientWidth - totalPadding;
            containerWidth = width;
            isMeasured = true;
        }

        measureContainer();

        const resizeObserver = new ResizeObserver(measureContainer);
        resizeObserver.observe(rootRef);

        return () => {
            resizeObserver.disconnect();
        };
    });
</script>

<div
    bind:this={measureRef}
    class="pointer-events-none invisible absolute top-0 flex flex-wrap"
    style:gap={`${badgeGap}px`}
>
    {#each items as item, i}
        {@render renderBadge({ item, label: getBadgeLabel(item) })}
    {/each}

    {#if renderOverflow}
        {@render renderOverflow(99)}
    {:else}
        <div
            class="inline-flex h-5 shrink-0 items-center rounded-md border px-1.5 text-xs font-semibold"
        >
            +99
        </div>
    {/if}
</div>
{#if isMeasured}
    <div
        bind:this={rootRef}
        data-slot="badge-overflow"
        {...rootProps}
        class={cn('flex flex-wrap ', className)}
        {style}
        style:gap={`${badgeGap}px`}
    >
        {#each visibleItems as item, i}
            {@render renderBadge({ item, label: getBadgeLabel(item) })}
        {/each}
        {#if hiddenCount > 0}
            {#if renderOverflow}
                {@render renderOverflow(hiddenCount)}
            {:else}
                <div
                    class="inline-flex h-5 shrink-0 items-center rounded-md border px-1.5 text-xs font-semibold"
                >
                    +{hiddenCount}
                </div>
            {/if}
        {/if}
    </div>
{:else}
    {@const sliceTop = Math.min(
        items.length,
        lineCount * 3 - (lineCount > 1 ? 1 : 0)
    )}
    <div
        bind:this={rootRef}
        data-slot="badge-overflow"
        {...rootProps}
        class={cn('gap flex flex-wrap', className)}
        {style}
        style:gap={`${badgeGap}px`}
        style:min-height={`${placeholderHeight}px`}
    >
        {#each items.slice(0, sliceTop) as item, idenx}
            {@render renderBadge({ item, label: getBadgeLabel(item) })}
        {/each}
    </div>
{/if}
