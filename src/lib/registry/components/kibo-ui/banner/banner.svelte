<script lang="ts">
    import { cn } from '$lib/utils';
    import { boxWith } from 'svelte-toolbelt';
    import type { HTMLAttributes } from 'svelte/elements';
    import { BannerContextState } from './context.svelte';
    import { watch } from 'runed';

    type BannerProps = Omit<HTMLAttributes<HTMLDivElement>, 'onclose'> & {
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
    watch([() => bannerContext.opts.show.current], () => {
        if (!bannerContext.opts.show.current) onClose?.();
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
