import type { ReadableBoxedValues } from 'svelte-toolbelt';
import {
    colorToString,
    hsvToRgb,
    type ColorFormat,
    type ColorValue,
    type HSVColorValue
} from './utils';
import { Context } from 'runed';
import type { Direction, PopoverRootProps } from 'bits-ui';
import { SvelteSet } from 'svelte/reactivity';

export const ColorPickerStoreContext = new Context<Store>(
    'ColorPickerStoreContext'
);
export const ColorPickerContext = new Context<ColorPickerContextState>(
    'ColorPickerContext'
);

interface StoreState {
    color: ColorValue;
    hsv: HSVColorValue;
    open: boolean;
    format: ColorFormat;
}

interface StoreStateOpts
    extends
        ReadableBoxedValues<StoreState>,
        ReadableBoxedValues<{
            onValueChange?: (value: string) => void;
            onOpenChange?: PopoverRootProps['onOpenChange'];
            onFormatChange?: (format: ColorFormat) => void;
        }> {}

export class Store {
    readonly opts: StoreStateOpts;
    constructor(opts: StoreStateOpts) {
        this.opts = opts;
        this.stateRef = $state({
            color: opts.color.current,
            hsv: opts.hsv.current,
            open: opts.open.current,
            format: opts.format.current
        });
        this.setOpen = this.setOpen.bind(this);
        this.setFormat = this.setFormat.bind(this);
    }
    stateRef: StoreState;
    listenersRef = new SvelteSet<() => void>();
    static create(opts: StoreStateOpts) {
        return ColorPickerStoreContext.set(new Store(opts));
    }
    subscribe(cb: () => void) {
        this.listenersRef.add(cb);
        return () => this.listenersRef.delete(cb);
    }
    getState() {
        return this.stateRef;
    }
    setColor(value: ColorValue) {
        if (Object.is(this.stateRef.color, value)) return;

        const prevState = { ...this.stateRef };
        this.stateRef.color = value;

        if (this.opts.onValueChange?.current) {
            const colorString = colorToString(value, prevState.format);
            this.opts.onValueChange.current(colorString);
        }

        this.notify();
    }
    setHsv(value: HSVColorValue) {
        if (Object.is(this.stateRef.hsv, value)) return;

        const prevState = { ...this.stateRef };
        this.stateRef.hsv = value;

        if (this.opts.onValueChange?.current) {
            const colorValue = hsvToRgb(value);
            const colorString = colorToString(colorValue, prevState.format);
            this.opts.onValueChange.current(colorString);
        }

        this.notify();
    }
    setOpen(value: boolean) {
        if (Object.is(this.stateRef.open, value)) return;

        this.stateRef.open = value;

        if (this.opts.onOpenChange?.current) {
            this.opts.onOpenChange.current(value);
        }

        this.notify();
    }
    setFormat(value: ColorFormat) {
        console.log('formt');

        if (Object.is(this.stateRef.format, value)) return;

        this.stateRef.format = value;

        if (this.opts.onFormatChange?.current) {
            this.opts.onFormatChange?.current(value);
        }

        this.notify();
    }
    notify() {
        for (const cb of this.listenersRef) {
            cb();
        }
    }
}

interface ColorPickerContexValue {
    dir: Direction;
    disabled?: boolean;
    inline?: boolean;
    readOnly?: boolean;
    required?: boolean;
}

interface ColorPickerContextStateOpts extends ReadableBoxedValues<ColorPickerContexValue> {}

export class ColorPickerContextState {
    readonly opts: ColorPickerContextStateOpts;
    constructor(opts: ColorPickerContextStateOpts) {
        this.opts = opts;
    }
    static create(opts: ColorPickerContextStateOpts) {
        return ColorPickerContext.set(new ColorPickerContextState(opts));
    }
}
