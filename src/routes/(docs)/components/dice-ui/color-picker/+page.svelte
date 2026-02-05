<script lang="ts">
    import { resolve } from '$app/paths';
    import { page } from '$app/state';
    import { componentData } from '$lib';
    import { autoId } from '$lib/attachments';
    import CodeAndPreview from '$lib/components/code-and-preview.svelte';
    import CodeBlock from '$lib/components/code-block.svelte';
    import ComponentDoc from '$lib/components/component-doc.svelte';
    import ExampleControlled from './example-controlled.svelte';
    import ExampleControlledRaw from './example-controlled.svelte?raw';
    import ExampleForm from './example-form.svelte';
    import ExampleFormRaw from './example-form.svelte?raw';
    import ExampleInline from './example-inline.svelte';
    import ExampleInlineRaw from './example-inline.svelte?raw';
    import LayoutColorPicker from './layout-color-picker.svelte?raw';
    import PreviewColorPicker from './preview-color-picker.svelte';
    import PreviewColorPickerRaw from './preview-color-picker.svelte?raw';

    const component = componentData['dice-ui']['color-picker'];
</script>

<ComponentDoc
    {component}
    crumbs={[
        { text: 'Dice UI', url: resolve('/components/dice-ui') },
        { text: component.title, url: page.url.pathname }
    ]}
>
    {#snippet preview()}
        <CodeAndPreview code={PreviewColorPickerRaw}>
            <PreviewColorPicker />
        </CodeAndPreview>
    {/snippet}

    {#snippet layout()}
        <CodeBlock code={LayoutColorPicker} />
    {/snippet}

    {#snippet notes()}
        <h2 {@attach autoId}>Notes</h2>

        The components internally uses some of the shadcn-svelte components:
        <ul class="mx-4 list-inside list-disc">
            <li class="my-2">
                <a
                    href="https://shadcn-svelte.com/docs/components/popover"
                    class="link"
                >
                    Popover
                </a>
            </li>
            <li class="my-2">
                <a
                    href="https://shadcn-svelte.com/docs/components/select"
                    class="link"
                >
                    Select
                </a>
            </li>
        </ul>
    {/snippet}

    {#snippet examples()}
        <h3 {@attach autoId}>Inline Color Picker</h3>
        <p>
            Use the <code>inline</code> prop to render the color picker inline instead
            of in a popover.
        </p>
        <CodeAndPreview code={ExampleInlineRaw}>
            <ExampleInline />
        </CodeAndPreview>

        <h3 {@attach autoId}>Controlled State</h3>
        <p>A color picker with controlled state management.</p>
        <CodeAndPreview code={ExampleControlledRaw}>
            <ExampleControlled />
        </CodeAndPreview>

        <h3 {@attach autoId}>With Form</h3>
        <p>A color picker with form integration.</p>
        <CodeAndPreview code={ExampleFormRaw}>
            <ExampleForm />
        </CodeAndPreview>
    {/snippet}
</ComponentDoc>
