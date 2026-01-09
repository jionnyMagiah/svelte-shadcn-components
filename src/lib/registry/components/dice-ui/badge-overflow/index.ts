export interface GetBadgeLabel<T> {
    /**
     * Callback that returns a label string for each badge item.
     * Optional for primitive arrays (strings, numbers), required for object arrays.
     * @example getBadgeLabel={(item) => item.name}
     */
    getBadgeLabel: (item: T) => string;
}
