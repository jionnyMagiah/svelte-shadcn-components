<script lang="ts">
    import type {
        TableOfContents,
        TocState
    } from '$lib/hooks/use-toc.svelte.js';
    import MobileTocTree from './mobile-toc-tree.svelte';
    // import { Popover } from "bits-ui";
    import * as Popover from '$lib/components/ui/popover/index.js';
    import Button from '$lib/components/ui/button/button.svelte';
    import { ChevronRight } from '@lucide/svelte';

    let { tree, tocState }: { tree: TableOfContents; tocState: TocState } =
        $props();

    let open = $state(false);
</script>

<Popover.Root bind:open>
    <Popover.Trigger>
        {#snippet child({ props })}
            <Button
                {...props}
                variant="ghost"
                class=" w-full items-center justify-start gap-2 border border-border px-4 py-2.5 font-normal ring-0 data-[state=open]:bg-foreground/2 hover:data-[state=open]:bg-foreground/3 hover:data-[state=open]:ring-foreground/3 xl:hidden dark:data-[state=open]:bg-foreground/5 dark:data-[state=open]:ring-foreground/5 hover:dark:data-[state=open]:bg-foreground/7 hover:dark:data-[state=open]:ring-foreground/7 data-[state=open]:[&>svg]:rotate-90"
            >
                <ChevronRight
                    class="size-4 text-muted-foreground transition-transform duration-150"
                    data-open={open ? '' : undefined}
                    data-closed={open ? undefined : ''}
                />
                On this page
            </Button>
        {/snippet}
    </Popover.Trigger>
    <Popover.Content
        class="w-(--bits-popover-anchor-width) py-2 shadow-sm  focus-visible:outline-none dark:shadow-none dark:ring-foreground/20 dark:inset-shadow-background/20"
    >
        <MobileTocTree {tree} {tocState} closePopover={() => (open = false)} />
    </Popover.Content>
</Popover.Root>
