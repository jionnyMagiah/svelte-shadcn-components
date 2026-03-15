<script lang="ts">
    import Table from '$lib/components/ui/table/table.svelte';
    import { cn } from '$lib/utils';
    import type { HTMLAttributes } from 'svelte/elements';

    let {
        class: className,
        children,
        ...restProps
    }: HTMLAttributes<HTMLTableElement> = $props();
</script>

<Table class={cn(className)} {...restProps}>
    {@render children?.()}
</Table>
