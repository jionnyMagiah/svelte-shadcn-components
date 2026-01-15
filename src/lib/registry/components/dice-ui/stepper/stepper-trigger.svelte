<script lang="ts" module>
    import type { HTMLButtonAttributes } from 'svelte/elements';
    import {
        focusFirst,
        getDataState,
        getFocusIntent,
        stepperGetId,
        wrapArray,
        type NavigationDirection
    } from '.';
    import { cn } from '$lib/utils';
    import { onMount } from 'svelte';
    import { StepperTriggerState } from './context.svelte';
    import { boxWith, mergeProps } from 'svelte-toolbelt';

    interface StepperTriggerProps extends HTMLButtonAttributes {
        ref?: HTMLButtonElement | null;
    }
</script>

<script lang="ts">
    let {
        onclick: onClickProp,
        onfocus: onFocusProp,
        onkeydown: onKeyDownProp,
        onmousedown: onMouseDownProp,
        disabled,
        class: className,
        children,
        ref = $bindable(null),
        ...triggerProps
    }: StepperTriggerProps = $props();

    // todo
    //       React.useEffect(() => {
    //     function onKeyDown(event: KeyboardEvent) {
    //       if (ARROW_KEYS.includes(event.key)) {
    //         isArrowKeyPressedRef.current = true;
    //       }
    //     }
    //     function onKeyUp() {
    //       isArrowKeyPressedRef.current = false;
    //     }
    //     document.addEventListener("keydown", onKeyDown);
    //     document.addEventListener("keyup", onKeyUp);
    //     return () => {
    //       document.removeEventListener("keydown", onKeyDown);
    //       document.removeEventListener("keyup", onKeyUp);
    //     };
    //   }, []);

    const triggerState = StepperTriggerState.create({
        disabled: boxWith(() => disabled ?? false),
        onclick: boxWith(() => onClickProp ?? undefined),
        onfocus: boxWith(() => onFocusProp ?? undefined),
        onkeydown: boxWith(() => onKeyDownProp ?? undefined),
        onmousedown: boxWith(() => onMouseDownProp ?? undefined)
    });

    const mergedProps = $derived(
        mergeProps(triggerState.props, triggerProps, {
            class: cn(
                "inline-flex items-center justify-center gap-3 rounded-md text-left transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                'not-has-data-[slot=description]:rounded-full not-has-data-[slot=title]:rounded-full',
                className
            )
        })
    );
</script>

<button {...mergedProps} bind:this={ref}>{@render children?.()}</button>
<pre>{JSON.stringify(
        {
            item: triggerState.item.value,
            rootValue: triggerState.store.getState().value,
            itemState: triggerState.dataState
        },
        null,
        4
    )}</pre>
