<script>
    import { resolve } from '$app/paths';
    import { page } from '$app/state';
    import { componentData } from '$lib';
    import { autoId } from '$lib/attachments';
    import CodeAndPreview from '$lib/components/code-and-preview.svelte';
    import CodeBlock from '$lib/components/code-block.svelte';
    import ComponentDoc from '$lib/components/component-doc.svelte';
    import { link } from '$lib/components/link.svelte';
    import ExampleHorizontal from 'routes/(docs)/components/dice-ui/checkbox-group/example-horizontal.svelte';
    import ExampleHorizontalRaw from 'routes/(docs)/components/dice-ui/checkbox-group/example-horizontal.svelte?raw';
    import ExampleValidation from 'routes/(docs)/components/dice-ui/checkbox-group/example-validation.svelte';
    import ExampleValidationRaw from 'routes/(docs)/components/dice-ui/checkbox-group/example-validation.svelte?raw';
    import LayoutCheckboxGroupRaw from 'routes/(docs)/components/dice-ui/checkbox-group/layout-checkbox-group.svelte?raw';
    import UsagePrimitive from 'routes/(docs)/components/dice-ui/checkbox-group/usage-primitive.svelte';
    import UsagePrimitiveRaw from 'routes/(docs)/components/dice-ui/checkbox-group/usage-primitive.svelte?raw';
    import PreviewCheckboxGroup from './preview-checkbox-group.svelte';
    import PreviewCheckboxGroupRaw from './preview-checkbox-group.svelte?raw';
    import KeyboardNavigation from '$lib/components/keyboard-navigation.svelte';
    import ExampleShiftSelection from 'routes/(docs)/components/dice-ui/checkbox-group/example-shift-selection.svelte';
    import ExampleShiftSelectionRaw from 'routes/(docs)/components/dice-ui/checkbox-group/example-shift-selection.svelte?raw';

    const component = componentData['dice-ui']['badge-overflow'];
</script>

<ComponentDoc
    {component}
    crumbs={[
        { text: 'Dice UI', url: resolve('/components/dice-ui') },
        { text: component.title, url: page.url.pathname }
    ]}
>
    {#snippet preview()}
        <CodeAndPreview code={PreviewCheckboxGroupRaw}>
            <PreviewCheckboxGroup />
        </CodeAndPreview>
    {/snippet}

    {#snippet usage()}
        <h3 {@attach autoId}>With Primitive</h3>
        <p>
            This components is a styled component built on top of {@render link(
                'checkbox-group-primitive',
                resolve('/(docs)/packages/dice-ui/checkbox-group-primitive')
            )}, a headless components that provide state management.
        </p>
        <p>
            You can either use this ready-to-use components, or the headless
            components and style it yourself.
        </p>
        <CodeAndPreview code={UsagePrimitiveRaw}>
            <UsagePrimitive />
        </CodeAndPreview>
    {/snippet}

    {#snippet layout()}
        <CodeBlock code={LayoutCheckboxGroupRaw} />
    {/snippet}

    {#snippet examples()}
        <h3 {@attach autoId}>Horizontal Orientation</h3>
        <CodeAndPreview code={ExampleHorizontalRaw}>
            <ExampleHorizontal />
        </CodeAndPreview>

        <h3 {@attach autoId}>With Validation</h3>
        <p>
            Validate the group with <code>onvalidate</code> or
            <code>required</code> prop. Can be used for native form validation.
        </p>
        <CodeAndPreview code={ExampleValidationRaw}>
            <ExampleValidation />
        </CodeAndPreview>

        <h3 {@attach autoId}>Multi Selection</h3>
        <p>
            Hold down the <code>Shift</code> key to select and deselect multiple checkboxes
            at once.
        </p>
        <p class="bg-amber-600/40 p-4 rounded-md border-l-amber-600 border-l-4 my-2">
            Currently this example is not working properly. After selecting the
            first element, you need to click two times while pressing <code
                >Shift</code
            > to trigger the multi selection. This only the first time you use the
            multi selection.
            <br>
            Will be fixed soon.
        </p>
        <CodeAndPreview code={ExampleShiftSelectionRaw}>
            <ExampleShiftSelection />
        </CodeAndPreview>
    {/snippet}

    {#snippet accessibility()}
        <h3 {@attach autoId}>Keyboard Interactions</h3>
        <KeyboardNavigation
            interactions={[{ keys: ['Space'], desc: 'Toggles checkbox item.' }]}
        />
    {/snippet}
</ComponentDoc>
