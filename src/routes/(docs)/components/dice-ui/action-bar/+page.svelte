<script lang="ts">
    import { componentData } from '$lib';
    import { autoId } from '$lib/attachments';
    import CodeAndPreview from '$lib/components/code-and-preview.svelte';
    import CodeBlock from '$lib/components/code-block.svelte';
    import ComponentDoc from '$lib/components/component-doc.svelte';
    import KeyboardNavigation from '$lib/components/keyboard-navigation.svelte';
    import ExamplePosition from './example-position.svelte';
    import ExamplePositionRaw from './example-position.svelte?raw';
    import LayoutActionBar from './layout-action-bar.svelte?raw';
    import PreviewActionBar from './preview-action-bar.svelte';
    import PreviewActionBarRaw from './preview-action-bar.svelte?raw';

    const component = componentData['dice-ui']['action-bar'];
</script>

<ComponentDoc {component}>
    {#snippet preview()}
        <CodeAndPreview code={PreviewActionBarRaw}>
            <PreviewActionBar />
        </CodeAndPreview>
    {/snippet}

    {#snippet layout()}
        <CodeBlock code={LayoutActionBar} />
    {/snippet}

    {#snippet examples()}
        <h3 {@attach autoId}>Position</h3>
        <p>
            Use the <code>side</code> and <code>align</code> props to control where
            the action bar appears.
        </p>
        <CodeAndPreview code={ExamplePositionRaw}>
            <ExamplePosition />
        </CodeAndPreview>
    {/snippet}

    {#snippet accessibility()}
        <h3 {@attach autoId}>Keyboard Interactions</h3>
        <p>
            The action bar follows the <a
                href="https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/"
                target="_blank"
                class="link">WAI-ARIA Toolbar</a
            > pattern for keyboard navigation.
        </p>
        <KeyboardNavigation
            interactions={[
                {
                    keys: ['Tab'],
                    desc: 'Moves focus to the next focusable element (Action Group or Close button).'
                },
                {
                    keys: ['Shift', 'Tab'],
                    desc: 'Moves focus to the previous focusable element.'
                },
                {
                    keys: ['Escape'],
                    desc: 'Closes the action bar and calls onOpenChange(false).'
                },
                {
                    keys: ['ArrowLeft'],
                    desc: 'Moves focus to the previous item in the group (horizontal orientation).'
                },
                {
                    keys: ['ArrowUp'],
                    desc: 'Moves focus to the previous item in the group (vertical orientation).'
                },
                {
                    keys: ['ArrowRight'],
                    desc: 'Moves focus to the next item in the group (horizontal orientation).'
                },
                {
                    keys: ['ArrowDown'],
                    desc: 'Moves focus to the next item in the group (vertical orientation).'
                },
                {
                    keys: ['Home'],
                    desc: 'Moves focus to the first item in the group.'
                },
                {
                    keys: ['End'],
                    desc: 'Moves focus to the last item in the group.'
                }
            ]}
        />
    {/snippet}
</ComponentDoc>
