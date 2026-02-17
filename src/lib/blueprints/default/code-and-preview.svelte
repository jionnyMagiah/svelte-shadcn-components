<script lang="ts">
    import Button from '$lib/components/ui/button/button.svelte';
    import * as Code from '$lib/components/ui/code';
    import * as Tabs from '$lib/components/ui/tabs/index.js';
    import { RotateCcw } from '@lucide/svelte';
    import { getCodepreview } from 'routes/api/api.remote';
    type CodePreviewData = Awaited<ReturnType<typeof getCodepreview>>;
    let {
        name
    }: {
        name: keyof CodePreviewData;
    } = $props();
    let stamp = $state(Date.now());

    const data = $derived(await getCodepreview());
    const content = $derived(data[name].content);
    const path = $derived(data[name].path);
    const Component = $derived((await import(path)).default);
</script>

<Tabs.Root value="preview" class="gap-4 py-2">
    <Tabs.List class="rounded-none border-b bg-background p-0">
        <Tabs.Trigger
            class="h-full rounded-none border-0 border-b-2 border-transparent bg-background data-[state=active]:border-primary data-[state=active]:shadow-none dark:data-[state=active]:border-primary"
            value="preview">Preview</Tabs.Trigger
        >
        <Tabs.Trigger
            class="h-full rounded-none border-0 border-b-2 border-transparent bg-background data-[state=active]:border-primary data-[state=active]:shadow-none dark:data-[state=active]:border-primary"
            value="code">Code</Tabs.Trigger
        >
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
                <Component />
            {/key}
        </div>
    </Tabs.Content>
    <Tabs.Content value="code">
        <div class="-2 w-full">
            <Code.Root
                lang="plain"
                class="h-min max-h-100"
                code={content.trim()}
            >
                <Code.CopyButton variant="ghost" size="icon" />
            </Code.Root>
        </div>
    </Tabs.Content>
</Tabs.Root>
