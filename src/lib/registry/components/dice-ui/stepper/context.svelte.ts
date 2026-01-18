import { Context, watch } from 'runed';
import {
    ENTRY_FOCUS,
    EVENT_OPTIONS,
    focusFirst,
    getDataState,
    getFocusIntent,
    ROOT_NAME,
    stepperGetId,
    wrapArray,
    type DataState,
    type ItemData,
    type NavigationDirection,
    type StepState,
    type StoreState
} from '.';
import type { Direction, Orientation, TabsActivationMode } from 'bits-ui';
import type { ReadableBoxedValues, WritableBoxedValues } from 'svelte-toolbelt';
import { SvelteMap, SvelteSet } from 'svelte/reactivity';
import type {
    FocusEventHandler,
    HTMLAttributes,
    HTMLButtonAttributes,
    KeyboardEventHandler,
    MouseEventHandler
} from 'svelte/elements';
export type WithRefOpts<T = {}> = T &
    ReadableBoxedValues<{
        id: string;
    }> &
    WritableBoxedValues<{
        ref: HTMLElement | null;
    }>;

// todo: remove this
type WithTarget<K, T> = K & {
    target: EventTarget | null;
    currentTarget: T;
};

//#region Store Context

interface StoreOpts
    extends
        WithRefOpts,
        ReadableBoxedValues<{
            disabled: boolean;
            orientation: Orientation;
            dir: Direction;
            onValueChange?: (value: string) => void;
            onValueComplete?: (value: string, completed: boolean) => void;
            onValueAdd?: (value: string) => void;
            onValueRemove?: (value: string) => void;
            onValidate?: (
                value: string,
                direction: NavigationDirection
            ) => boolean | Promise<boolean>;
        }>,
        WritableBoxedValues<{
            value: string;
            // listenersRef: Set<() => void>;
            // stateRef: StoreState;
        }> {}

export class Store {
    readonly opts: StoreOpts;

    listenersRef = new Set<() => void>();
    stateRef: StoreState = $state({
        steps: new SvelteMap<string, StepState>(),
        value: ''
    });
    constructor(opts: StoreOpts) {
        this.stateRef.value = opts.value.current;

        this.opts = opts;
    }
    static create(opts: StoreOpts) {
        return StoreContext.set(new Store(opts));
    }
    subscribe(cb: () => void) {
        this.listenersRef.add(cb);
        return () => this.listenersRef.delete(cb);
    }
    getState(consumer = '<no-consumer>') {
        return this.stateRef;
    }
    setState<K extends keyof StoreState>(key: K, value: StoreState[K]) {
        // console.log('value before', {
        //     key,
        //     t: this.stateRef[key],
        //     value: this.stateRef.value
        // });
        if (Object.is(this.stateRef[key], value)) return;

        if (key === 'value' && typeof value === 'string') {
            this.stateRef.value = value;
            this.opts.onValueChange?.current?.(value);
        } else {
            // maybe should be
            // this.opts.stateRef.current.steps
            this.stateRef[key] = value;
        }

        // console.log('value after', { value: this.stateRef.value });
        this.notify();
    }
    async setStateWithValidation(
        value: string,
        direction: NavigationDirection
    ) {
        if (!this.opts.onValidate?.current) {
            // console.log('no validation, set state');

            this.setState('value', value);
            return true;
        }

        try {
            const isValid = await this.opts.onValidate.current?.(
                value,
                direction
            );
            if (isValid) {
                this.setState('value', value);
            }
            return isValid;
        } catch {
            return false;
        }
    }
    hasValidation() {
        return !!this.opts.onValidate?.current;
    }
    notify() {
        for (const cb of this.listenersRef) {
            cb();
        }
    }
    addStep(value: string, completed: boolean, disabled: boolean) {
        const newStep: StepState = { value, completed, disabled };
        this.stateRef.steps.set(value, newStep);
        this.opts.onValueAdd?.current?.(value);
        this.notify();
    }
    removeStep(value: string) {
        this.stateRef.steps.delete(value);
        this.opts.onValueRemove?.current?.(value);
        this.notify();
    }
    setStep(value: string, completed: boolean, disabled: boolean) {
        const step = this.stateRef.steps.get(value);
        if (step) {
            const updatedStep: StepState = { ...step, completed, disabled };
            this.stateRef.steps.set(value, updatedStep);

            if (completed !== step.completed) {
                this.opts.onValueComplete?.current?.(value, completed);
            }

            this.notify();
        }
    }
    readonly props = $derived.by(
        () =>
            ({
                id: this.opts.id.current,
                'data-disabled': this.opts.disabled.current ? true : undefined,
                'data-slot': 'stepper',
                'data-orientation': this.opts.orientation.current,
                dir: this.opts.dir.current
            }) as const
    );
}

