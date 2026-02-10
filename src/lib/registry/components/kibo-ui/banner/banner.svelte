<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';
    import { BannerContextState } from './context.svelte';
    import { boxWith } from 'svelte-toolbelt';
    import { cn } from '$lib/utils';

    type BannerProps = HTMLAttributes<HTMLDivElement> & {
        visible?: boolean;
        defaultVisible?: boolean;
        onClose?: () => void;
        inset?: boolean;
    };

    let {
        children,
        visible,
        defaultVisible = true,
        onClose,
        class: className,
        inset = false,
        ...props
    }: BannerProps = $props();

    const bannerContext = BannerContextState.create({
        show: boxWith(() => visible ?? defaultVisible),
        setShow: boxWith(() => (v) => (visible = v))
    });
</script>

{#if bannerContext.opts.show.current}
    <div
        class={cn(
            'flex w-full items-center justify-between gap-2 bg-primary px-4 py-2 text-primary-foreground',
            inset && 'rounded-lg',
            className
        )}
        {...props}
    >
        {@render children?.()}
    </div>
{/if}
