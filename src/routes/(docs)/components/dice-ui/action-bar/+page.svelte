<script lang="ts">
    import { componentData } from '$lib';
    import { autoId } from '$lib/attachments';
    import CodeAndPreview from '$lib/components/code-and-preview.svelte';
    import CodeBlock from '$lib/components/code-block.svelte';
    import ComponentDoc from '$lib/components/component-doc.svelte';
    import type { PropDesc } from '$lib/components/display-prop.svelte';
    import DisplayProp from '$lib/components/display-prop.svelte';
    import KeyboardNavigation from '$lib/components/keyboard-navigation.svelte';
    import ExamplePosition from './example-position.svelte';
    import ExamplePositionRaw from './example-position.svelte?raw';
    import LayoutActionBar from './layout-action-bar.svelte?raw';
    import PreviewActionBar from './preview-action-bar.svelte';
    import PreviewActionBarRaw from './preview-action-bar.svelte?raw';

    const component = componentData['dice-ui']['action-bar'];

    const actionBarProps: PropDesc[] = [
        {
            name: 'open',
            desc: 'Whether the action bar is open/visible.',
            type: 'boolean | undefined',
            default: 'false'
        },
        {
            name: 'onOpenChange',
            desc: 'Event handler called when the open state changes.',
            type: '((open: boolean) => void) | undefined'
        },
        {
            name: 'side',
            desc: 'The side of the viewport to align the action bar.',
            type: `"top" | "bottom" | undefined`,
            default: `"bottom"`
        },
        {
            name: 'sideOffset',
            desc: 'Distance from the side of the viewport (in pixels).',
            type: 'number | undefined',
            default: '16'
        },
        {
            name: 'align',
            desc: 'The alignment of the action bar along the viewport side.',
            type: `"start" | "center" | "end" | undefined`,
            default: `"center"`
        },
        {
            name: 'alignOffset',
            desc: 'Distance from the aligned edge (in pixels). Only applies when `align` is "start" or "end".',
            type: 'number | undefined',
            default: '0'
        },
        {
            name: 'portalContainer',
            desc: 'The container to mount the portal into.',
            type: 'Element | DocumentFragment | null | undefined',
            default: 'document.body'
        },
        {
            name: 'onEscapeKeyDown',
            desc: 'Event handler called when the Escape key is pressed. You can prevent the default dismissing behavior by calling `event.preventDefault()`.',
            type: '((event: KeyboardEvent) => void) | undefined'
        },
        {
            name: 'dir',
            desc: 'The reading direction of the toolbar.',
            type: `"ltr" | "rtl" | undefined`,
            default: `"ltr"`
        },
        {
            name: 'orientation',
            desc: 'The orientation of the toolbar.',
            type: `"horizontal" | "vertical" | undefined`,
            default: `"horizontal"`
        },
        {
            name: 'loop',
            desc: 'Whether keyboard navigation should loop from last item to first item and vice versa.',
            type: 'boolean | undefined',
            default: 'true'
        }
    ];
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

    {#snippet apiReference()}
        <h3 {@attach autoId}>ActionBar</h3>
        <p>
            The root component that controls the visibility and position of the
            action bar. Has <code>role="toolbar"</code> for accessibility.
        </p>
        <DisplayProp props={actionBarProps} />
    {/snippet}
</ComponentDoc>
