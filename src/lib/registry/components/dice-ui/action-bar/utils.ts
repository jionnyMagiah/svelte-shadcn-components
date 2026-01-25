import type { Direction } from 'bits-ui';

export const ROOT_NAME = 'ActionBar';
export const GROUP_NAME = 'ActionBarGroup';
export const ITEM_NAME = 'ActionBarItem';
export const CLOSE_NAME = 'ActionBarClose';
export const SEPARATOR_NAME = 'ActionBarSeparator';
export const ITEM_SELECT = 'actionbar.itemSelect';
export const ENTRY_FOCUS = 'actionbarFocusGroup.onEntryFocus';
export const EVENT_OPTIONS = { bubbles: false, cancelable: true };

export function focusFirst(candidates: HTMLElement[], preventScroll = false) {
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

export function getDirectionAwareKey(key: string, dir?: Direction) {
    if (dir !== 'rtl') return key;
    return key === 'ArrowLeft'
        ? 'ArrowRight'
        : key === 'ArrowRight'
          ? 'ArrowLeft'
          : key;
}