export const StoreContext = new Context<Store>('StoreContext');

//#endregion

//#region StepperContext

interface StepperContextValueOpts
    extends
        ReadableBoxedValues<{
            rootId: string;
            dir: Direction;
            orientation: Orientation;
            activationMode: TabsActivationMode;
            disabled: boolean;
            nonInteractive: boolean;
            loop: boolean;
        }>,
        WritableBoxedValues<{}> {}

export class StepperContextValue {
    readonly opts: StepperContextValueOpts;
    constructor(opts: StepperContextValueOpts) {
        this.opts = opts;
    }
    static create(opts: StepperContextValueOpts) {
        return StepperContext.set(new StepperContextValue(opts));
    }
}

const StepperContext = new Context<StepperContextValue>('StepperContext');

//#endregion

//#region StepperListContext

const StepperListContext = new Context<StepperListState>('StepperListContext');

interface StepperListStateOpts extends ReadableBoxedValues<{
    onblur?: FocusEventHandler<HTMLDivElement> | null;
    onfocus?: FocusEventHandler<HTMLDivElement> | null;
    onmousedown?: MouseEventHandler<HTMLDivElement> | null;
}> {}

export class StepperListState {
    readonly opts: StepperListStateOpts;
    readonly root: StepperContextValue;
    tabStopId = $state<string | null>(null);
    isTabbingBackOut = $state(false);
    focusableItemCount = $state(0);
    isClickFocusRef = $state(false);
    itemsRef = new SvelteMap<string, ItemData>();
    currentValue = $state('');
    constructor(
        opts: StepperListStateOpts,
        root: StepperContextValue,
        store: Store
    ) {
        this.opts = opts;
        this.root = root;
        this.currentValue = store.getState().value;

        this.onblur = this.onblur.bind(this);
        this.onfocus = this.onfocus.bind(this);
        this.onmousedown = this.onmousedown.bind(this);
    }
    static create(opts: StepperListStateOpts) {
        return StepperListContext.set(
            new StepperListState(opts, StepperContext.get(), StoreContext.get())
        );
    }
    onblur = (event: WithTarget<FocusEvent, HTMLDivElement>) => {
        this.opts.onblur?.current?.(event);
        if (event.defaultPrevented) return;

        this.isTabbingBackOut = false;
    };
    onfocus = (event: WithTarget<FocusEvent, HTMLDivElement>) => {
        this.opts.onfocus?.current?.(event);
        if (event.defaultPrevented) return;

        const isKeyboardFocus = !this.isClickFocusRef;
        if (
            event.target === event.currentTarget &&
            isKeyboardFocus &&
            !this.isTabbingBackOut
        ) {
            const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
            event.currentTarget.dispatchEvent(entryFocusEvent);

            if (!entryFocusEvent.defaultPrevented) {
                const items = Array.from(this.itemsRef.values()).filter(
                    (item) => !item.disabled
                );
                const selectedItem = this.currentValue
                    ? items.find((item) => item.value === this.currentValue)
                    : undefined;
                const activeItem = items.find((item) => item.active);
                const currentItem = items.find(
                    (item) => item.id === this.tabStopId
                );

                const candidateItems = [
                    selectedItem,
                    activeItem,
                    currentItem,
                    ...items
                ].filter(Boolean) as ItemData[];
                const candidateRefs = candidateItems.map((item) => item.ref);
                focusFirst(candidateRefs, false);
            }
        }
        this.isClickFocusRef = false;
    };
    onmousedown = (event: WithTarget<MouseEvent, HTMLDivElement>) => {
        this.opts.onmousedown?.current?.(event);
        if (event.defaultPrevented) return;

        this.isClickFocusRef = true;
    };
    readonly props = $derived.by(() => ({
        role: 'tablist',
        tabIndex:
            this.isTabbingBackOut || this.focusableItemCount === 0 ? -1 : 0,
        'aria-orientation': this.root.opts.orientation.current,
        'data-orientation': this.root.opts.orientation.current,
        'data-slot': 'stepper-list',
        dir: this.root.opts.dir.current,
        onblur: this.onblur,
        onfocus: this.onfocus,
        onmousedown: this.onmousedown
    }));
}

