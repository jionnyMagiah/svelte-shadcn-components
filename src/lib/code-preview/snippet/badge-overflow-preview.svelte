<script lang="ts">
    import Badge from '$lib/components/ui/badge/badge.svelte';
    import BadgeOverflow from '$lib/registry/components/dice-ui/badge-overflow/badge-overflow.svelte';

    const tags = [
        'React',
        'TypeScript',
        'Next.js',
        'Tailwind CSS',
        'Shadcn UI',
        'Radix UI',
        'Zustand',
        'React Query',
        'Prisma',
        'PostgreSQL'
    ];
</script>

<div class="flex w-64 flex-col gap-8">
    <div class="flex flex-col gap-3">
        <span class="text-sm font-medium">Badge Overflow</span>
        <div class="w-64 rounded-md border p-3">
            <BadgeOverflow items={tags}>
                {#snippet renderBadge(_, label)}
                    <Badge variant="secondary">{label}</Badge>
                {/snippet}
            </BadgeOverflow>
        </div>
    </div>
    <div class="flex flex-col gap-3">
        <span class="text-sm font-medium">
            Badge Overflow with Custom Overflow
        </span>
        <div class="w-64 rounded-md border p-3">
            <BadgeOverflow items={tags} {renderBadge} {renderOverflow} />
        </div>
    </div>
</div>

{#snippet renderBadge(_: string, label: string)}
    <Badge variant="default">{label}</Badge>
{/snippet}

{#snippet renderOverflow(count: number)}
    <Badge variant="secondary" class="bg-muted">
        +{count} more
    </Badge>
{/snippet}
