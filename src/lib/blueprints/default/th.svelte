<script lang="ts">
    import TableHead from '$lib/components/ui/table/table-head.svelte';
    import { cn } from '$lib/utils';
    import type { HTMLAttributes } from 'svelte/elements';

    let {
        class: className,
        children,
        ...restProps
    }: HTMLAttributes<HTMLTableCellElement> = $props();
</script>

<TableHead class={cn(className, 'font-semibold')} {...restProps}>
    {@render children?.()}
</TableHead>
