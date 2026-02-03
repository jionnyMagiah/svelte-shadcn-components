<script lang="ts">
    import type { ComponentProps } from 'svelte';
    import CheckboxGroupList from '$lib/registry/packages/dice-ui/checkbox-group/checkbox-group-list.svelte';
    import { cn } from '$lib/utils';

    let {
        class: className,
        children,
        ...props
    }: ComponentProps<typeof CheckboxGroupList> = $props();
</script>

<CheckboxGroupList
    data-slot="checkbox-group-list"
    class={cn(
        'flex gap-3 data-[orientation=horizontal]:flex-row data-[orientation=vertical]:flex-col',
        className
    )}
    {...props}
>
    {@render children?.()}
</CheckboxGroupList>
