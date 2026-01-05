<!-- Inspired by https://www.diceui.com/docs/components/action-bar -->

<script lang="ts" module>
    type Direction = 'ltr' | 'rtl';
    type Orientation = 'horizontal' | 'vertical';
    export type ActionBarRootProps = HTMLAttributes<HTMLDivElement> & {
        align?: 'start' | 'end' | 'center';
        side?: 'top' | 'bottom';
        children: Snippet;
        open?: boolean;
        onOpenChange?: (open: boolean) => void;
        onEscapeKeyDown?: (event: KeyboardEvent) => void;
        alignOffset?: number;
        sideOffset?: number;
        portalContainer?: Element | DocumentFragment | null;
        dir?: Direction;
        orientation?: Orientation;
        loop?: boolean;
        ref?: HTMLDivElement;
    };
</script>

<script lang="ts">
    import { cn } from '$lib/utils';
    import type { Snippet } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';

    let {
        open = false,
        onOpenChange,
        children,
        onEscapeKeyDown,
        side = 'bottom',
        alignOffset = 0,
        align = 'center',
        sideOffset = 16,
        portalContainer: portalContainerProp,
        dir,
        orientation = 'horizontal',
        loop = true,
        class: className,
        style,
        ref,
        ...rootProps
    }: ActionBarRootProps = $props();
</script>

<div
    role="toolbar"
    aria-orientation={orientation}
    data-slot="action-bar"
    data-side={side}
    data-align={align}
    data-orientation={orientation}
    {dir}
    {...rootProps}
    bind:this={ref}
    class={cn(
        'fixed z-50 rounded-lg border bg-card shadow-lg outline-none',
        'animate-in duration-250 fade-in-0 zoom-in-95 [animation-timing-function:cubic-bezier(0.16,1,0.3,1)]',
        'data-[side=bottom]:slide-in-from-bottom-4 data-[side=top]:slide-in-from-top-4',
        'motion-reduce:animate-none motion-reduce:transition-none',
        orientation === 'horizontal'
            ? 'flex flex-row items-center gap-2 px-2 py-1.5'
            : 'flex flex-col items-start gap-2 px-1.5 py-2',
        className,
    )}
    style="left:50%; translate: '-50% 0'"
  
>
    {@render children?.()}
</div>

  <!-- style={{
        [side]: `${sideOffset}px`,
        ...(align === 'center' && {
            left: '50%',
            translate: '-50% 0'
        }),
        ...(align === 'start' && { left: `${alignOffset}px` }),
        ...(align === 'end' && { right: `${alignOffset}px` }),
    }} -->