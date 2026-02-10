<script lang="ts">
    import Button from '$lib/components/ui/button/button.svelte';
    import { cn } from '$lib/utils';
    import { XIcon } from '@lucide/svelte';
    import type { ComponentProps } from 'svelte';
    import { BannerContext } from './context.svelte';

    type BannerCloseProps = ComponentProps<typeof Button> & {
        onclick?: (e: MouseEvent) => void;
    };
    let {
        variant = 'ghost',
        size = 'icon',
        onclick,
        class: className,
        ...props
    }: BannerCloseProps = $props();
    // todo: child snippet

    const setShow = $derived(BannerContext.get().opts.setShow.current);
</script>

<Button
    type="button"
    class={cn(
        'shrink-0 bg-transparent hover:bg-background/10 hover:text-background',
        className
    )}
    onclick={(e) => {
        setShow(false);
        onclick?.(e);
    }}
    {size}
    {variant}
    {...props}
>
    <XIcon size={18} />
</Button>
