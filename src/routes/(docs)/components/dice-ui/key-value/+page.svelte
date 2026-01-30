<script lang="ts">
    import { resolve } from '$app/paths';
    import { page } from '$app/state';
    import { componentData } from '$lib';
    import { autoId } from '$lib/attachments';
    import CodeAndPreview from '$lib/components/code-and-preview.svelte';
    import CodeBlock from '$lib/components/code-block.svelte';
    import ComponentDoc from '$lib/components/component-doc.svelte';
    import KeyboardNavigation from '$lib/components/keyboard-navigation.svelte';
    import ExampleForm from './example-form.svelte';
    import ExampleFormRaw from './example-form.svelte?raw';
    import ExamplePasteSupport from './example-paste-support.svelte';
    import ExamplePasteSupportRaw from './example-paste-support.svelte?raw';
    import ExampleValidation from './example-validation.svelte';
    import ExampleValidationRaw from './example-validation.svelte?raw';
    import LayoutKeyValueRaw from './layout-key-value.svelte?raw';
    import PreviewKeyValue from './preview-key-value.svelte';
    import PreviewKeyValueRaw from './preview-key-value.svelte?raw';

    const component = componentData['dice-ui']['key-value'];
    const pasteFormats = `KEY=VALUE
DATABASE_URL=postgresql://localhost:5432
API_KEY=sk-1234567890

KEY: VALUE
DATABASE_URL: postgresql://localhost:5432
API_KEY: sk-1234567890

KEY	VALUE (tab-separated)
DATABASE_URL	postgresql://localhost:5432
API_KEY	sk-1234567890`;
</script>

<ComponentDoc
    {component}
    crumbs={[
        { text: 'Dice UI', url: resolve('/components/dice-ui') },
        { text: component.title, url: page.url.pathname }
    ]}
>
    {#snippet preview()}
        <CodeAndPreview code={PreviewKeyValueRaw}>
            <PreviewKeyValue />
        </CodeAndPreview>
    {/snippet}

    {#snippet layout()}
        <CodeBlock code={LayoutKeyValueRaw} />
    {/snippet}

    {#snippet examples()}
        <h3 {@attach autoId}>With Paste Support</h3>
        <p>
            Paste multiple key-value pairs at once. Supports formats like
            <code>KEY=VALUE</code>, <code>KEY: VALUE</code>, and tab-separated
            values.
        </p>

        <CodeAndPreview code={ExamplePasteSupportRaw}>
            <ExamplePasteSupport />
        </CodeAndPreview>

        <h3 {@attach autoId}>With Validation</h3>
        <p>Add validation rules for keys and values with error messages.</p>

        <CodeAndPreview code={ExampleValidationRaw}>
            <ExampleValidation />
        </CodeAndPreview>

        <h3 {@attach autoId}>With Form</h3>
        <p>Integrate with form for form validation.</p>
        <CodeAndPreview code={ExampleFormRaw}>
            <ExampleForm />
        </CodeAndPreview>
    {/snippet}

    {#snippet notes()}
        <h2 {@attach autoId}>Notes</h2>

        The components internally uses some of the shadcn-svelte components:
        <ul class="mx-4 list-inside list-disc">
            <li>
                <a
                    href="https://shadcn-svelte.com/docs/components/button"
                    class="link"
                    target="_blank"
                >
                    Button
                </a>
            </li>
            <li>
                <a
                    href="https://shadcn-svelte.com/docs/components/input"
                    class="link"
                    target="_blank"
                >
                    Input
                </a>
            </li>
            <li>
                <a
                    href="https://shadcn-svelte.com/docs/components/textarea"
                    class="link"
                    target="_blank"
                >
                    Textarea
                </a>
            </li>
        </ul>

        <h2 {@attach autoId}>Paste Formats</h2>
        <p>
            The component supports pasting multiple key-value pairs in the
            following formats:
        </p>
        <CodeBlock code={pasteFormats} lang="plain" />
        <p>
            When pasting multiple lines, the component will automatically parse
            and create separate items for each line.
        </p>
    {/snippet}

    {#snippet accessibility()}
        <h3 {@attach autoId}>Keyboard Interactions</h3>
        <KeyboardNavigation
            interactions={[
                {
                    keys: ['Tab'],
                    desc: 'Navigate between key inputs, value inputs, and buttons.'
                },
                {
                    keys: ['Enter'],
                    desc: 'Submit the current input value.'
                },
                {
                    keys: ['Escape'],
                    desc: 'Cancel the current input.'
                },
                {
                    keys: ['Ctrl', 'V'],
                    desc: 'Paste multiple key-value pairs (supports multiple formats).'
                }
            ]}
        />
    {/snippet}

    {#snippet features()}
        <ul class="list-inside list-disc">
            <li class="my-2">
                <strong>Dynamic Items</strong>: Add and remove key-value pairs
                dynamically
            </li>
            <li class="my-2">
                <strong>Paste Support</strong>: Paste multiple items at once in
                various formats (<code>KEY=VALUE</code>,
                <code>KEY: VALUE</code>, tab-separated)
            </li>
            <li class="my-2">
                <strong>Validation</strong>: Built-in validation for keys and
                values with custom validators
            </li>
            <li class="my-2">
                <strong>Duplicate Detection</strong>: Optional prevention of
                duplicate keys
            </li>
            <li class="my-2">
                <strong>Item Limits</strong>: Set minimum and maximum item
                counts
            </li>
            <li class="my-2">
                <strong>Form Integration</strong>: Works seamlessly with React
                Hook Form
            </li>
            <li class="my-2">
                <strong>Controlled/Uncontrolled</strong>: Supports both
                controlled and uncontrolled patterns
            </li>
            <li class="my-2">
                <strong>Accessibility</strong>: Full keyboard navigation and
                screen reader support
            </li>
            <li class="my-2">
                <strong>Customizable</strong>: Fully customizable styling and
                behavior
            </li>
        </ul>
    {/snippet}
</ComponentDoc>
