<script lang="ts">
    import { cn } from '$lib/utils';
    import type { HTMLAttributes } from 'svelte/elements';

    type BannerTitleProps = HTMLAttributes<HTMLParagraphElement>;

    let { class: className, children, ...props }: BannerTitleProps = $props();
</script>

<p class={cn('flex-1 text-sm', className)} {...props}>
    {@render children?.()}
</p>
