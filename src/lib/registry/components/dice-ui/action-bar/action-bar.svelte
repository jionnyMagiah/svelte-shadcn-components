<script lang="ts" module>
    import { cn } from '$lib/utils';
    import { Portal, type Direction, type Orientation } from 'bits-ui';
    import { watch } from 'runed';
    import { onMount } from 'svelte';
    import { boxWith } from 'svelte-toolbelt';
    import type { HTMLAttributes } from 'svelte/elements';
    import { ActionBarContextState } from './context.svelte';

    interface ActionBarProps extends HTMLAttributes<HTMLDivElement> {
        open?: boolean; // todo: make bindable
        onOpenChange?: (open: boolean) => void;
        onEscapeKeyDown?: (event: KeyboardEvent) => void;
        align?: 'start' | 'center' | 'end';
        alignOffset?: number;
        side?: 'top' | 'bottom';
        sideOffset?: number;
        portalContainer?: Element | null;
        dir?: Direction;
        orientation?: Orientation;
        loop?: boolean;
        ref?: HTMLDivElement | null;
    }
</script>

<script lang="ts">
    import { mergeProps } from 'svelte-toolbelt';

    let {
        open = false,
        onOpenChange,
        onEscapeKeyDown,
        side = 'bottom',
        alignOffset = 0,
        align = 'center',
        sideOffset = 16,
        portalContainer: portalContainerProp,
        dir = 'ltr',
        orientation = 'horizontal',
        loop = true,
        class: className,
        style,
        ref = $bindable(null),
        children,
        ...rootProps
    }: ActionBarProps = $props();

    let mounted = $state(false);

    onMount(() => {
        mounted = true;
    });

    watch([() => open, () => onEscapeKeyDown, () => onOpenChange], () => {
        if (!open) return;

        const ownerDocument = ref?.ownerDocument ?? document;

        function onKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                onEscapeKeyDown?.(event);
                if (!event.defaultPrevented) {
                    onOpenChange?.(false);
                }
            }
        }

        ownerDocument.addEventListener('keydown', onKeyDown);
        return () => ownerDocument.removeEventListener('keydown', onKeyDown);
    });

    ActionBarContextState.create({
        dir: boxWith(() => dir),
        loop: boxWith(() => loop),
        orientation: boxWith(() => orientation),
        onOpenChange: boxWith(() => onOpenChange)
    });

    const portalContainer = $derived(
        portalContainerProp ?? (mounted ? globalThis.document?.body : null)
    );
    const empty = $derived(!portalContainer || !open);

    const styleAlign = $derived.by(() => {
        switch (align) {
            case 'center':
                return `left: 50%; translate: -50% 0`;
            case 'start':
                return `left: ${alignOffset}px`;
            case 'end':
                return `right: ${alignOffset}px`;
        }
    });

    const styleSide = $derived(`${side}: ${sideOffset}px`);

    const mergedProps = $derived(
        mergeProps(
            {
                style: style,
                dir: dir,
                role: 'toolbar',
                'aria-orientation': orientation,
                'data-slot': 'action-bar',
                'data-side': side,
                'data-align': align,
                'data-orientation': orientation,
                class: cn(
                    'fixed z-50 rounded-lg border bg-card shadow-lg outline-none',
                    'animate-in duration-250 fade-in-0 zoom-in-95 [animation-timing-function:cubic-bezier(0.16,1,0.3,1)]',
                    'data-[side=bottom]:slide-in-from-bottom-4 data-[side=top]:slide-in-from-top-4',
                    'motion-reduce:animate-none motion-reduce:transition-none',
                    orientation === 'horizontal'
                        ? 'flex flex-row items-center gap-2 px-2 py-1.5'
                        : 'flex flex-col items-start gap-2 px-1.5 py-2',
                    className
                )
            },
            { style: styleAlign },
            { style: styleSide },
            { ...rootProps }
        )
    );
</script>

{#if !empty && portalContainer !== null}
    <Portal to={portalContainer}>
        <div bind:this={ref} {...mergedProps}>
            {@render children?.()}
        </div>
    </Portal>
{/if}