//#endregion

//#region FocusContext

interface FocusContextValueOpts
    extends ReadableBoxedValues<{}>, WritableBoxedValues<{}> {}
export class FocusContextValue {
    readonly opts: FocusContextValueOpts;
    readonly list: StepperListState;

    tabStopId = $state<string | null>('');
    constructor(opts: FocusContextValueOpts, list: StepperListState) {
        this.opts = opts;
        this.list = list;

        this.tabStopId = list.tabStopId;
    }
    static create(opts: FocusContextValueOpts) {
        return FocusContext.set(
            new FocusContextValue(opts, StepperListContext.get())
        );
    }
    getItems(): ItemData[] {
        return Array.from(this.list.itemsRef.values())
            .filter((item) => item.ref)
            .sort((a, b) => {
                const elementA = a.ref;
                const elementB = b.ref;
                if (!elementA || !elementB) return 0;
                const position = elementA.compareDocumentPosition(elementB);
                if (position & Node.DOCUMENT_POSITION_FOLLOWING) {
                    return -1;
                }
                if (position & Node.DOCUMENT_POSITION_PRECEDING) {
                    return 1;
                }
                return 0;
            });
    }
    onItemFocus(tabStopId: string) {
        this.list.tabStopId = tabStopId;
    }
    onItemShiftTab() {
        this.list.isTabbingBackOut = true;
    }
    onFocusableItemAdd() {
        this.list.focusableItemCount++;
    }
    onFocusableItemRemove() {
        this.list.focusableItemCount--;
    }
    onItemRegister(item: ItemData) {
        this.list.itemsRef.set(item.id, item);
    }
    onItemUnregister(id: string) {
        this.list.itemsRef.delete(id);
    }
}

const FocusContext = new Context<FocusContextValue>('FocusContext');

//#endregion

//#region StepperItemContext

interface StepperItemStateOpts extends ReadableBoxedValues<{
    value: string;
    completed?: boolean;
    disabled?: boolean;
}> {}

export class StepperItemState {
    value = $state<string>('');
    completed = $state<boolean>(false);
    disabled = $state<boolean>(false);

    steps = new Map<string, StepState>();
    stepState: StepState | undefined;
    dataState: DataState;

    readonly opts: StepperItemStateOpts;
    readonly store: Store;
    constructor(opts: StepperItemStateOpts, store: Store) {
        this.opts = opts;
        this.store = store;
        this.value = opts.value.current;
        this.completed = opts.completed?.current ?? false;
        this.disabled = opts.disabled?.current ?? false;

        this.steps = store.getState().steps;
        this.stepState = this.steps.get(this.value);
        this.dataState = getDataState(
            this.store.getState().value,
            this.value,
            this.stepState,
            this.steps
        );
        watch(
            [() => this.value, () => this.completed, () => this.disabled],
            () => {
                this.store.addStep(this.value, this.completed, this.disabled);
                return () => {
                    this.store.removeStep(this.value);
                };
            }
        );
        watch(
            [() => this.value, () => this.completed, () => this.disabled],
            () => {
                console.log('set step');

                this.store.setStep(this.value, this.completed, this.disabled);
            }
        );
    }
    static create(opts: StepperItemStateOpts) {
        return StepperItemContext.set(
            new StepperItemState(opts, StoreContext.get())
        );
    }
    readonly props = $derived.by(() => ({
        'data-disabled': this.stepState?.completed ? true : undefined,
        'data-state': this.dataState,
        'aria-orientation': this.store.opts.orientation.current,
        'data-orientation': this.store.opts.orientation.current,
        'data-slot': 'stepper-item',
        dir: this.store.opts.dir.current
    }));
}

