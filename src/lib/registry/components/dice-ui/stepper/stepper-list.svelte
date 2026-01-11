<script lang="ts" module>
    import type { Snippet } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';
    import {
        getStepperContextStore,
        getStepperContextValue,
        setStepperContextFocusValue,
        type StepperContextFocusValue
    } from './context';
    import { ENTRY_FOCUS, EVENT_OPTIONS, focusFirst, type ItemData } from '.';
    import { SvelteMap } from 'svelte/reactivity';
    import { cn } from '$lib/utils';

    export type StepperListProps = HTMLAttributes<HTMLDivElement> & {
        children?: Snippet;
        ref?: HTMLDivElement;
    };
</script>

<script lang="ts">
    //todo: https://www.bits-ui.com/docs/ref#creating-your-own-ref-props
    let {
        onblur,
        onfocus,
        onmousedown,
        class: className,
        children,
        ref = $bindable(),
        ...listProps
    }: StepperListProps = $props();

    const context = $derived(getStepperContextValue()());
    const orientation = $derived(context.orientation);
    const currentValue = $derived(
        getStepperContextStore()().getState().value()
    );

    let tabStopId = $state<string | null>(null);
    let isTabbingBackOut = $state(false);
    let focusableItemCount = $state(0);
    let isClickFocusRef = $state(false);
    let itemsRef = new SvelteMap<string, ItemData>();

    const onItemFocus = (_tabStopId: string) => {
        tabStopId = _tabStopId;
    };

    const onItemShiftTab = () => {
        isTabbingBackOut = true;
    };

    const onFocusableItemAdd = () => {
        focusableItemCount++;
    };

    const onFocusableItemRemove = () => {
        focusableItemCount--;
    };

    const onItemRegister = (item: ItemData) => {
        itemsRef.set(item.id, item);
    };

    const onItemUnregister = (id: string) => {
        itemsRef.delete(id);
    };

    const getItems = () => {
        return Array.from(itemsRef.values())
            .filter((item) => item.ref)
            .sort((a, b) => {
                const elementA = a.ref;
                const elementB = b.ref;
                if (!elementA || !elementB) return 0;
                const position = elementA.compareDocumentPosition(elementB);
                if (position & Node.DOCUMENT_POSITION_FOLLOWING) {
                    return -1;
                }
                if (position & Node.DOCUMENT_POSITION_PRECEDING) {
                    return 1;
                }
                return 0;
            });
    };

    function onBlur(
        event: FocusEvent & { currentTarget: EventTarget & HTMLDivElement }
    ) {
        onblur?.(event);
        if (event.defaultPrevented) return;

        isTabbingBackOut = false;
    }

    function onFocus(
        event: FocusEvent & { currentTarget: EventTarget & HTMLDivElement }
    ) {
        onfocus?.(event);
        if (event.defaultPrevented) return;

        const isKeyboardFocus = !isClickFocusRef;
        if (
            event.target === event.currentTarget &&
            isKeyboardFocus &&
            !isTabbingBackOut
        ) {
            const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
            event.currentTarget.dispatchEvent(entryFocusEvent);

            if (!entryFocusEvent.defaultPrevented) {
                const items = Array.from(itemsRef.values()).filter(
                    (item) => !item.disabled
                );
                const selectedItem = currentValue
                    ? items.find((item) => item.value() === currentValue)
                    : undefined;
                const activeItem = items.find((item) => item.active);
                const currentItem = items.find((item) => item.id === tabStopId);

                const candidateItems = [
                    selectedItem,
                    activeItem,
                    currentItem,
                    ...items
                ].filter(Boolean) as ItemData[];
                const candidateRefs = candidateItems.map((item) => item.ref);
                focusFirst(candidateRefs, false);
            }
        }
        isClickFocusRef = false;
    }

    function onMouseDown(
        event: MouseEvent & { currentTarget: EventTarget & HTMLDivElement }
    ) {
        onmousedown?.(event);
        if (event.defaultPrevented) return;
        isClickFocusRef = true;
    }

    const contextFocusValueValue: StepperContextFocusValue = $derived({
        tabStopId,
        onItemFocus,
        onItemShiftTab,
        onFocusableItemAdd,
        onFocusableItemRemove,
        onItemRegister,
        onItemUnregister,
        getItems
    });

    setStepperContextFocusValue(() => contextFocusValueValue);
</script>

<div
    role="tablist"
    aria-orientation={orientation}
    data-orientation={orientation}
    data-slot="stepper-list"
    dir={context.dir}
    tabIndex={isTabbingBackOut || focusableItemCount === 0 ? -1 : 0}
    {...listProps}
    bind:this={ref}
    class={cn(
        'flex outline-none',
        orientation === 'horizontal'
            ? 'flex-row items-center'
            : 'flex-col items-start',
        className
    )}
    onblur={onBlur}
    onfocus={onFocus}
    onmousedown={onMouseDown}
>
    {@render children?.()}
</div>
