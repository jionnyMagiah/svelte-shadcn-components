import type { Direction, Orientation } from 'bits-ui';
import { Context } from 'runed';
import type { ReadableBoxedValues } from 'svelte-toolbelt';

export const CheckboxGroupContext = new Context<CheckboxGroupContextValue>(
    'CheckboxGroupContext'
);
export const CheckboxGroupItemContext =
    new Context<CheckboxGroupContextItemValue>('CheckboxGroupItemContext');

type CheckboxGroupContextValueOpts = ReadableBoxedValues<{
    value: string[];
    onValueChange?: (value: string[]) => void;
    onItemCheckedChange: (value: string, checked: boolean) => void;
    onReset: () => void;
    disabled?: boolean;
    isInvalid: boolean;
    required?: boolean;
    dir: Direction;
    orientation: Orientation;
    id: string;
    labelId: string;
    descriptionId: string;
    messageId: string;
    validationMessage?: string | string[];
    readOnly: boolean;
}>;

export class CheckboxGroupContextValue {
    readonly opts: CheckboxGroupContextValueOpts;
    constructor(opts: CheckboxGroupContextValueOpts) {
        this.opts = opts;
    }
    static create(opts: CheckboxGroupContextValueOpts) {
        return CheckboxGroupContext.set(new CheckboxGroupContextValue(opts));
    }
}

type CheckboxGroupItemContextValueOpts = ReadableBoxedValues<{
    value: string;
    disabled: boolean;
    checked: boolean;
}>;

export class CheckboxGroupContextItemValue {
    readonly opts: CheckboxGroupItemContextValueOpts;
    constructor(opts: CheckboxGroupItemContextValueOpts) {
        this.opts = opts;
    }
    static create(opts: CheckboxGroupItemContextValueOpts) {
        return CheckboxGroupItemContext.set(
            new CheckboxGroupContextItemValue(opts)
        );
    }
}
