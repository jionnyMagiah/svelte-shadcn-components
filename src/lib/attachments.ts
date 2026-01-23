import type { Attachment } from 'svelte/attachments';
function isHeading(el: Element) {
    return el instanceof HTMLElement && /^H[1-6]$/.test(el.tagName);
}
export const autoId: Attachment = (element) => {
    if (isHeading(element)) {
        element.id = (element as HTMLHeadingElement).innerText
            .toLowerCase()
            .replaceAll(' ', '-');
    }
};
