<script lang="ts">
    import * as Code from '$lib/components/ui/code';
    import * as Tabs from '$lib/components/ui/tabs/index.js';
    import { RotateCcw } from '@lucide/svelte';
    import type { Snippet } from 'svelte';
    import Button from './ui/button/button.svelte';
    import type { SupportedLanguage } from './ui/code/shiki';
    let {
        code,
        lang = 'svelte',
        children
    }: {
        code: string;
        lang?: SupportedLanguage;
        children?: Snippet;
    } = $props();
    let stamp = $state(Date.now());
</script>

<Tabs.Root value="preview" class="py-2">
    <Tabs.List>
        <Tabs.Trigger value="preview">Preview</Tabs.Trigger>
        <Tabs.Trigger value="code">Code</Tabs.Trigger>
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
                {@render children?.()}
            {/key}
        </div>
    </Tabs.Content>
    <Tabs.Content value="code">
        <div class="-2 w-full">
            <Code.Root {lang} class="h-min max-h-100" code={code.trim()}>
                <Code.CopyButton variant="ghost" size="icon" />
            </Code.Root>
        </div>
    </Tabs.Content>
</Tabs.Root>
