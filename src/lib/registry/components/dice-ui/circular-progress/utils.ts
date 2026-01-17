export const DEFAULT_MAX = 100;
export const CIRCULAR_PROGRESS_NAME = 'CircularProgress';
export const INDICATOR_NAME = 'CircularProgressIndicator';
export const TRACK_NAME = 'CircularProgressTrack';
export const RANGE_NAME = 'CircularProgressRange';
export const VALUE_TEXT_NAME = 'CircularProgressValueText';

export type ProgressState = 'indeterminate' | 'complete' | 'loading';

export function getProgressState(
    value: number | undefined | null,
    maxValue: number
): ProgressState {
    return value == null
        ? 'indeterminate'
        : value === maxValue
          ? 'complete'
          : 'loading';
}

export function getIsValidNumber(value: unknown): value is number {
    return typeof value === 'number' && Number.isFinite(value);
}

export function getIsValidMaxNumber(max: unknown): max is number {
    return getIsValidNumber(max) && max > 0;
}

export function getIsValidValueNumber(
    value: unknown,
    min: number,
    max: number
): value is number {
    return getIsValidNumber(value) && value <= max && value >= min;
}

export function getDefaultValueText(
    value: number,
    min: number,
    max: number
): string {
    const percentage = max === min ? 100 : ((value - min) / (max - min)) * 100;
    return `${Math.round(percentage)}%`;
}

export function getInvalidValueError(
    propValue: string,
    componentName: string
): string {
    return `Invalid prop \`value\` of value \`${propValue}\` supplied to \`${componentName}\`. The \`value\` prop must be a number between \`min\` and \`max\` (inclusive), or \`null\`/\`undefined\` for indeterminate progress. The value will be clamped to the valid range.`;
}

export function getInvalidMaxError(
    propValue: string,
    componentName: string
): string {
    return `Invalid prop \`max\` of value \`${propValue}\` supplied to \`${componentName}\`. Only numbers greater than 0 are valid. Defaulting to ${DEFAULT_MAX}.`;
}
