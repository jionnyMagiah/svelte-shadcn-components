<script lang="ts" module>
    import {
        mergeProps,
        type PopoverContentProps,
        type PopoverRootProps
    } from 'bits-ui';
    import type { HTMLButtonAttributes } from 'svelte/elements';
    import { tv, type VariantProps } from 'tailwind-variants';

    const triggerVariants = tv({
        base: 'inline-flex w-fit items-center justify-center text-foreground/70 text-sm transition-colors hover:text-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',

        variants: {
            variant: {
                default: '',
                muted: 'text-foreground/50 hover:text-foreground/70',
                ghost: 'hover:underline'
            }
        },
        defaultVariants: {
            variant: 'default'
        }
    });
    export type RelativeTimeCardProps = HTMLButtonAttributes &
        PopoverRootProps &
        Pick<
            PopoverContentProps,
            | 'align'
            | 'side'
            | 'alignOffset'
            | 'sideOffset'
            | 'avoidCollisions'
            | 'collisionBoundary'
            | 'collisionPadding'
        > &
        VariantProps<typeof triggerVariants> & {
            date: Date | string | number;
            timezones?: string[];
            updateInterval?: number;
            openDelay?: number;
            closeDelay?: number;
            child?: Snippet<[{ props: Record<string, unknown> }]>;
        };
</script>

<script lang="ts">
    import TimezoneCard from './timezone-card.svelte';
    import { cn } from '$lib/utils';
    import * as Popover from '$lib/components/ui/popover/index.js';
    import type { Snippet } from 'svelte';

    let {
        date: dateProp,
        variant,
        timezones = ['UTC'],
        open,
        onOpenChange,
        openDelay = 500,
        closeDelay = 300,
        align,
        side,
        alignOffset,
        sideOffset,
        avoidCollisions,
        collisionBoundary,
        collisionPadding,
        updateInterval = 1000,
        child: triggerChild,
        children,
        class: className,
        ...triggerProps
    }: RelativeTimeCardProps = $props();

    const date = $derived(
        dateProp instanceof Date ? dateProp : new Date(dateProp)
    );

    const locale = Intl.DateTimeFormat().resolvedOptions().locale;

    let formattedTime = $derived(date.toLocaleDateString());

    $effect(() => {
        formattedTime = formatRelativeTime(date);
        const timer = setInterval(() => {
            formattedTime = formatRelativeTime(date);
        }, updateInterval);

        return () => clearInterval(timer);
    });

    function formatRelativeTime(date: Date): string {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const isInFuture = diff < 0;
        const absDiff = Math.abs(diff);

        const seconds = Math.floor(absDiff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (seconds < 5) return 'just now';

        if (isInFuture) {
            if (seconds < 60) return `in ${pluralize(seconds, 'second')}`;
            if (minutes < 60) return `in ${pluralize(minutes, 'minute')}`;
            if (hours < 24) return `in ${pluralize(hours, 'hour')}`;
            if (days < 7) return `in ${pluralize(days, 'day')}`;
            return date.toLocaleDateString();
        }

        if (seconds < 60) return `${pluralize(seconds, 'second')} ago`;
        if (minutes < 60)
            return `${pluralize(minutes, 'minute')} ${pluralize(seconds % 60, 'second')} ago`;
        if (hours < 24) return `${pluralize(hours, 'hour')} ago`;
        if (days < 7) return `${pluralize(days, 'day')} ago`;
        return date.toLocaleDateString();
    }

    function pluralize(n: number, word: string) {
        return `${n} ${word}${n === 1 ? '' : 's'}`;
    }
</script>

<Popover.Root {open} {onOpenChange}>
    {#if triggerChild}
        <Popover.Trigger openOnHover {openDelay} {closeDelay}>
            {#snippet child({ props })}
                {@render triggerChild({
                    props: mergeProps(props, triggerProps)
                })}
            {/snippet}
        </Popover.Trigger>
    {:else}
        <Popover.Trigger
            openOnHover
            {openDelay}
            {closeDelay}
            class={cn(triggerVariants({ variant }), className)}
        >
            {#if children}
                {@render children?.()}
            {:else}
                <time datetime={date.toISOString()}>
                    {new Intl.DateTimeFormat(locale, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    }).format(date)}
                </time>
            {/if}
        </Popover.Trigger>
    {/if}
    <Popover.Content
        {side}
        {align}
        {sideOffset}
        {alignOffset}
        {avoidCollisions}
        {collisionBoundary}
        {collisionPadding}
        class="flex w-full max-w-[420px] flex-col gap-2 p-3"
    >
        <time
            dateTime={date.toISOString()}
            class="text-sm text-muted-foreground"
        >
            {formattedTime}
        </time>
        <div role="list" class="flex flex-col gap-1">
            {#each timezones as timezone}
                <!-- key={timezone} -->
                <TimezoneCard role="listitem" {date} {timezone} />
            {/each}
            <TimezoneCard role="listitem" {date} />
        </div>
    </Popover.Content>
</Popover.Root>
