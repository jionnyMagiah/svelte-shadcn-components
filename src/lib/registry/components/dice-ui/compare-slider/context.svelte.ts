import { Context } from 'runed';
import type { ReadableBoxedValues } from 'svelte-toolbelt';
import { SvelteSet } from 'svelte/reactivity';
import type { Interaction } from './utils';
import type { Orientation } from 'bits-ui';

interface StoreState {
    value: number;
    isDragging: boolean;
}
export const CompareSliderStoreContext =
    new Context<CompareSliderStoreContextState>('CompareSliderStoreContext');

export const CompareSliderContext = new Context<CompareSliderContextState>(
    'CompareSliderContext'
);

type CompareSliderStoreContextStateOpts = ReadableBoxedValues<{
    state: StoreState;
    onValueChange?: (value: number) => void;
}>;
export class CompareSliderStoreContextState {
    readonly opts: CompareSliderStoreContextStateOpts;
    constructor(opts: CompareSliderStoreContextStateOpts) {
        this.opts = opts;
        this.stateRef = $state({
            isDragging: opts.state.current.isDragging,
            value: opts.state.current.value
        });
    }
    static create(opts: CompareSliderStoreContextStateOpts) {
        return CompareSliderStoreContext.set(
            new CompareSliderStoreContextState(opts)
        );
    }
    listenersRef = new SvelteSet<() => void>();
    stateRef: StoreState;
    subscribe(cb: () => void) {
        this.listenersRef.add(cb);
        return () => this.listenersRef.delete(cb);
    }
    getState() {
        return this.stateRef;
    }
    setState<K extends keyof StoreState>(key: K, value: StoreState[K]) {
        if (Object.is(this.stateRef[key], value)) return;
        this.stateRef[key] = value;

        if (key === 'value') {
            this.opts.onValueChange?.current?.(value as number);
        }

        this.notify();
    }
    notify() {
        for (const cb of this.listenersRef) {
            cb();
        }
    }
}

type CompareSliderContextStateOpts = ReadableBoxedValues<{
    interaction: Interaction;
    orientation: Orientation;
}>;

export class CompareSliderContextState {
    readonly opts: CompareSliderContextStateOpts;
    constructor(opts: CompareSliderContextStateOpts) {
        this.opts = opts;
    }
    static create(opts: CompareSliderContextStateOpts) {
        return CompareSliderContext.set(new CompareSliderContextState(opts));
    }
}
