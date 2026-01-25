<script lang="ts" module>
    import { cn } from '$lib/utils';
    import type { HTMLAttributes } from 'svelte/elements';
    import { SvelteMap } from 'svelte/reactivity';
    import {
        ActionBarContext,
        ActionBarFocusContextState,
        type ItemData
    } from './context.svelte';
    import { boxWith } from 'svelte-toolbelt';

    type ActionBarGroupProps = HTMLAttributes<HTMLDivElement> & {
        ref?: HTMLDivElement | null;
    };
</script>

<script lang="ts">
    let {
        onblur: onBlurProp,
        onfocus: onFocusProp,
        onmousedown: onMouseDownProp,
        class: className,
        children,
        ref = $bindable(null),
        ...groupProps
    }: ActionBarGroupProps = $props();

    const context = $derived(ActionBarContext.get());
    const dir = $derived(context.opts.dir.current);
    const orientation = $derived(context.opts.orientation.current);
    const focusContext = ActionBarFocusContextState.create({
        onBlurProp: boxWith(() => onBlurProp),
        onFocusProp: boxWith(() => onFocusProp),
        onMouseDownProp: boxWith(() => onMouseDownProp)
    });
</script>

<div
    role="group"
    data-slot="action-bar-group"
    data-orientation={orientation}
    {dir}
    tabIndex={focusContext.isTabbingBackOut ||
    focusContext.focusableItemCount === 0
        ? -1
        : 0}
    {...groupProps}
    bind:this={ref}
    class={cn(
        'flex gap-2 outline-none',
        orientation === 'horizontal'
            ? 'items-center'
            : 'w-full flex-col items-start',
        className
    )}
    onblur={focusContext.onBlur}
    onfocus={focusContext.onFocus}
    onmousedown={focusContext.onMouseDown}
>
    {@render children?.()}
</div>
