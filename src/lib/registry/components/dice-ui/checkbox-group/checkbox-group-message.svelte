<script lang="ts">
    import type { ComponentProps } from 'svelte';
    import CheckboxGroupMessage from '$lib/registry/packages/dice-ui/checkbox-group/checkbox-group-message.svelte';
    import { cn } from '$lib/utils';

    let {
        class: className,
        children,
        ...props
    }: ComponentProps<typeof CheckboxGroupMessage> = $props();
</script>

<CheckboxGroupMessage
    data-slot="checkbox-group-message"
    class={cn(
        'text-[0.8rem] leading-none text-muted-foreground data-invalid:text-destructive',
        className
    )}
    {...props}
>
    {@render children?.()}
</CheckboxGroupMessage>
