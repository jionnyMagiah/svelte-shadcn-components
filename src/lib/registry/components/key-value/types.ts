export type ItemData = {
    id: string;
    key: string;
    value: string;
};

export type KeyValueState = {
    value: ItemData[];
    focusedId: string | null;
    errors: Record<string, { key?: string; value?: string }>;
};

export type Orientation = 'vertical' | 'horizontal';
export type KeyValueField = 'key' | 'value';