const StepperItemContext = new Context<StepperItemState>('StepperItemContext');

//#endregion

//#region StepperIndicatorContext

interface StepperIndicatorStateOpts extends ReadableBoxedValues<{
    id?: string;
}> {}

export class StepperIndicatorState {
    readonly opts: StepperIndicatorStateOpts;
    readonly store: Store;
    readonly item: StepperItemState;
    itemValue;
    steps;
    stepState;
    stepPosition;
    dataState;
    value;
    constructor(
        opts: StepperIndicatorStateOpts,
        store: Store,
        item: StepperItemState
    ) {
        this.opts = opts;
        this.store = store;
        this.item = item;
        this.itemValue = item.value;
        this.value = store.getState().value;
        this.steps = store.getState().steps;
        this.stepState = this.steps.get(this.itemValue);
        this.stepPosition =
            Array.from(this.steps.keys()).indexOf(this.itemValue) + 1;
        this.dataState = getDataState(
            this.value,
            this.itemValue,
            this.stepState,
            this.steps
        );
    }

    static create(opts: StepperIndicatorStateOpts) {
        return new StepperIndicatorState(
            opts,
            StoreContext.get(),
            StepperItemContext.get()
        );
    }

    readonly props = $derived.by(() => ({
        'data-state': this.dataState,
        'data-slot': 'stepper-indicator',
        dir: this.store.opts.dir.current
    }));
}

//#endregion

//#region Trigger

interface StepperTriggerStateOpts extends ReadableBoxedValues<{
    onclick?: MouseEventHandler<HTMLButtonElement>;
    onfocus?: FocusEventHandler<HTMLButtonElement>;
    onkeydown?: KeyboardEventHandler<HTMLButtonElement>;
    onmousedown?: MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
}> {}

export class StepperTriggerState {
    readonly opts: StepperTriggerStateOpts;
    readonly store: Store;
    readonly item: StepperItemState;
    readonly focus: FocusContextValue;
    readonly context: StepperContextValue;

    triggerRef = $state<HTMLButtonElement>(null!);
    isMouseClickRef = $state(false);

    triggerId;
    contentId;
    titleId;
    descriptionId;
    dataState;
    stepIndex;
    isActive;
    stepPosition;
    stepCount;
    isDisabled;
    isTabStop;
    activationMode;
    orientation;
    loop;
    itemValue;
    value;
    steps;
    stepState;
    constructor(
        opts: StepperTriggerStateOpts,
        store: Store,
        item: StepperItemState,
        focus: FocusContextValue,
        context: StepperContextValue
    ) {
        this.opts = opts;
        this.store = store;
        this.item = item;
        this.focus = focus;
        this.context = context;

        this.itemValue = item.value;
        this.value = store.getState().value;
        this.steps = store.getState().steps;
        this.triggerId = stepperGetId(
            context.opts.rootId.current,
            'trigger',
            this.itemValue
        );
        this.contentId = stepperGetId(
            context.opts.rootId.current,
            'content',
            this.itemValue
        );
        this.titleId = stepperGetId(
            context.opts.rootId.current,
            'title',
            this.itemValue
        );
        this.descriptionId = stepperGetId(
            context.opts.rootId.current,
            'description',
            this.itemValue
        );
        this.dataState = getDataState(
            this.value,
            this.itemValue,
            this.stepState,
            this.steps
        );
        this.stepIndex = Array.from(this.steps.keys()).indexOf(this.itemValue);
        this.isActive = this.value === this.itemValue;
        this.stepPosition = this.stepIndex + 1;
        this.stepCount = this.steps.size;
        this.isDisabled =
            opts.disabled?.current ||
            this.stepState?.disabled ||
            context.opts.disabled.current;
        this.isTabStop = focus.tabStopId === this.triggerId;
        this.activationMode = context.opts.activationMode;
        this.orientation = context.opts.orientation;
        this.loop = context.opts.loop;
        this.stepState = this.steps.get(this.itemValue);

        this.onclick = this.onclick.bind(this);
        this.onfocus = this.onfocus.bind(this);
        this.onkeydown = this.onkeydown.bind(this);
        this.onmousedown = this.onmousedown.bind(this);

        watch(
            [
                () => this.focus,
                () => this.triggerId,
                () => this.itemValue,
                () => this.isTabStop,
                () => this.isDisabled
            ],
            () => {
                this.focus.onItemRegister({
                    id: this.triggerId,
                    ref: this.triggerRef,
                    value: this.itemValue,
                    active: this.isTabStop,
                    disabled: this.isDisabled
                });
                if (!this.isDisabled) this.focus.onFocusableItemAdd();
                return () => {
                    this.focus.onItemUnregister(this.triggerId);
                    if (!this.isDisabled) this.focus.onFocusableItemAdd();
                };
            }
        );
    }
    static create(opts: StepperTriggerStateOpts) {
        return new StepperTriggerState(
            opts,
            StoreContext.get(),
            StepperItemContext.get(),
            FocusContext.get(),
            StepperContext.get()
        );
    }

