<script lang="ts">
    import { cn } from '$lib/utils';
    import type { Component } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';

    type BannerIconProps = HTMLAttributes<HTMLDivElement> & {
        icon: Component;
    };

    let { icon: Icon, class: className, ...props }: BannerIconProps = $props();
</script>

<div
    class={cn(
        'rounded-full border border-background/20 bg-background/10 p-1 shadow-sm',
        className
    )}
    {...props}
>
    <Icon size={16} />
</div>
