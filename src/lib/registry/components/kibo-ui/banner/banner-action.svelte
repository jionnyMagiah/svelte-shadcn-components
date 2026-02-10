<script lang="ts">
    import Button from '$lib/components/ui/button/button.svelte';
    import { cn } from '$lib/utils';
    import type { ComponentProps } from 'svelte';

    type BannerActionProps = ComponentProps<typeof Button>;
    let {
        variant = 'outline',
        size = 'sm',
        class: className,
        children,
        ...props
    }: BannerActionProps = $props();
    // todo: child snippet
</script>

<Button
    class={cn(
        'shrink-0 bg-transparent hover:bg-background/10 hover:text-background',
        className
    )}
    {size}
    {variant}
    {...props}
>
    {@render children?.()}
</Button>
