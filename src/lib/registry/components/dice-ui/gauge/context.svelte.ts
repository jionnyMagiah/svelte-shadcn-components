import { Context } from 'runed';
import type { ReadableBoxedValues } from 'svelte-toolbelt';
import type { GaugeState } from './utils';

export const GaugeContext = new Context<GaugeContextState>('GaugeContext');
type GaugeContextStateOpts = ReadableBoxedValues<{
    value: number | null;
    valueText: string | undefined;
    max: number;
    min: number;
    state: GaugeState;
    radius: number;
    thickness: number;
    size: number;
    center: number;
    percentage: number | null;
    startAngle: number;
    endAngle: number;
    arcLength: number;
    arcCenterY: number;
    valueTextId: string;
    labelId: string;
}>;

export class GaugeContextState {
    readonly opts: GaugeContextStateOpts;

    constructor(opts: GaugeContextStateOpts) {
        this.opts = opts;
    }

    static create(opts: GaugeContextStateOpts) {
        return GaugeContext.set(new GaugeContextState(opts));
    }
}
