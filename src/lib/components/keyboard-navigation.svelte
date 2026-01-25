<script lang="ts">
    import * as Kbd from '$lib/components/ui/kbd/index.js';
    import * as Table from '$lib/components/ui/table/index.js';
    let { interactions }: { interactions: { keys: string[]; desc: string }[] } =
        $props();
</script>

<div class="m-1 rounded-md border">
    <Table.Root>
        <Table.Header class="bg-card">
            <Table.Row>
                <Table.Head class="w-25">Key</Table.Head>
                <Table.Head>Description</Table.Head>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {#each interactions as int, i (i)}
                <Table.Row>
                    <Table.Cell class="font-medium"
                        >{@render keysRenderer(int.keys)}</Table.Cell
                    >
                    <Table.Cell>{int.desc}</Table.Cell>
                </Table.Row>
            {/each}
        </Table.Body>
    </Table.Root>
</div>

{#snippet keysRenderer(keys: string[])}
    {#if keys.length === 1}
        <Kbd.Root>{keys[0]}</Kbd.Root>
    {:else}
        <Kbd.Group>
            {#each keys as k (k)}
                <Kbd.Root>{k}</Kbd.Root>
            {/each}
        </Kbd.Group>
    {/if}
{/snippet}
