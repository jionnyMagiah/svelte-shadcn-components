<script lang="ts">
    import { cn } from '$lib/utils';
    import { Check, ClipboardList, Eye, EyeOff } from '@lucide/svelte';
    import { SvelteSet } from 'svelte/reactivity';
    import CopyButton from './copy-button.svelte';
    import RevealButton from './reveal-button.svelte';
    import {
        envBadgeColor,
        maskValue,
        type EnvTableProps,
        type EnvVariable
    } from './utils';
    let {
        variables,
        title,
        defaultRevealed = false,
        className
    }: EnvTableProps = $props();
    let revealedIndices = $derived(
        defaultRevealed
            ? new SvelteSet(variables.map((_, i) => i))
            : new SvelteSet()
    );

    let copiedAll = $state(false);
    const allRevealed = $derived(revealedIndices.size === variables.length);

    const toggleIndex = (index: number) => {
        if (revealedIndices.has(index)) {
            revealedIndices.delete(index);
        } else {
            revealedIndices.add(index);
        }
    };

    const toggleAll = () => {
        if (allRevealed) {
            revealedIndices = new SvelteSet();
        } else {
            revealedIndices = new SvelteSet(variables.map((_, i) => i));
        }
    };

    const copyAllAsEnv = () => {
        const text = variables.map((v) => `${v.key}=${v.value}`).join('\n');
        navigator.clipboard.writeText(text).then(() => {
            copiedAll = true;
            setTimeout(() => (copiedAll = false), 1500);
        });
    };
</script>

{#if variables.length === 0}
    <div
        data-slot="env-table"
        class={cn(
            'flex items-center justify-center rounded-xl border border-border/60 bg-card py-10 text-sm text-muted-foreground shadow-sm',
            className
        )}
    >
        No environment variables.
    </div>
{:else}
    <div
        data-slot="env-table"
        class={cn(
            'overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm',
            className
        )}
    >
        <div
            class="flex items-center justify-between border-b border-border/40 px-3 py-2.5 sm:px-4"
        >
            <div class="flex items-center gap-2">
                {#if title}
                    <h3 class="text-sm font-semibold text-foreground">
                        {title}
                    </h3>
                {/if}
                <span
                    class="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                >
                    {variables.length}
                </span>
            </div>
            <div class="flex items-center gap-1">
                <button
                    type="button"
                    onclick={toggleAll}
                    aria-label={allRevealed
                        ? 'Hide all values'
                        : 'Reveal all values'}
                    class="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                    {#if allRevealed}
                        <EyeOff class="size-3.5" />
                    {:else}
                        <Eye class="size-3.5" />
                    {/if}
                    <span class="hidden sm:inline">
                        {allRevealed ? 'Hide all' : 'Reveal all'}
                    </span>
                </button>
                <button
                    type="button"
                    onclick={copyAllAsEnv}
                    aria-label="Copy all as .env"
                    class="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                    {#if copiedAll}
                        <Check class="size-3.5 text-emerald-500" />
                    {:else}
                        <ClipboardList class="size-3.5" />
                    {/if}
                    <span class="hidden sm:inline">
                        {copiedAll ? 'Copied!' : 'Copy .env'}
                    </span>
                </button>
            </div>
        </div>

        <div class="divide-y divide-border/40">
            {#each variables as variable, i}
                {@render envRow({
                    variable: variable,
                    revealed: revealedIndices.has(i),
                    onToggleReveal: () => toggleIndex(i)
                })}
            {/each}
        </div>
    </div>
{/if}

{#snippet envRow({
    variable,
    revealed,
    onToggleReveal
}: {
    variable: EnvVariable;
    revealed: boolean;
    onToggleReveal: () => void;
})}
    {@const displayValue = revealed
        ? variable.value
        : maskValue(variable.value)}
    <div
        data-slot="env-row"
        class="group flex items-start gap-3 px-3 py-2.5 sm:items-center sm:px-4"
    >
        <div
            class="flex min-w-0 flex-1 flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-4"
        >
            <div class="flex shrink-0 items-center gap-2 sm:w-55">
                <span
                    class="truncate font-mono text-xs font-semibold text-foreground"
                >
                    {variable.key}
                </span>
                {#if variable.environment}
                    <span
                        class={cn(
                            'shrink-0 rounded-full px-2 py-0.5 text-[10px] leading-none font-medium',
                            envBadgeColor(variable.environment)
                        )}
                    >
                        {variable.environment}
                    </span>
                {/if}
            </div>

            <div class="min-w-0 flex-1">
                <span
                    class={cn(
                        'font-mono text-xs break-all',
                        revealed ? 'text-foreground' : 'text-muted-foreground'
                    )}
                >
                    {displayValue}
                </span>
                {#if variable.description}
                    <p class="mt-0.5 text-[11px] text-muted-foreground/70">
                        {variable.description}
                    </p>
                {/if}
            </div>
        </div>

        <div class="flex shrink-0 items-center gap-0.5">
            <RevealButton
                {revealed}
                onToggle={onToggleReveal}
                label={`${revealed ? 'Hide' : 'Reveal'} ${variable.key}`}
            />
            <CopyButton
                value={variable.value}
                label={`Copy ${variable.key} value`}
            />
        </div>
    </div>
{/snippet}
