<script lang="ts">
    import Badge from '$lib/components/ui/badge/badge.svelte';
    import Button from '$lib/components/ui/button/button.svelte';
    import Input from '$lib/components/ui/input/input.svelte';
    import BadgeOverflow from '$lib/registry/components/dice-ui/badge-overflow/badge-overflow.svelte';
    import { X } from '@lucide/svelte';

    interface Tag {
        label: string;
        value: string;
    }

    let tags = $state([
        { label: 'React', value: 'react' },
        { label: 'TypeScript', value: 'typescript' },
        { label: 'Next.js', value: 'nextjs' },
        { label: 'Tailwind CSS', value: 'tailwindcss' },
        { label: 'Shadcn UI', value: 'shadcn-ui' },
        { label: 'Radix UI', value: 'radix-ui' },
        { label: 'Zustand', value: 'zustand' },
        { label: 'React Query', value: 'react-query' },
        { label: 'Prisma', value: 'prisma' },
        { label: 'PostgreSQL', value: 'postgresql' },
        { label: 'MySQL', value: 'mysql' },
        { label: 'MongoDB', value: 'mongodb' }
    ]);
    let value = $state('');

    const onTagAdd = () => {
        if (value.trim()) {
            tags.push({
                label: value.trim(),
                value: value.trim()
            });

            value = '';
        }
    };

    const onTagRemove = (value: string) => {
        tags = tags.filter((tag) => tag.value !== value);
    };

    const onkeydown = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            onTagAdd();
        }
    };
</script>

<div class="flex flex-col gap-6">
    <div class="flex flex-col gap-3">
        <span class="h3">Tags with Overflow</span>
        <div class="w-full max-w-80 rounded-md border p-3">
            <BadgeOverflow
                items={tags}
                getBadgeLabel={(tag) => tag.label}
                lineCount={2}
                {renderBadge}
                {renderOverflow}
            />
        </div>
    </div>
    <div class="flex items-center gap-2">
        <Input
            placeholder="Add a tag..."
            class="max-w-64 flex-1"
            bind:value
            {onkeydown}
        />
        <Button type="button" onclick={onTagAdd}>Add</Button>
    </div>
    <div
        class="flex flex-col gap-px text-sm text-balance text-muted-foreground"
    >
        <p>Click on a badge to remove it.</p>
        <p>Resize the container to see overflow behavior.</p>
    </div>
</div>

{#snippet renderBadge(item: { item: Tag; label: string })}
    <Badge
        variant="secondary"
        class="cursor-pointer"
        onclick={() => onTagRemove(item.item.value)}
    >
        <span>{item.label}</span>
        <X class="size-3" />
    </Badge>
{/snippet}
{#snippet renderOverflow(count: number)}
    <Badge variant="outline" class="bg-muted">
        +{count} more
    </Badge>
{/snippet}
