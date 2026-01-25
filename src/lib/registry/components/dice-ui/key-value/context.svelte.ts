import { Context } from 'runed';
import type { ReadableBoxedValues } from 'svelte-toolbelt';
import { SvelteSet } from 'svelte/reactivity';

export interface ItemData {
    id: string;
    key: string;
    value: string;
}

export interface KeyValueState {
    value: ItemData[];
    focusedId: string | null;
    errors: Record<string, { key?: string; value?: string }>;
}

export const KeyValueStoreContext = new Context<Store>('KeyValueStoreContext');
export const KeyValueContext = new Context<KeyValueContextState>(
    'KeyValueContext'
);
export const KeyValueItemContext = new Context<KeyValueItemContextState>(
    'KeyValueItemContext'
);

interface StoreStateOpts
    extends
        ReadableBoxedValues<KeyValueState>,
        ReadableBoxedValues<{
            onPaste?: (event: ClipboardEvent, items: ItemData[]) => void;
            onAdd?: (value: ItemData) => void;
            onRemove?: (value: ItemData) => void;
            onKeyValidate?: (
                key: string,
                value: ItemData[]
            ) => string | undefined;
            onValueValidate?: (
                value: string,
                key: string,
                items: ItemData[]
            ) => string | undefined;
            onValueChange?: (value: ItemData[]) => void;
        }> {}

export class Store {
    readonly opts: StoreStateOpts;
    constructor(opts: StoreStateOpts) {
        this.opts = opts;
        this.stateRef = $state({
            errors: opts.errors.current,
            focusedId: opts.focusedId.current,
            value: opts.value.current
        });
    }
    stateRef: KeyValueState;
    listenersRef = new SvelteSet<() => void>();
    static create(opts: StoreStateOpts) {
        return KeyValueStoreContext.set(new Store(opts));
    }
    subscribe(cb: () => void) {
        this.listenersRef.add(cb);
        return () => this.listenersRef.delete(cb);
    }
    getState() {
        return this.stateRef;
    }
    setState<K extends keyof KeyValueState>(key: K, val: KeyValueState[K]) {
        if (Object.is(this.stateRef[key], val)) return;

        if (key === 'value' && Array.isArray(val)) {
            this.stateRef.value = val as ItemData[];
            this.opts.onValueChange?.current?.(val as ItemData[]);
        } else {
            this.stateRef[key] = val;
        }

        this.notify();
    }
    notify() {
        for (const cb of this.listenersRef) {
            cb();
        }
    }
}

interface KeyValueContextStateOpts extends ReadableBoxedValues<{
    onPaste?: (event: ClipboardEvent, items: ItemData[]) => void;
    onAdd?: (value: ItemData) => void;
    onRemove?: (value: ItemData) => void;
    onKeyValidate?: (key: string, value: ItemData[]) => string | undefined;
    onValueValidate?: (
        value: string,
        key: string,
        items: ItemData[]
    ) => string | undefined;
    rootId: string;
    maxItems?: number;
    minItems: number;
    keyPlaceholder: string;
    valuePlaceholder: string;
    allowDuplicateKeys: boolean;
    enablePaste: boolean;
    trim: boolean;
    stripQuotes: boolean;
    disabled: boolean;
    readOnly: boolean;
    required: boolean;
}> {}

export class KeyValueContextState {
    readonly opts: KeyValueContextStateOpts;
    constructor(opts: KeyValueContextStateOpts) {
        this.opts = opts;
    }
    static create(opts: KeyValueContextStateOpts) {
        return KeyValueContext.set(new KeyValueContextState(opts));
    }
}

export interface KeyValueItemContextStateOpts extends ReadableBoxedValues<{
    id: string;
    key: string;
    value: string;
}> {}

export class KeyValueItemContextState {
    readonly opts: KeyValueItemContextStateOpts;
    constructor(opts: KeyValueItemContextStateOpts) {
        this.opts = opts;
    }
    static create(opts: KeyValueItemContextStateOpts) {
        return KeyValueItemContext.set(new KeyValueItemContextState(opts));
    }
}
