<script lang="ts">
    import TableHeader from '$lib/components/ui/table/table-header.svelte';
    import { cn } from '$lib/utils.js';
    import type { HTMLAttributes } from 'svelte/elements';
    let {
        class: className,
        children,
        ...restProps
    }: HTMLAttributes<HTMLTableSectionElement> = $props();
</script>

<TableHeader
    data-slot="table-header"
    class={cn(className, 'bg-muted')}
    {...restProps}
>
    {@render children?.()}
</TableHeader>
