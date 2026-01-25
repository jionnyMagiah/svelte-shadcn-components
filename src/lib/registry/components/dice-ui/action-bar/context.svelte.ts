import type { Direction, Orientation } from 'bits-ui';
import { Context } from 'runed';
import type { ReadableBoxedValues } from 'svelte-toolbelt';
import type { FocusEventHandler, MouseEventHandler } from 'svelte/elements';
import { SvelteMap } from 'svelte/reactivity';
import { ENTRY_FOCUS, EVENT_OPTIONS, focusFirst } from './utils';

export interface ItemData {
    id: string;
    ref: HTMLElement;
    disabled: boolean;
}

export const ActionBarContext = new Context<ActionBarContextState>(
    'ActionBarContext'
);
export const ActionBarFocusContext = new Context<ActionBarFocusContextState>(
    'ActionBarFocusContext'
);

type ActionBarContextStateOpts = ReadableBoxedValues<{
    onOpenChange?: (open: boolean) => void;
    dir: Direction;
    orientation: Orientation;
    loop: boolean;
}>;

export class ActionBarContextState {
    readonly opts: ActionBarContextStateOpts;
    constructor(opts: ActionBarContextStateOpts) {
        this.opts = opts;
    }
    static create(opts: ActionBarContextStateOpts) {
        return ActionBarContext.set(new ActionBarContextState(opts));
    }
}

type ActionBarFocusContextStateOpts = ReadableBoxedValues<{
    onBlurProp?: FocusEventHandler<HTMLDivElement> | null;
    onFocusProp?: FocusEventHandler<HTMLDivElement> | null;
    onMouseDownProp?: MouseEventHandler<HTMLDivElement> | null;
}>;

export class ActionBarFocusContextState {
    readonly opts: ActionBarFocusContextStateOpts;
    constructor(opts: ActionBarFocusContextStateOpts) {
        this.opts = opts;

        this.onBlur = this.onBlur.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
    }
    static create(opts: ActionBarFocusContextStateOpts) {
        return ActionBarFocusContext.set(new ActionBarFocusContextState(opts));
    }

    tabStopId = $state<string | null>(null);
    isTabbingBackOut = $state(false);
    focusableItemCount = $state(0);
    isClickFocusRef = $state(false);
    itemsRef = new SvelteMap<string, ItemData>();

    onItemFocus(tabStopId: string) {
        this.tabStopId = tabStopId;
    }
    onItemShiftTab() {
        this.isTabbingBackOut = true;
    }
    onFocusableItemAdd() {
        this.focusableItemCount++;
    }
    onFocusableItemRemove() {
        this.focusableItemCount--;
    }
    onItemRegister(item: ItemData) {
        this.itemsRef.set(item.id, item);
    }
    onItemUnregister(id: string) {
        this.itemsRef.delete(id);
    }
    getItems() {
        return Array.from(this.itemsRef.values())
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
    }
    onBlur(
        event: FocusEvent & { currentTarget: EventTarget & HTMLDivElement }
    ) {
        this.opts.onBlurProp?.current?.(event);
        if (event.defaultPrevented) return;

        this.isTabbingBackOut = false;
    }
    onFocus(
        event: FocusEvent & { currentTarget: EventTarget & HTMLDivElement }
    ) {
        this.opts.onFocusProp?.current?.(event);
        if (event.defaultPrevented) return;

        const isKeyboardFocus = !this.isClickFocusRef;
        if (
            event.target === event.currentTarget &&
            isKeyboardFocus &&
            !this.isTabbingBackOut
        ) {
            const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
            event.currentTarget.dispatchEvent(entryFocusEvent);

            if (!entryFocusEvent.defaultPrevented) {
                const items = Array.from(this.itemsRef.values()).filter(
                    (item) => !item.disabled
                );
                const currentItem = items.find(
                    (item) => item.id === this.tabStopId
                );

                const candidateItems = [currentItem, ...items].filter(
                    Boolean
                ) as ItemData[];
                const candidateRefs = candidateItems.map((item) => item.ref);
                focusFirst(candidateRefs, false);
            }
        }
        this.isClickFocusRef = false;
    }
    onMouseDown(
        event: MouseEvent & { currentTarget: EventTarget & HTMLDivElement }
    ) {
        this.opts.onMouseDownProp?.current?.(event);
        if (event.defaultPrevented) return;

        this.isClickFocusRef = true;
    }
}
