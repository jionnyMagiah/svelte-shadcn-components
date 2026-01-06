<script lang="ts">
    import { Badge } from '$lib/components/ui/badge';
    import BadgeOverflow from '$lib/registry/components/badge-overflow/badge-overflow.svelte';
    import InteractiveDemo from './interactive-demo.svelte';

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

<div class="w-64 rounded-md border p-3">
    <BadgeOverflow
        items={tags}
        {renderBadge}
    />
</div>

{#snippet renderBadge(item:{item: string; label: string })}
    <Badge variant="secondary">{item.label}</Badge>
{/snippet}

<h2>Examples</h2>

<h3>Multi-line Overflow</h3>
Display badges across multiple lines using the lineCount prop.
<div class="flex flex-col gap-8">
    <div class="flex flex-col gap-3">
        <h3 class="text-sm font-medium">Single Line (default)</h3>
        <div class="w-64 rounded-md border p-3">
            <BadgeOverflow items={technologies} {renderBadge} />
        </div>
    </div>
    <div class="flex flex-col gap-3">
        <h3 class="text-sm font-medium">Two Lines</h3>
        <div class="w-64 rounded-md border p-3">
            <BadgeOverflow items={technologies} lineCount={2} {renderBadge} />
        </div>
    </div>
    <div class="flex flex-col gap-3">
        <h3 class="text-sm font-medium">Three Lines</h3>
        <div class="w-64 rounded-md border p-3">
            <BadgeOverflow items={technologies} lineCount={3} {renderBadge} />
        </div>
    </div>
</div>

<h3>Interactive </h3>Tags
Interactive demo showing how to add and remove tags with overflow handling.
<InteractiveDemo />