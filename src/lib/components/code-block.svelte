<script lang="ts">
    import * as Code from '$lib/components/ui/code';
    import type { SupportedLanguage } from './ui/code/shiki';
    let {
        code,
        lang = 'svelte'
    }: { code: string; lang?: SupportedLanguage | 'plain' } = $props();
</script>

<div class="w-full py-2">
    <Code.Root {lang} class="h-min" code={code.trim()}>
        <Code.CopyButton variant="ghost" size="icon" />
    </Code.Root>
</div>
