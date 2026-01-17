<script lang="ts">
    import * as Code from '$lib/components/ui/code';
    import * as Tabs from '$lib/components/ui/tabs/index.js';
    import type { Snippet } from 'svelte';
    import type { SupportedLanguage } from './ui/code/shiki';
    let {
        code,
        lang = 'svelte',
        children
    }: { code: string; lang?: SupportedLanguage; children: Snippet } = $props();
</script>

<Tabs.Root value="preview" class='py-2'>
    <Tabs.List>
        <Tabs.Trigger value="preview">Preview</Tabs.Trigger>
        <Tabs.Trigger value="code">Code</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="preview">
        <div
            class="flex min-h-100 w-full flex-row items-center justify-center rounded-md border p-2 py-10 bg-card"
        >
            {@render children?.()}
        </div>
    </Tabs.Content>
    <Tabs.Content value="code">
        <div class="w-full -2">
            <Code.Root {lang} class="h-min max-h-100" code={code.trim()}>
                <Code.CopyButton />
            </Code.Root>
        </div>
    </Tabs.Content>
</Tabs.Root>
