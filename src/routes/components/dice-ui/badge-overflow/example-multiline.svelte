<script lang="ts">
    import { Badge } from '$lib/components/ui/badge';
    import BadgeOverflow from '$lib/registry/components/dice-ui/badge-overflow/badge-overflow.svelte';

    const technologies = [
        'React',
        'TypeScript',
        'Next.js',
        'Tailwind CSS',
        'Shadcn UI',
        'Radix UI',
        'Zustand',
        'React Query',
        'Prisma',
        'PostgreSQL',
        'Docker',
        'Kubernetes',
        'AWS',
        'Vercel',
        'GitHub Actions'
    ];
</script>

<div class="flex flex-col gap-8">
    <div class="flex flex-col gap-3">
        <span class="text-sm font-medium">Single Line (default)</span>
        <div class="w-64 rounded-md border p-3">
            <BadgeOverflow items={technologies}>
                {#snippet renderBadge(item, label)}
                    <Badge variant="secondary">{label}</Badge>
                {/snippet}
            </BadgeOverflow>
        </div>
    </div>
    <div class="flex flex-col gap-3">
        <span class="text-sm font-medium">Two Lines</span>
        <div class="w-64 rounded-md border p-3">
            <BadgeOverflow items={technologies} lineCount={2}>
                {#snippet renderBadge(item, label)}
                    <Badge variant="outline">{label}</Badge>
                {/snippet}
            </BadgeOverflow>
        </div>
    </div>
    <div class="flex flex-col gap-3">
        <span class="text-sm font-medium">Three Lines</span>
        <div class="w-64 rounded-md border p-3">
            <BadgeOverflow items={technologies} lineCount={3}>
                {#snippet renderBadge(item, label)}
                    <Badge variant="default">{label}</Badge>
                {/snippet}
            </BadgeOverflow>
        </div>
    </div>
</div>
