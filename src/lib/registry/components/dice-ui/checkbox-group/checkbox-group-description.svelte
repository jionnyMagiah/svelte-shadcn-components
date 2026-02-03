<script lang="ts">
    import type { ComponentProps } from 'svelte';
    import CheckboxGroupDescription from '$lib/registry/packages/dice-ui/checkbox-group/checkbox-group-description.svelte';
    import { cn } from '$lib/utils';

    let {
        class: className,
        children,
        ...props
    }: ComponentProps<typeof CheckboxGroupDescription> = $props();
</script>

<CheckboxGroupDescription
    data-slot="checkbox-group-description"
    class={cn(
        'text-[0.8rem] leading-none text-muted-foreground data-invalid:text-destructive',
        className
    )}
    {...props}
>
    {@render children?.()}
</CheckboxGroupDescription>
