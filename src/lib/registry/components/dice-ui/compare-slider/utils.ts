export const ROOT_NAME = 'CompareSlider';
export const BEFORE_NAME = 'CompareSliderBefore';
export const AFTER_NAME = 'CompareSliderAfter';
export const LABEL_NAME = 'CompareSliderLabel';
export const HANDLE_NAME = 'CompareSliderHandle';

export const PAGE_KEYS = ['PageUp', 'PageDown'];
export const ARROW_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
export type Interaction = 'hover' | 'drag';

export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}
