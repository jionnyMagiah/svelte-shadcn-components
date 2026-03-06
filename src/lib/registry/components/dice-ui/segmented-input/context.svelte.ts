import type { Direction, Orientation } from 'bits-ui';
import { Context } from 'runed';
import type { ReadableBoxedValues } from 'svelte-toolbelt';
import { SvelteMap } from 'svelte/reactivity';

export type Size = 'default' | 'sm' | 'lg';
export const SegmentedInputContext = new Context<SegmentedInputContextState>(
    'SegmentedInputContext'
);
export type Position = 'isolated' | 'first' | 'middle' | 'last';

type SegmentedInputContextStateOpts = ReadableBoxedValues<{
    dir?: Direction;
    orientation?: Orientation;
    size?: Size;
    disabled?: boolean;
    invalid?: boolean;
    required?: boolean;
}>;

export class SegmentedInputContextState {
    readonly opts: SegmentedInputContextStateOpts;
    #childs = new SvelteMap<string, Position | ''>();
    constructor(opts: SegmentedInputContextStateOpts) {
        this.opts = opts;
    }

    static create(opts: SegmentedInputContextStateOpts) {
        return SegmentedInputContext.set(new SegmentedInputContextState(opts));
    }

    /**
     * Add child to child map
     * @param id id of child
     * @param position position of child
     * @returns index of child in list
     */
    addChild(id: string, position: Position | '') {
        this.#childs.set(id, position);
        return this.childLength() - 1;
    }

    removeChild(id: string) {
        this.#childs.delete(id);
    }

    childLength() {
        return this.#childs.size;
    }
}
