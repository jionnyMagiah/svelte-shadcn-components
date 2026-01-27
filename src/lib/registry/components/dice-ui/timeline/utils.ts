export type Variant = 'default' | 'alternate';
export type Status = 'completed' | 'active' | 'pending';

export function getItemStatus(itemIndex: number, activeIndex?: number): Status {
    if (activeIndex === undefined) return 'pending';
    if (itemIndex < activeIndex) return 'completed';
    if (itemIndex === activeIndex) return 'active';
    return 'pending';
}

export function getSortedEntries(entries: [string, HTMLElement | null][]) {
    return entries.sort((a, b) => {
        const elementA = a[1];
        const elementB = b[1];
        if (!elementA || !elementB) return 0;
        const position = elementA.compareDocumentPosition(elementB);
        if (position & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
        if (position & Node.DOCUMENT_POSITION_PRECEDING) return 1;
        return 0;
    });
}
