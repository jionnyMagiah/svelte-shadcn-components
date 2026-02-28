<script lang="ts" module>
    import { createHighlighterCore } from 'shiki';
    import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
    const jsEngine = createJavaScriptRegexEngine();
    const highlighter = await createHighlighterCore({
        themes: [
            import('@shikijs/themes/github-light'),
            import('@shikijs/themes/github-dark')
        ],
        langs: [
            import('@shikijs/langs/typescript'),
            import('@shikijs/langs/svelte'),
            import('@shikijs/langs/css'),
            import('@shikijs/langs/json'),
            import('@shikijs/langs/bash'),
            import('@shikijs/langs/astro'),
            import('@shikijs/langs/diff')
        ],
        engine: jsEngine
    });
</script>

<script lang="ts">
    import Button from '$lib/components/ui/button/button.svelte';
    // import * as Code from '$lib/components/ui/code';
    // import type { SupportedLanguage } from '$lib/components/ui/code/shiki';
    import * as Tabs from '$lib/components/ui/tabs/index.js';
    import { cn } from '$lib/utils';
    import { RotateCcw } from '@lucide/svelte';
    import { getCodepreview } from 'routes/api/api.remote';
    import type { Snippet } from 'svelte';
    type CodePreviewData = Awaited<ReturnType<typeof getCodepreview>>;
    let {
        name
    }: {
        name: keyof CodePreviewData;
    } = $props();
    let stamp = $state(Date.now());

    const data = $derived(await getCodepreview());
    const path = $derived(data[name].path);
    const Component = $derived((await import(path)).default);
    const ext = $derived(data[name].extension);
    const highlighted = $derived(data[name].highlighted);


    const triggerClass = cn(
        'h-full rounded-none border-0 border-b-2 border-transparent bg-background data-[state=active]:border-primary data-[state=active]:bg-transparent! data-[state=active]:shadow-none dark:data-[state=active]:border-primary'
    );
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
                <Component />
            {/key}
        </div>
    </Tabs.Content>
    <Tabs.Content value="code" class="max-h-100">
        {@html highlighted}
    </Tabs.Content>
</Tabs.Root>
