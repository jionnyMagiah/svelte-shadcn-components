<script lang="ts">
    import TableRow from '$lib/components/ui/table/table-row.svelte';
    import { cn } from '$lib/utils';
    import type { HTMLAttributes } from 'svelte/elements';

    let {
        class: className,
        children,
        ...restProps
    }: HTMLAttributes<HTMLTableRowElement> = $props();
</script>

<TableRow class={cn(className, '[&>th]:bg-transparent!')} {...restProps}>
    {@render children?.()}
</TableRow>
