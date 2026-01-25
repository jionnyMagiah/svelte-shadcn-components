<script lang="ts" module>
    import type { Snippet } from 'svelte';
    import type { HTMLButtonAttributes } from 'svelte/elements';
    import { ActionBarContext } from './context.svelte';
    import { mergeProps } from 'svelte-toolbelt';
    import { cn } from '$lib/utils';

    type ActionBarCloseProps = HTMLButtonAttributes & {
        child?: Snippet<[{ props: Record<string, unknown> }]>;
    };
</script>

<script lang="ts">
    let {
        child,
        children,
        class: className,
        onclick,
        ...closeProps
    }: ActionBarCloseProps = $props();

    const context = $derived(ActionBarContext.get());

    const onOpenChange = $derived(context.opts.onOpenChange?.current);

    const onCloseClick = (
        event: MouseEvent & { currentTarget: HTMLButtonElement & EventTarget }
    ) => {
        onclick?.(event);
        if (event.defaultPrevented) return;

        onOpenChange?.(false);
    };

    const mergedProps = $derived(
        mergeProps(
            {
                type: 'button',
                'data-slot': 'action-bar-close',
                class: cn(
                    "rounded-xs opacity-70 outline-none hover:opacity-100 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none [&_svg:not([class*='size-'])]:size-3.5 [&_svg]:pointer-events-none [&_svg]:shrink-0",
                    className
                ),
                onclick: onCloseClick
            },
            { ...closeProps }
        )
    );
</script>

{#if child}
    {@render child({ props: mergedProps })}
{:else}
    <button {...mergedProps}>
        {@render children?.()}
    </button>
{/if}
