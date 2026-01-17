<script lang="ts">
    import { componentData } from '$lib';
    import ComponentDoc from '$lib/components/component-doc.svelte';
    import H3 from '$lib/components/h3.svelte';
    import { Badge } from '$lib/components/ui/badge';
    import BadgeOverflow from '$lib/registry/components/dice-ui/badge-overflow/badge-overflow.svelte';
    import InteractiveDemo from './interactive-demo.svelte';

    const component = componentData['dice-ui']['badge-overflow'];
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

<ComponentDoc {component}>
    {#snippet preview()}
        <div class="w-64 rounded-md border p-3">
            <BadgeOverflow items={tags} {renderBadge} />
        </div>
    {/snippet}
    {#snippet examples()}
        <H3 title="Multi-line Overflow" />
        Display badges across multiple lines using the lineCount prop.
        <div class="flex flex-col gap-8">
            <div class="flex flex-col gap-3">
                <span class="text-sm font-medium">Single Line (default)</span>
                <div class="w-64 rounded-md border p-3">
                    <BadgeOverflow items={technologies} {renderBadge} />
                </div>
            </div>
            <div class="flex flex-col gap-3">
                <span class="text-sm font-medium">Two Lines</span>
                <div class="w-64 rounded-md border p-3">
                    <BadgeOverflow
                        items={technologies}
                        lineCount={2}
                        {renderBadge}
                    />
                </div>
            </div>
            <div class="flex flex-col gap-3">
                <span class="text-sm font-medium">Three Lines</span>
                <div class="w-64 rounded-md border p-3">
                    <BadgeOverflow
                        items={technologies}
                        lineCount={3}
                        {renderBadge}
                    />
                </div>
            </div>
        </div>

        <H3 title="Interactive" />
        Tags Interactive demo showing how to add and remove tags with overflow handling.
        <InteractiveDemo />
    {/snippet}
</ComponentDoc>

{#snippet renderBadge(item: { item: string; label: string })}
    <Badge variant="secondary">{item.label}</Badge>
{/snippet}
