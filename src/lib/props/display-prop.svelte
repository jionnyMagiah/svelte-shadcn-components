<script lang="ts">
    import * as Accordion from '$lib/components/ui/accordion/index.js';
    import rehypeStringify from 'rehype-stringify';
    import remarkParse from 'remark-parse';
    import remarkRehype from 'remark-rehype';
    import { getProps } from 'routes/api/api.remote';
    import { unified } from 'unified';
    import Badge from '../components/ui/badge/badge.svelte';

    type PropsData = Awaited<ReturnType<typeof getProps>>;

    let {
        name
    }: {
        name: keyof PropsData;
    } = $props();

    const data = $derived(await getProps());

    const componentProps = $derived(data[name]);

    async function getMDDesc(desc: string) {
        const parsed = await unified()
            .use(remarkParse)
            .use(remarkRehype, { allowDangerousHtml: true })
            .use(rehypeStringify)
            .process(desc);
        return String(parsed);
    }
</script>

{#if !componentProps || componentProps.length === 0}
    <div class="my-2 rounded-md border p-4 text-muted-foreground">
        No props to display
    </div>
{:else}
    <div class="my-2 rounded-md border p-2">
        <Accordion.Root type="multiple">
            {#each componentProps as prop (prop.name)}
                <Accordion.Item>
                    <Accordion.Trigger class="hover:no-underline">
                        <div
                            class="grid w-full grid-cols-[30%_1fr] items-center"
                        >
                            <div class="flex flex-row items-center gap-2">
                                <span class="font-mono font-medium"
                                    >{prop.name}</span
                                >
                                {#if 'bindable' in prop && prop.bindable}
                                    <Badge class="rounded-sm">Bindable</Badge>
                                {/if}
                            </div>

                            <code class="w-fit">
                                {prop.type}
                            </code>
                        </div>
                    </Accordion.Trigger>

                    <Accordion.Content
                        class="mb-2 flex flex-col gap-2 rounded-md bg-card p-2 text-[1rem]"
                    >
                        <p class="mb-4">
                            {@html await getMDDesc(prop.desc ?? '')}
                        </p>

                        <div
                            class="grid w-full grid-cols-[30%_1fr] items-center"
                        >
                            <span class="text-muted-foreground">Type</span>
                            <code class="w-fit">{prop.type}</code>
                        </div>

                        {#if prop.default}
                            <div
                                class="grid w-full grid-cols-[30%_1fr] items-center"
                            >
                                <span class="text-muted-foreground"
                                    >Default</span
                                >
                                <code class="w-fit">{prop.default}</code>
                            </div>
                        {/if}
                    </Accordion.Content>
                </Accordion.Item>
            {/each}
        </Accordion.Root>
    </div>
{/if}
