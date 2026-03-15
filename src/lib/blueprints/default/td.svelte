<script lang="ts">
    import TableCell from '$lib/components/ui/table/table-cell.svelte';
    import type { HTMLAttributes } from 'svelte/elements';

    let {
        class: className,
        children,
        ...restProps
    }: HTMLAttributes<HTMLTableCellElement> = $props();
</script>

<TableCell class={className} {...restProps}>
    {@render children?.()}
</TableCell>
