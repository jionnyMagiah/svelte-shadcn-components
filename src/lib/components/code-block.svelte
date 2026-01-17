<script lang="ts">
    import * as Code from '$lib/components/ui/code';
    import type { SupportedLanguage } from './ui/code/shiki';
    let { code, lang = 'svelte' }: { code: string; lang?: SupportedLanguage } =
        $props();
</script>

<div class="w-full py-2">
    <Code.Root {lang} class="h-min" {code}>
        <Code.CopyButton />
    </Code.Root>
</div>
