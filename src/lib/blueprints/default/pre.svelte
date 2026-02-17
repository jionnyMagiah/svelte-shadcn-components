<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn } from "$lib/utils.js";
	import ScrollArea from "$lib/components/ui/scroll-area/scroll-area.svelte";
	import { Button } from "$lib/components/ui/button/index.js";
    import { useCopyToClipboard } from "$lib/hooks/use-copy-to-clipboard.svelte";
    import { Check, ClipboardList } from "@lucide/svelte";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLPreElement> = $props();

	const copier = useCopyToClipboard();
</script>

<ScrollArea orientation="both" data-pre-wrapper="">
	<pre
		class={cn("ring ring-transparent", className)}
		{...restProps}
		use:copier.setCodeStringAction>
		{@render children?.()}
	</pre>
</ScrollArea>
<Button
	size="icon-sm"
	variant="ghost"
	class="size-7 px-0 py-0"
	onclick={() => copier.copyToClipboard()}
	data-pre-copy-btn=""
	aria-label="Copy code"
>
	{#if copier.isCopied}
		<Check />
	{:else}
		<ClipboardList />
	{/if}
</Button>