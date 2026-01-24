<script lang="ts" module>
    import { cn } from '$lib/utils';
    import { Bell } from '@lucide/svelte';
    import type { Component, Snippet } from 'svelte';
    import { prefersReducedMotion } from 'svelte/motion';

    export type NativeNotificationBellProps = {
        /**
         * Number of notifications to display.
         * Default: 0
         */
        count?: number;
        /**
         * Whether to show the notification badge.
         * Automatically true if count > 0.
         */
        showBadge?: boolean;
        /**
         * Callback when the bell is clicked.
         */
        onClick?: () => void;
        /**
         * Callback when the bell rings (on mount if has notifications).
         */
        onRing?: () => void;
        /**
         * Custom icon to replace the bell.
         */
        children?: Snippet;
        /**
         * Size variant.
         * Default: 'md'
         */
        size?: 'sm' | 'md' | 'lg';
        class?: string;
    };

    const sizeClasses = {
        sm: 'h-8 w-8',
        md: 'h-10 w-10',
        lg: 'h-12 w-12'
    };

    const iconSizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6'
    };

    const badgeSizeClasses = {
        sm: 'h-4 w-4 text-[10px]',
        md: 'h-5 w-5 text-xs',
        lg: 'h-6 w-6 text-sm'
    };

    // const ringVariants: Variants = {
    //   idle: { rotate: 0 },
    //   ringing: {
    //     rotate: [0, -15, 15, -10, 10, -5, 5, 0],
    //     transition: {
    //       duration: 0.6,
    //       ease: "easeInOut",
    //     },
    //   },
    // };
</script>

<script lang="ts">
    let {
        count = 0,
        showBadge,
        onClick,
        onRing,
        children,
        size = 'md',
        class: className
    }: NativeNotificationBellProps = $props();

    const shouldReduceMotion = prefersReducedMotion.current;
    let isRinging = $state(false);

    const hasNotifications = $derived(count > 0 || showBadge);
    const displayCount = $derived(
        count > 99 ? '99+' : count > 9 ? '9+' : count
    );

    $effect(() => {
        count;
        if (hasNotifications && !shouldReduceMotion) {
            isRinging = true;
            const timer = setTimeout(() => (isRinging = false), 600);
            onRing?.();

            return () => clearTimeout(timer);
        }
    });
</script>

<button
    onclick={() => {
        count++;
    }}>ring</button
>
<div class="relative inline-block">
    <button
        data-ringing={isRinging ? true : undefined}
        aria-label={`Notifications${count > 0 ? `, ${count} unread` : ''}`}
        class={cn(
            'relative flex items-center justify-center rounded-full border border-border bg-card transition-colors hover:bg-muted focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none',
            { 'hover:scale-110': !shouldReduceMotion },
            { 'active:scale-90': !shouldReduceMotion },
            sizeClasses[size],
            className,
            { 'animate-ringing': isRinging }
        )}
    >
        {#if children}
            {@render children?.()}
        {:else}
            <Bell class={iconSizeClasses[size]} />
        {/if}
        {#if hasNotifications}
            <span
                class={cn(
                    'text-destructive-foreground absolute -top-1 -right-1 flex items-center justify-center rounded-full bg-destructive font-bold',
                    badgeSizeClasses[size]
                )}
            >
                {count > 0 ? displayCount : ''}
            </span>
        {/if}
    </button>
</div>

<style>
    .animate-ringing {
        animation: ringing 0.6s ease-in-out;
    }

    @keyframes ringing {
        0% {
            transform: rotate(0deg);
        }
        12.5% {
            transform: rotate(-15deg);
        }
        25% {
            transform: rotate(15deg);
        }
        37.5% {
            transform: rotate(-10deg);
        }
        50% {
            transform: rotate(10deg);
        }
        62.5% {
            transform: rotate(-5deg);
        }
        75% {
            transform: rotate(5deg);
        }
        100% {
            transform: rotate(0deg);
        }
    }
</style>
