import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
interface GetBadgeLabel<T> {
    /**
     * Callback that returns a label string for each badge item.
     * Optional for primitive arrays (strings, numbers), required for object arrays.
     * @example getBadgeLabel={(item) => item.name}
     */
    getBadgeLabel: (item: T) => string;
}
export type BadgeOverflowProps<T> = HTMLAttributes<HTMLDivElement> &
    (T extends object ? GetBadgeLabel<T> : Partial<GetBadgeLabel<T>>) & {
        items?: T[];
        lineCount?: number;
        renderBadge?: Snippet<[item: T, label: string]>;
        renderOverflow?: Snippet<[count: number]>;
        ref?: HTMLDivElement;
    };
