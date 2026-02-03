<script lang="ts">
    import type { ComponentProps } from 'svelte';
    import CheckboxGroup from '$lib/registry/packages/dice-ui/checkbox-group/checkbox-group.svelte';
    import { cn } from '$lib/utils';

    let {
        class: className,
        children,
        value = $bindable(),
        ...props
    }: ComponentProps<typeof CheckboxGroup> = $props();
</script>

<CheckboxGroup
    data-slot="checkbox-group"
    {value}
    class={cn('peer flex flex-col gap-3.5', className)}
    {...props}
>
    {@render children?.()}
</CheckboxGroup>
