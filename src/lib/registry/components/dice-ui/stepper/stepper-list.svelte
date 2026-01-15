<script lang="ts" module>
    import { cn } from '$lib/utils';
    import { boxWith, mergeProps } from 'svelte-toolbelt';
    import type { HTMLAttributes } from 'svelte/elements';
    import { FocusContextValue, StepperListState } from './context.svelte';

    interface StepperListProps extends HTMLAttributes<HTMLDivElement> {
        ref?: HTMLDivElement | null;
    }
</script>

<script lang="ts">
    let {
        onblur: onBlurProp,
        onfocus: onFocusProp,
        onmousedown: onMouseDownProp,
        class: className,
        children,
        ref = $bindable(),
        ...listProps
    }: StepperListProps = $props();

    const listState = StepperListState.create({
        onblur: boxWith(() => onBlurProp),
        onfocus: boxWith(() => onFocusProp),
        onmousedown: boxWith(() => onMouseDownProp)
    });
    const focusContext = FocusContextValue.create({});

    const mergedProps = $derived(
        mergeProps(listState.props, listProps, {
            class: cn(
                'flex flex-col items-start outline-none data-[orientation=horizontal]:flex-row data-[orientation=horizontal]:items-center',
                className
            )
        })
    );
</script>

<div {...mergedProps} bind:this={ref}>
    {@render children?.()}
</div>
