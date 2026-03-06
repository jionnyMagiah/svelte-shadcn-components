<script lang="ts">
    import type { Snippet } from 'svelte';

    let { code, children }: { code: string; children: Snippet } = $props();

    let copied = $state(false);
    let buttonText = $derived(copied ? 'Copied!' : 'Copy');

    async function copyToClipboard() {
        try {
            await navigator.clipboard.writeText(code);
            copied = true;
            setTimeout(() => {
                copied = false;
            }, 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    }
</script>

<div class="group relative">
    <button
        onclick={copyToClipboard}
        class="absolute top-2 right-2 rounded bg-gray-700 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-gray-600"
    >
        {buttonText}
    </button>
    {@render children?.()}
</div>
