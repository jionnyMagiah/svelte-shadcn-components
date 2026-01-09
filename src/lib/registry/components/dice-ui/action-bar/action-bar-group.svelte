<script lang="ts" module>
    import { cn } from '$lib/utils';
    import type { Snippet } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';

    export type ActionBarGroupProp = HTMLAttributes<HTMLDivElement> & {
        children?: Snippet;
        orientation?: 'vertical' | 'horizontal';
    };
</script>

<script lang="ts">
    let {
        children,
        orientation = 'horizontal',
        class: className
    }: ActionBarGroupProp = $props();
</script>

<div
    role="group"
    data-slot="action-bar-group"
    data-orientation={orientation}
    class={cn(
        'flex gap-2 outline-none',
        orientation === 'horizontal'
            ? 'items-center'
            : 'w-full flex-col items-start',
        className
    )}
>
    {@render children?.()}
</div>
