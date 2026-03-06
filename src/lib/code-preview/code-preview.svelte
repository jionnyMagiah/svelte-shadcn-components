<script lang="ts">
    import Button from '$lib/components/ui/button/button.svelte';
    import * as Tabs from '$lib/components/ui/tabs/index.js';
    import { cn } from '$lib/utils';
    import { Check, ClipboardList, RotateCcw } from '@lucide/svelte';
    import { getCodepreview } from 'routes/api/api.remote';
    import type { Component as ComponentType } from 'svelte';
    type CodePreviewData = Awaited<ReturnType<typeof getCodepreview>>;
    let {
        name
    }: {
        name: keyof CodePreviewData;
    } = $props();
    let stamp = $state(Date.now());
    interface ModuleImportInterface {
        default?: ComponentType;
    }

    const componentsRegistry: Record<string, ModuleImportInterface> =
        import.meta.glob('./snippet/*.svelte', {
            eager: true
        });

    const data = $derived(await getCodepreview());
    const path = $derived(data[name]?.path);
    const Component = $derived(componentsRegistry[path]?.default);

    const highlighted = $derived(data[name]?.highlighted);

    const triggerClass = cn(
        'h-full rounded-none border-0 border-b-2 border-transparent bg-background data-[state=active]:border-primary data-[state=active]:bg-transparent! data-[state=active]:shadow-none dark:data-[state=active]:border-primary'
    );

    async function copyCode() {
        await navigator.clipboard.writeText(data[name].content);
        isCopied = true;
        setTimeout(() => {
            isCopied = false;
        }, 500);
    }

    let isCopied = $state(false);
</script>

<Tabs.Root value="preview" class="gap-4 py-2">
    <Tabs.List class="rounded-none border-b bg-background p-0">
        <Tabs.Trigger class={triggerClass} value="preview">Preview</Tabs.Trigger
        >
        <Tabs.Trigger class={triggerClass} value="code">Code</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="preview">
        <div
            class="relative flex min-h-100 w-full flex-row items-center justify-center rounded-md border bg-card p-2 py-10"
        >
            <Button
                class="absolute top-2 right-2"
                variant="outline"
                title="Reset"
                onclick={() => (stamp = Date.now())}
            >
                <RotateCcw />
            </Button>
            {#key stamp}
                {#if Component}
                    <Component />
                {:else}
                    <p
                        class="rounded-md border-2 border-destructive bg-destructive/10 p-4"
                    >
                        Component <code>{name}</code> not in code-preview-registry
                    </p>
                {/if}
            {/key}
        </div>
    </Tabs.Content>
    <Tabs.Content value="code" class="group relative max-h-100">
        {@html highlighted}
        <Button
            size="icon-sm"
            variant="default"
            class={'size-7 px-0 py-0 opacity-0 group-hover:opacity-100 hover:opacity-100'}
            onclick={copyCode}
            data-pre-copy-btn=""
            aria-label="Copy code"
        >
            {#if isCopied}
                <Check />
            {:else}
                <ClipboardList />
            {/if}
        </Button>
    </Tabs.Content>
</Tabs.Root>
