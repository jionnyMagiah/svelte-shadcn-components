<script lang="ts" module>
    import Button, {
        type ButtonProps
    } from '$lib/components/ui/button/button.svelte';
    import { cn } from '$lib/utils';
    import { watch } from 'runed';
    import { wrapArray } from '../stepper';
    import { ActionBarContext, ActionBarFocusContext } from './context.svelte';
    import { focusFirst, getDirectionAwareKey, ITEM_SELECT } from './utils';

    type ActionBarItemProps = Omit<
        ButtonProps,
        'onselect' | 'onclick' | 'onfocus' | 'onkeydown' | 'onmousedown'
    > & {
        onselect?: (event: Event) => void;
        onclick?: (event: OnMouseEvent) => void;
        onfocus?: (event: OnFocusEvent) => void;
        onkeydown?: (event: OnKeyboardEvent) => void;
        onmousedown?: (event: OnMouseEvent) => void;
        ref?: HTMLButtonElement | null;
    };

    type OnMouseEvent =
        | (MouseEvent & {
              currentTarget: EventTarget & HTMLButtonElement;
          })
        | (MouseEvent & {
              currentTarget: EventTarget & HTMLAnchorElement;
          });
    type OnFocusEvent =
        | (FocusEvent & {
              currentTarget: EventTarget & HTMLButtonElement;
          })
        | (FocusEvent & {
              currentTarget: EventTarget & HTMLAnchorElement;
          });
    type OnKeyboardEvent =
        | (KeyboardEvent & {
              currentTarget: EventTarget & HTMLButtonElement;
          })
        | (KeyboardEvent & {
              currentTarget: EventTarget & HTMLAnchorElement;
          });
</script>

<script lang="ts">
    let {
        onselect,
        onclick: onClickProp,
        onfocus: onFocusProp,
        onkeydown: onKeyDownProp,
        onmousedown: onMouseDownProp,
        class: className,
        disabled,
        children,
        ref = $bindable(null),
        ...itemProps
    }: ActionBarItemProps = $props();

    let isMouseClickRef = $state(false);

    const context = $derived(ActionBarContext.get());
    const focusContext = $derived(ActionBarFocusContext.get());

    const onOpenChange = $derived(context.opts.onOpenChange?.current);
    const dir = $derived(context.opts.dir?.current);
    const orientation = $derived(context.opts.orientation?.current);
    const loop = $derived(context.opts.loop?.current);

    const itemId = $props.id();
    const isTabStop = $derived(focusContext.tabStopId === itemId);

    watch([() => focusContext, () => itemId, () => disabled], () => {
        // check this if statement
        if (!ref) return;
        focusContext.onItemRegister({
            id: itemId,
            ref: ref,
            disabled: !!disabled
        });

        if (!disabled) {
            focusContext.onFocusableItemAdd();
        }

        return () => {
            focusContext.onItemUnregister(itemId);
            if (!disabled) {
                focusContext.onFocusableItemRemove();
            }
        };
    });

    const onClick = (event: OnMouseEvent) => {
        onClickProp?.(event);
        if (event.defaultPrevented) return;

        const item = ref;
        if (!item) return;

        const itemSelectEvent = new CustomEvent(ITEM_SELECT, {
            bubbles: true,
            cancelable: true
        });

        item.addEventListener(ITEM_SELECT, (event) => onselect?.(event), {
            once: true
        });

        item.dispatchEvent(itemSelectEvent);

        if (!itemSelectEvent.defaultPrevented) {
            onOpenChange?.(false);
        }
    };

    const onFocus = (event: OnFocusEvent) => {
        onFocusProp?.(event);
        if (event.defaultPrevented) return;

        focusContext.onItemFocus(itemId);
        isMouseClickRef = false;
    };

    const onKeyDown = (event: OnKeyboardEvent) => {
        onKeyDownProp?.(event);
        if (event.defaultPrevented) return;

        if (event.key === 'Tab' && event.shiftKey) {
            focusContext.onItemShiftTab();
            return;
        }

        if (event.target !== event.currentTarget) return;

        const key = getDirectionAwareKey(event.key, dir);
        let focusIntent: 'first' | 'last' | 'prev' | 'next' | undefined;

        if (orientation === 'horizontal') {
            if (key === 'ArrowLeft') focusIntent = 'prev';
            else if (key === 'ArrowRight') focusIntent = 'next';
            else if (key === 'Home') focusIntent = 'first';
            else if (key === 'End') focusIntent = 'last';
        } else {
            if (key === 'ArrowUp') focusIntent = 'prev';
            else if (key === 'ArrowDown') focusIntent = 'next';
            else if (key === 'Home') focusIntent = 'first';
            else if (key === 'End') focusIntent = 'last';
        }

        if (focusIntent !== undefined) {
            if (
                event.metaKey ||
                event.ctrlKey ||
                event.altKey ||
                event.shiftKey
            )
                return;
            event.preventDefault();

            const items = focusContext
                .getItems()
                .filter((item) => !item.disabled);
            let candidateRefs = items.map((item) => item.ref);

            if (focusIntent === 'last') {
                candidateRefs.reverse();
            } else if (focusIntent === 'prev' || focusIntent === 'next') {
                if (focusIntent === 'prev') candidateRefs.reverse();
                const currentIndex = candidateRefs.findIndex(
                    (r) => r === event.currentTarget
                );
                candidateRefs = loop
                    ? wrapArray(candidateRefs, currentIndex + 1)
                    : candidateRefs.slice(currentIndex + 1);
            }

            queueMicrotask(() => focusFirst(candidateRefs));
        }
    };

    const onMouseDown = (event: OnMouseEvent) => {
        onMouseDownProp?.(event);
        if (event.defaultPrevented) return;

        isMouseClickRef = true;

        if (disabled) {
            event.preventDefault();
        } else {
            focusContext.onItemFocus(itemId);
        }
    };
</script>

<Button
    type="button"
    data-slot="action-bar-item"
    variant="secondary"
    size="sm"
    {disabled}
    tabindex={isTabStop ? 0 : -1}
    {...itemProps}
    class={cn(orientation === 'vertical' && 'w-full', className)}
    bind:ref
    onclick={onClick}
    onfocus={onFocus}
    onkeydown={onKeyDown}
    onmousedown={onMouseDown}
>
    {@render children?.()}
</Button>
