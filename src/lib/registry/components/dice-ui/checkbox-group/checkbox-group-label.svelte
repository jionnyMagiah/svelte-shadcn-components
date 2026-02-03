<script lang="ts">
    import type { ComponentProps } from 'svelte';
    import CheckboxGroupLabel from '$lib/registry/packages/dice-ui/checkbox-group/checkbox-group-label.svelte';
    import { cn } from '$lib/utils';

    let {
        class: className,
        children,
        ...props
    }: ComponentProps<typeof CheckboxGroupLabel> = $props();
</script>

<CheckboxGroupLabel
    data-slot="checkbox-group-label"
    class={cn(
        'text-sm leading-none text-foreground/70 peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className
    )}
    {...props}
>
    {@render children?.()}
</CheckboxGroupLabel>
