import type { ReadableBoxedValues, WritableBoxedValues } from 'svelte-toolbelt';
import type { ProgressState } from './utils';
import { Context } from 'runed';

interface CircularProgressContextValueOpts extends ReadableBoxedValues<{
    value: number | null;
    valueText: string | undefined;
    max: number;
    min: number;
    state: ProgressState;
    radius: number;
    thickness: number;
    size: number;
    center: number;
    circumference: number;
    percentage: number | null;
    valueTextId?: string;
}> {}
export const CircularProgressContext = new Context<CircularProgressContextValue>(
    'CircularProgressContext'
);
export class CircularProgressContextValue {
    readonly opts: CircularProgressContextValueOpts;
    constructor(opts: CircularProgressContextValueOpts) {
        this.opts = opts;
    }
    static create(opts: CircularProgressContextValueOpts) {
        return CircularProgressContext.set(
            new CircularProgressContextValue(opts)
        );
    }
}
