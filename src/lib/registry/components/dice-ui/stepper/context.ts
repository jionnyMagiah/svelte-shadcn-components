import type { Direction, Orientation } from 'bits-ui';
import type {
    ActivationMode,
    ItemData,
    NavigationDirection,
    StepState,
    StoreState
} from '.';
import { createContext } from 'svelte';

export type StepperContextStore = {
    subscribe: (callback: () => void) => () => void;
    getState: () => StoreState;
    setState: <K extends keyof StoreState>(
        key: K,
        value: StoreState[K]
    ) => void;
    setStateWithValidation: (
        value: string,
        direction: NavigationDirection
    ) => Promise<boolean>;
    hasValidation: () => boolean;
    notify: () => void;
    addStep: (value: string, completed: boolean, disabled: boolean) => void;
    removeStep: (value: string) => void;
    setStep: (value: string, completed: boolean, disabled: boolean) => void;
};
export const [getStepperContextStore, setStepperContextStore] =
    createContext<() => StepperContextStore>();

export type StepperContextItemData = {
    id: string;
    ref: HTMLButtonElement | null;
    value: string;
    active: boolean;
    disabled: boolean;
};
export const [getStepperContextItemData, setStepperContextItemData] =
    createContext<() => StepperContextItemData>();

export type StepperContextValue = {
    rootId: string;
    dir?: Direction;
    orientation: Orientation;
    activationMode: ActivationMode;
    disabled: boolean;
    nonInteractive: boolean;
    loop: boolean;
};
export const [getStepperContextValue, setStepperContextValue] =
    createContext<() => StepperContextValue>();

export type StepperContextFocusValue = {
    tabStopId: string | null;
    onItemFocus: (tabStopId: string) => void;
    onItemShiftTab: () => void;
    onFocusableItemAdd: () => void;
    onFocusableItemRemove: () => void;
    onItemRegister: (item: ItemData) => void;
    onItemUnregister: (id: string) => void;
    getItems: () => ItemData[];
};
export const [getStepperContextFocusValue, setStepperContextFocusValue] =
    createContext<() => StepperContextFocusValue>();

export type StepperContextItemValue = {
    value: string;
    stepState: StepState | undefined;
};
export const [getStepperContextItemValue, setStepperContextItemValue] =
    createContext<() => StepperContextItemValue>();