    async onclick(event: WithTarget<MouseEvent, HTMLButtonElement>) {
        this.opts.onclick?.current?.(event);
        if (event.defaultPrevented) return;

        if (!this.isDisabled && !this.context.opts.nonInteractive.current) {
            const currentStepIndex = Array.from(this.steps.keys()).indexOf(
                this.value ?? ''
            );
            const targetStepIndex = Array.from(this.steps.keys()).indexOf(
                this.itemValue
            );
            const direction =
                targetStepIndex > currentStepIndex ? 'next' : 'prev';
            console.log('trigger click');
            console.clear();
            console.log('before', {
                item: this.itemValue,
                rootValue: this.store.getState().value
            });

            await this.store.setStateWithValidation(this.itemValue, direction);
            console.log('after', {
                item: this.itemValue,
                rootValue: this.store.getState().value
            });
        }
    }

    async onfocus(event: WithTarget<FocusEvent, HTMLButtonElement>) {
        this.opts.onfocus?.current?.(event);
        if (event.defaultPrevented) return;

        this.focus.onItemFocus(this.triggerId);

        const isKeyboardFocus = !this.isMouseClickRef;

        if (
            !this.isActive &&
            !this.isDisabled &&
            this.activationMode.current !== 'manual' &&
            !this.context.opts.nonInteractive.current &&
            isKeyboardFocus
        ) {
            const currentStepIndex = Array.from(this.steps.keys()).indexOf(
                this.value || ''
            );
            const targetStepIndex = Array.from(this.steps.keys()).indexOf(
                this.itemValue
            );
            const direction =
                targetStepIndex > currentStepIndex ? 'next' : 'prev';

            await this.store.setStateWithValidation(this.itemValue, direction);
        }

        this.isMouseClickRef = false;
    }

    async onkeydown(event: WithTarget<KeyboardEvent, HTMLButtonElement>) {
        this.opts.onkeydown?.current?.(event);
        if (event.defaultPrevented) return;

        if (event.key === 'Enter' && this.context.opts.nonInteractive.current) {
            event.preventDefault();
            return;
        }

        if (
            (event.key === 'Enter' || event.key === ' ') &&
            this.activationMode.current === 'manual' &&
            !this.context.opts.nonInteractive.current
        ) {
            event.preventDefault();
            if (!this.isDisabled && this.triggerRef) {
                this.triggerRef.click();
            }
            return;
        }

        if (event.key === 'Tab' && event.shiftKey) {
            this.focus.onItemShiftTab();
            return;
        }

        if (event.target !== event.currentTarget) return;

        const focusIntent = getFocusIntent(
            event,
            this.context.opts.dir.current,
            this.orientation.current
        );

        if (focusIntent !== undefined) {
            if (
                event.metaKey ||
                event.ctrlKey ||
                event.altKey ||
                event.shiftKey
            )
                return;
            event.preventDefault();

            const items = this.focus
                .getItems()
                .filter((item) => !item.disabled);
            let candidateRefs = items.map((item) => item.ref);

            if (focusIntent === 'last') {
                candidateRefs.reverse();
            } else if (focusIntent === 'prev' || focusIntent === 'next') {
                if (focusIntent === 'prev') candidateRefs.reverse();
                const currentIndex = candidateRefs.findIndex(
                    (ref) => ref === event.currentTarget
                );
                candidateRefs = this.loop
                    ? wrapArray(candidateRefs, currentIndex + 1)
                    : candidateRefs.slice(currentIndex + 1);
            }

            if (this.store.hasValidation() && candidateRefs.length > 0) {
                const nextRef = candidateRefs[0];
                const nextElement = nextRef;
                const nextItem = items.find((item) => item.ref === nextElement);

                if (nextItem && nextItem.value !== this.itemValue) {
                    const currentStepIndex = Array.from(
                        this.steps.keys()
                    ).indexOf(this.value || '');
                    const targetStepIndex = Array.from(
                        this.steps.keys()
                    ).indexOf(nextItem.value);
                    const direction: NavigationDirection =
                        targetStepIndex > currentStepIndex ? 'next' : 'prev';

                    if (direction === 'next') {
                        const isValid = await this.store.setStateWithValidation(
                            nextItem.value,
                            direction
                        );
                        if (!isValid) return;
                    } else {
                        this.store.setState('value', nextItem.value);
                    }

                    queueMicrotask(() => nextElement?.focus());
                    return;
                }
            }

            queueMicrotask(() => focusFirst(candidateRefs));
        }
    }

