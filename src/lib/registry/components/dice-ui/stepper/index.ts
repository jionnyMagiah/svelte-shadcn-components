import type { Direction, Orientation } from 'bits-ui';
import type { SvelteMap } from 'svelte/reactivity';

export type NavigationDirection = 'next' | 'prev';
export type DataState = 'inactive' | 'active' | 'completed';
export type FocusIntent = 'first' | 'last' | 'prev' | 'next';

export type StepState = {
    value: string;
    completed: boolean;
    disabled: boolean;
};
export type StoreState = {
    steps: Map<string, StepState>;
    value: string;
};
export interface ItemData {
    id: string;
    ref: HTMLButtonElement | null;
    value: string;
    active: boolean;
    disabled: boolean;
}

export const ROOT_NAME = 'Stepper';
export const LIST_NAME = 'Stepper.List';
export const ITEM_NAME = 'Stepper.Item';
export const TRIGGER_NAME = 'Stepper.Trigger';
export const INDICATOR_NAME = 'Stepper.Indicator';
export const SEPARATOR_NAME = 'Stepper.Separator';
export const TITLE_NAME = 'Stepper.Title';
export const DESCRIPTION_NAME = 'Stepper.Description';
export const CONTENT_NAME = 'Stepper.Content';
export const PREV_NAME = 'Stepper.Prev';
export const NEXT_NAME = 'Stepper.Next';

export const ENTRY_FOCUS = 'stepperFocusGroup.onEntryFocus';
export const EVENT_OPTIONS = { bubbles: false, cancelable: true };
export const ARROW_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

export function stepperGetId(
    id: string,
    variant: 'trigger' | 'content' | 'title' | 'description',
    value: string
) {
    return `${id}-${variant}-${value}`;
}

const MAP_KEY_TO_FOCUS_INTENT: Record<string, FocusIntent> = {
    ArrowLeft: 'prev',
    ArrowUp: 'prev',
    ArrowRight: 'next',
    ArrowDown: 'next',
    PageUp: 'first',
    Home: 'first',
    PageDown: 'last',
    End: 'last'
};

function getDirectionAwareKey(key: string, dir?: Direction) {
    if (dir !== 'rtl') return key;
    return key === 'ArrowLeft'
        ? 'ArrowRight'
        : key === 'ArrowRight'
          ? 'ArrowLeft'
          : key;
}

export function getFocusIntent(
    event: KeyboardEvent,
    dir?: Direction,
    orientation?: Orientation
) {
    const key = getDirectionAwareKey(event.key, dir);
    if (orientation === 'horizontal' && ['ArrowUp', 'ArrowDown'].includes(key))
        return undefined;
    if (orientation === 'vertical' && ['ArrowLeft', 'ArrowRight'].includes(key))
        return undefined;
    return MAP_KEY_TO_FOCUS_INTENT[key];
}

export function focusFirst(
    candidates: Array<HTMLButtonElement | null>,
    preventScroll = false
) {
    const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
    for (const candidate of candidates) {
        if (!candidate) continue;
        if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
        candidate.focus({ preventScroll });
        if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
    }
}

export function wrapArray<T>(array: T[], startIndex: number) {
    return array.map<T>(
        (_, index) => array[(startIndex + index) % array.length] as T
    );
}

export function getDataState(
    value: string | undefined,
    itemValue: string,
    stepState: StepState | undefined,
    steps: Map<string, StepState>,
    variant: 'item' | 'separator' = 'item'
): DataState {
    const stepKeys = Array.from(steps.keys());
    const currentIndex = stepKeys.indexOf(itemValue);

    if (stepState?.completed) return 'completed';

    if (value === itemValue) {
        return variant === 'separator' ? 'inactive' : 'active';
    }

    if (value) {
        const activeIndex = stepKeys.indexOf(value);

        if (activeIndex > currentIndex) return 'completed';
    }

    return 'inactive';
}
