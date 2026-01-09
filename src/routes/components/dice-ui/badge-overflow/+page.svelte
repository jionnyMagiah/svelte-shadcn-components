<script lang="ts">
    import ComponentDoc from '$lib/components/component-doc.svelte';
    import { Badge } from '$lib/components/ui/badge';
    import BadgeOverflow from '$lib/registry/components/dice-ui/badge-overflow/badge-overflow.svelte';
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

<ComponentDoc
    componentName="Badge Overflow"
    shortDesc="A component that intelligently manages badge overflow by measuring available space and displaying only what fits with an overflow indicator."
>
    {#snippet preview()}
        <div class="w-64 rounded-md border p-3">
            <BadgeOverflow items={tags} {renderBadge} />
        </div>
    {/snippet}
    {#snippet examples()}
        <h3 id="multi-line-overflow">Multi-line Overflow</h3>
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

        <h3 id="interactive">Interactive</h3>
        Tags Interactive demo showing how to add and remove tags with overflow handling.
        <InteractiveDemo />
    {/snippet}
</ComponentDoc>

{#snippet renderBadge(item: { item: string; label: string })}
    <Badge variant="secondary">{item.label}</Badge>
{/snippet}
