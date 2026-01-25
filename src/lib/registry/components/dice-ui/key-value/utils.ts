export type Field = 'key' | 'value';
export const ROOT_NAME = 'KeyValue';
export const LIST_NAME = 'KeyValueList';
export const ITEM_NAME = 'KeyValueItem';
export const KEY_INPUT_NAME = 'KeyValueKeyInput';
export const VALUE_INPUT_NAME = 'KeyValueValueInput';
export const REMOVE_NAME = 'KeyValueRemove';
export const ADD_NAME = 'KeyValueAdd';
export const ERROR_NAME = 'KeyValueError';

export function getErrorId(rootId: string, itemId: string, field: Field) {
    return `${rootId}-${itemId}-${field}-error`;
}

export function removeQuotes(string: string, shouldStrip: boolean): string {
    if (!shouldStrip) return string;

    const trimmed = string.trim();
    if (
        (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
        (trimmed.startsWith("'") && trimmed.endsWith("'"))
    ) {
        return trimmed.slice(1, -1);
    }
    return trimmed;
}
