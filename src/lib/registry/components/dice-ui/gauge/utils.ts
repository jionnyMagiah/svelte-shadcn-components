import type { WithChild } from 'bits-ui';
import type { HTMLAttributes, SVGAttributes } from 'svelte/elements';

export const GAUGE_NAME = 'Gauge';
export const INDICATOR_NAME = 'GaugeIndicator';
export const TRACK_NAME = 'GaugeTrack';
export const RANGE_NAME = 'GaugeRange';
export const VALUE_TEXT_NAME = 'GaugeValueText';
export const LABEL_NAME = 'GaugeLabel';

export const DEFAULT_MAX = 100;
export const DEFAULT_START_ANGLE = 0;
export const DEFAULT_END_ANGLE = 360;

export type GaugeState = 'indeterminate' | 'complete' | 'loading';

export function getGaugeState(
    value: number | undefined | null,
    maxValue: number
): GaugeState {
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
    return Math.round(percentage).toString();
}

export function getInvalidValueError(
    propValue: string,
    componentName: string
): string {
    return `Invalid prop \`value\` of value \`${propValue}\` supplied to \`${componentName}\`. The \`value\` prop must be a number between \`min\` and \`max\` (inclusive), or \`null\`/\`undefined\` for indeterminate state. The value will be clamped to the valid range.`;
}

export function getInvalidMaxError(
    propValue: string,
    componentName: string
): string {
    return `Invalid prop \`max\` of value \`${propValue}\` supplied to \`${componentName}\`. Only numbers greater than 0 are valid. Defaulting to ${DEFAULT_MAX}.`;
}

export function getNormalizedAngle(angle: number) {
    return ((angle % 360) + 360) % 360;
}

export function polarToCartesian(
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number
) {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians)
    };
}

export function describeArc(
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number
) {
    const angleDiff = endAngle - startAngle;

    // For full circles (360 degrees), draw as two semi-circles
    if (Math.abs(angleDiff) >= 360) {
        const start = polarToCartesian(x, y, radius, startAngle);
        const mid = polarToCartesian(x, y, radius, startAngle + 180);
        return [
            'M',
            start.x,
            start.y,
            'A',
            radius,
            radius,
            0,
            0,
            1,
            mid.x,
            mid.y,
            'A',
            radius,
            radius,
            0,
            0,
            1,
            start.x,
            start.y
        ].join(' ');
    }

    const start = polarToCartesian(x, y, radius, startAngle);
    const end = polarToCartesian(x, y, radius, endAngle);
    const largeArcFlag = angleDiff <= 180 ? '0' : '1';

    return [
        'M',
        start.x,
        start.y,
        'A',
        radius,
        radius,
        0,
        largeArcFlag,
        1,
        end.x,
        end.y
    ].join(' ');
}

//#region Types

export type GaugeProps = HTMLAttributes<HTMLDivElement> & {
    value?: number | null | undefined;
    getValueText?(value: number, min: number, max: number): string;
    min?: number;
    max?: number;
    size?: number;
    thickness?: number;
    startAngle?: number;
    endAngle?: number;
} & WithChild;
export type GaugeIndicatorProps = SVGAttributes<SVGElement>;
export type GaugeTrackProps = SVGAttributes<SVGPathElement>;
export type GaugeRangeProps = SVGAttributes<SVGPathElement>;
export type GaugeValueTextProps = HTMLAttributes<HTMLDivElement> & WithChild;
export type GaugeLabelProps = HTMLAttributes<HTMLDivElement> & WithChild;

//#endregion
