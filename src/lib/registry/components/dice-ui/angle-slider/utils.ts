export const ROOT_NAME = 'AngleSlider';
export const THUMB_NAME = 'AngleSliderThumb';

export const PAGE_KEYS = ['PageUp', 'PageDown'];
export const ARROW_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

export function clamp(value: number, [min, max]: [number, number]) {
    return Math.min(max, Math.max(min, value));
}

export function getNextSortedValues(
    prevValues: number[] = [],
    nextValue: number,
    atIndex: number
) {
    const nextValues = [...prevValues];
    nextValues[atIndex] = nextValue;
    return nextValues.sort((a, b) => a - b);
}

export function getStepsBetweenValues(values: number[]) {
    return values.slice(0, -1).map((value, index) => {
        const nextValue = values[index + 1];
        return nextValue !== undefined ? nextValue - value : 0;
    });
}

export function hasMinStepsBetweenValues(
    values: number[],
    minStepsBetweenValues: number
) {
    if (minStepsBetweenValues > 0) {
        const stepsBetweenValues = getStepsBetweenValues(values);
        const actualMinStepsBetweenValues =
            stepsBetweenValues.length > 0 ? Math.min(...stepsBetweenValues) : 0;
        return actualMinStepsBetweenValues >= minStepsBetweenValues;
    }
    return true;
}

export function getDecimalCount(value: number) {
    return (String(value).split('.')[1] ?? '').length;
}

export function roundValue(value: number, decimalCount: number) {
    const rounder = 10 ** decimalCount;
    return Math.round(value * rounder) / rounder;
}

export function getClosestValueIndex(values: number[], nextValue: number) {
    if (values.length === 1) return 0;
    const distances = values.map((value) => Math.abs(value - nextValue));
    const closestDistance = Math.min(...distances);
    return distances.indexOf(closestDistance);
}
