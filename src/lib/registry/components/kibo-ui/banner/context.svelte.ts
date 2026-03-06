import { Context } from 'runed';
import type { ReadableBoxedValues } from 'svelte-toolbelt';

export const BannerContext = new Context<BannerContextState>('BannerContext');
type BannerContextStateOpts = ReadableBoxedValues<{
    show: boolean;
    setShow: (show: boolean) => void;
}>;

export class BannerContextState {
    readonly opts: BannerContextStateOpts;

    constructor(opts: BannerContextStateOpts) {
        this.opts = opts;
    }

    static create(opts: BannerContextStateOpts) {
        return BannerContext.set(new BannerContextState(opts));
    }
}
