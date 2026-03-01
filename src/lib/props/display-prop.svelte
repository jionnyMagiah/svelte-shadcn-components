<script lang="ts" module>
    import rehypeStringify from 'rehype-stringify';
    import remarkParse from 'remark-parse';
    import remarkRehype from 'remark-rehype';
    import { unified } from 'unified';

    const parser = unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeStringify);
</script>

<script lang="ts">
    import * as Accordion from '$lib/components/ui/accordion/index.js';
    import Badge from '../components/ui/badge/badge.svelte';
    import {
        props as componentsProps,
        type ComponentPropsDataKeys
    } from './props';

    let {
        name
    }: {
        name: ComponentPropsDataKeys;
    } = $props();

    const componentProps = $derived(componentsProps[name]);

    async function getMDDesc(desc: string) {
        try {
            const parsed = await parser.process(desc);

            return String(parsed);
        } catch (error) {
            return desc;
        }
    }
</script>

{#if !componentProps || componentProps.length === 0}
    <div class="my-2 rounded-md border p-4 text-muted-foreground">
        No props to display
    </div>
{:else}
    <div class="my-2 rounded-md border p-2">
        <Accordion.Root type="multiple">
            {#each componentProps as prop, i (i)}
                <Accordion.Item
                    class="mb-1 rounded-md border border-transparent last:mb-0 data-[state=open]:border-border"
                >
                    <Accordion.Trigger
                        class="px-5 hover:bg-accent hover:no-underline data-[state=open]:rounded-b-none data-[state=open]:border-b data-[state=open]:bg-accent"
                    >
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
                        class="mb-2 flex flex-col gap-2 rounded-md p-2 text-[1rem]"
                    >
                        <p class="mb-4">
                            {#await getMDDesc(prop.desc ?? '') then md}
                                {@html md}
                            {/await}
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