    onmousedown(event: WithTarget<MouseEvent, HTMLButtonElement>) {
        this.opts.onmousedown?.current?.(event);
        if (event.defaultPrevented) return;

        this.isMouseClickRef = true;

        if (this.isDisabled) {
            event.preventDefault();
        } else {
            this.focus.onItemFocus(this.triggerId);
        }
    }

    readonly props = $derived.by(() => ({
        id: this.triggerId,
        role: 'tab',
        type: 'button',
        'aria-controls': this.contentId,
        'aria-current': this.isActive ? 'step' : undefined,
        'aria-describedby': `${this.titleId} ${this.descriptionId}`,
        'aria-posinset': this.stepPosition,
        'aria-selected': this.isActive,
        'aria-setsize': this.stepCount,
        'data-disabled': this.isDisabled,
        'data-state': this.dataState,
        'data-slot': 'stepper-trigger',
        tabindex: this.isTabStop ? 0 : -1,
        disabled: this.isDisabled,
        dir: this.store.opts.dir.current,
        onclick: this.onclick,
        onfocus: this.onfocus,
        onkeydown: this.onkeydown,
        onmousedown: this.onmousedown
    }));
}

//#endregion

//#region Separator

interface StepperSeparatorStateOpts extends ReadableBoxedValues<{
    forceMount?: boolean;
}> {}

export class StepperSeparatorState {
    readonly opts: StepperSeparatorStateOpts;
    readonly store: Store;
    readonly item: StepperItemState;

    value;
    itemValue;
    itemStepState;
    steps;
    stepIndex;
    isLastStep;
    empty;
    dataState;

    constructor(
        opts: StepperSeparatorStateOpts,
        store: Store,
        item: StepperItemState
    ) {
        this.opts = opts;
        this.store = store;
        this.item = item;

        this.value = store.getState().value;
        this.steps = store.getState().steps;
        this.itemValue = item.value;
        this.itemStepState = item.stepState;
        this.stepIndex = Array.from(this.steps.keys()).indexOf(this.itemValue);
        this.isLastStep = this.stepIndex === this.steps.size - 1;
        this.empty = this.isLastStep && !opts.forceMount;
        this.dataState = getDataState(
            this.value,
            this.itemValue,
            this.itemStepState,
            this.steps,
            'separator'
        );
    }
    static create(opts: StepperSeparatorStateOpts) {
        return new StepperSeparatorState(
            opts,
            StoreContext.get(),
            StepperItemContext.get()
        );
    }

    readonly props = $derived.by(
        () =>
            ({
                role: 'separator',
                'aria-hidden': true,
                'aria-orientation': this.store.opts.orientation.current,
                'data-orientation': this.store.opts.orientation.current,
                'data-state': this.dataState,
                'data-slot': 'stepper-separator',
                dir: this.store.opts.dir.current
            }) as const
    );
}

//#endregion
