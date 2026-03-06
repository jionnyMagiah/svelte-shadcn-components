<script lang="ts">
    import CheckboxGroupIndicator from '$lib/registry/packages/dice-ui/checkbox-group/checkbox-group-indicator.svelte';
    import CheckboxGroupItem from '$lib/registry/packages/dice-ui/checkbox-group/checkbox-group-item.svelte';
    import { cn } from '$lib/utils';
    import { Check } from '@lucide/svelte';
    import type { ComponentProps } from 'svelte';

    let {
        class: className,
        children,
        ...props
    }: ComponentProps<typeof CheckboxGroupItem> = $props();
</script>

<label
    class="flex w-fit items-center gap-2 text-sm leading-none select-none has-data-disabled:cursor-not-allowed has-data-disabled:opacity-50 has-data-invalid:text-destructive"
>
    <CheckboxGroupItem
        data-slot="checkbox-group-item"
        class={cn(
            'size-4 shrink-0 rounded-sm border border-primary shadow-sm focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-hidden data-invalid:border-destructive [&[data-state=checked]:not([data-invalid])]:bg-primary [&[data-state=checked]:not([data-invalid])]:text-primary-foreground [&[data-state=checked][data-invalid]]:bg-destructive [&[data-state=checked][data-invalid]]:text-primary-foreground [&[data-state=unchecked][data-invalid]]:bg-transparent',
            className
        )}
        {...props}
    >
        <CheckboxGroupIndicator
            class="flex items-center justify-center text-current"
        >
            <Check class="size-3.5" />
            <!-- {#snippet child({ props })}
            {/snippet} -->
        </CheckboxGroupIndicator>
    </CheckboxGroupItem>
    {@render children?.()}
</label>
