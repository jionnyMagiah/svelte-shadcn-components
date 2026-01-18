import type { Direction } from 'bits-ui';
import { Context } from 'runed';
import type { ReadableBoxedValues } from 'svelte-toolbelt';
import {
    clamp,
    getDecimalCount,
    getNextSortedValues,
    hasMinStepsBetweenValues,
    roundValue
} from './utils';
import type {
    KeyboardEventHandler,
    MouseEventHandler,
    PointerEventHandler
} from 'svelte/elements';
import { SvelteSet } from 'svelte/reactivity';

export const SliderStoreContext = new Context<Store>('SliderStoreContext');
export const SliderContext = new Context<SliderContextState>('SliderContext');

export interface ThumbData {
    id: string;
    element: HTMLDivElement;
    index: number;
    value: number;
}

interface StoreState {
    min: number;
    max: number;
    step: number;
    size: number;
    thickness: number;
    startAngle: number;
    endAngle: number;
    minStepsBetweenThumbs: number;
    disabled: boolean;
    inverted: boolean;
    values: number[];
    thumbs: Map<number, ThumbData>;
    valueIndexToChange: number;
}

interface StoreStateOpts
    extends
        ReadableBoxedValues<StoreState>,
        ReadableBoxedValues<{
            onValueChange?: null | ((value: number[]) => void);
            onValueCommit?: null | ((value: number[]) => void);
            onPointerMove?: null | PointerEventHandler<HTMLDivElement>;
            onPointerUp?: null | PointerEventHandler<HTMLDivElement>;
            onPointerDown?: null | PointerEventHandler<HTMLDivElement>;
            onKeyDown?: null | KeyboardEventHandler<HTMLDivElement>;
        }> {}

export class Store {
    readonly opts: StoreStateOpts;
    constructor(opts: StoreStateOpts) {
        this.opts = opts;
        this.stateRef = $state({
            valueIndexToChange: opts.valueIndexToChange.current,
            thumbs: opts.thumbs.current,
            disabled: opts.disabled.current,
            endAngle: opts.endAngle.current,
            inverted: opts.inverted.current,
            max: opts.max.current,
            min: opts.min.current,
            minStepsBetweenThumbs: opts.minStepsBetweenThumbs.current,
            size: opts.size.current,
            startAngle: opts.startAngle.current,
            step: opts.step.current,
            thickness: opts.thickness.current,
            values: opts.values.current
        });
    }
    listenersRef = new SvelteSet<() => void>();
    stateRef: StoreState;
    static create(opts: StoreStateOpts) {
        return SliderStoreContext.set(new Store(opts));
    }

    subscribe(cb: () => void) {
        this.listenersRef.add(cb);
        return () => this.listenersRef.delete(cb);
    }
    getState(): StoreState {
        return this.stateRef;
    }
    setState<K extends keyof StoreState>(key: K, value: StoreState[K]) {
        if (Object.is(this.stateRef[key], value)) return;

        if (key === 'values' && Array.isArray(value)) {
            const hasChanged = String(this.stateRef.values) !== String(value);
            this.stateRef.values = value;
            if (hasChanged) {
                this.opts.onValueChange?.current?.(value);
            }
        } else {
            this.stateRef[key] = value;
        }

        this.notify();
    }
    notify() {
        for (const cb of this.listenersRef) {
            cb();
        }
    }
    addThumb(index: number, thumbData: ThumbData) {
        this.stateRef.thumbs.set(index, thumbData);
        this.notify();
    }
    removeThumb(index: number) {
        this.stateRef.thumbs.delete(index);
        this.notify();
    }
    updateValue(value: number, atIndex: number, options = { commit: false }) {
        const { min, max, step, minStepsBetweenThumbs } = this.stateRef;
        const decimalCount = getDecimalCount(step);
        const snapToStep = roundValue(
            Math.round((value - min) / step) * step + min,
            decimalCount
        );
        const nextValue = clamp(snapToStep, [min, max]);

        const nextValues = getNextSortedValues(
            this.stateRef.values,
            nextValue,
            atIndex
        );

        if (
            hasMinStepsBetweenValues(nextValues, minStepsBetweenThumbs * step)
        ) {
            this.stateRef.valueIndexToChange = nextValues.indexOf(nextValue);
            const hasChanged =
                String(nextValues) !== String(this.stateRef.values);

            if (hasChanged) {
                this.stateRef.values = nextValues;
                this.opts.onValueChange?.current?.(nextValues);
                if (options.commit)
                    this.opts.onValueCommit?.current?.(nextValues);
                this.notify();
            }
        }
    }
    getValueFromPointer(clientX: number, clientY: number, rect: DOMRect) {
        const { min, max, inverted, startAngle, endAngle } = this.stateRef;
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = clientX - centerX;
        const deltaY = clientY - centerY;
        let angle = (Math.atan2(deltaY, deltaX) * 180) / Math.PI;

        if (angle < 0) angle += 360;

        angle = (angle - startAngle + 360) % 360;

        const totalAngle = (endAngle - startAngle + 360) % 360 || 360;

        let percent = angle / totalAngle;
        if (inverted) percent = 1 - percent;

        return min + percent * (max - min);
    }
    getAngleFromValue(value: number) {
        const { min, max, inverted, startAngle, endAngle } = this.stateRef;
        let percent = (value - min) / (max - min);
        if (inverted) percent = 1 - percent;

        const totalAngle = (endAngle - startAngle + 360) % 360 || 360;
        const angle = startAngle + percent * totalAngle;

        return angle;
    }
    getPositionFromAngle(angle: number) {
        const { size } = this.stateRef;
        const radians = (angle * Math.PI) / 180;

        return {
            x: size * Math.cos(radians),
            y: size * Math.sin(radians)
        };
    }
}

export interface SliderContextValue {
    dir: Direction;
    name?: string;
    form?: string;
}

interface SliderContextStateOpts extends ReadableBoxedValues<SliderContextValue> {}

export class SliderContextState {
    readonly opts: SliderContextStateOpts;
    constructor(opts: SliderContextStateOpts) {
        this.opts = opts;
    }
    static create(opts: SliderContextStateOpts) {
        return SliderContext.set(new SliderContextState(opts));
    }
}
