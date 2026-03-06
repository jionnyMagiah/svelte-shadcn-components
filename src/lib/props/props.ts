export type ComponentPropsData = Record<
    string,
    {
        name: string;
        desc: string;
        type: string;
        default?: string;
        example?: { code: string; lang: string };
    }[]
>;

export type ComponentPropsDataKeys = keyof typeof props;

export const props = {
    'action-bar': [
        {
            name: 'open',
            type: 'boolean | undefined',
            default: 'false',
            desc: 'Whether the action bar is open/visible.'
        },
        {
            name: 'onOpenChange',
            type: '((open: boolean) => void) | undefined',
            desc: 'Event handler called when the open state changes.',
            example: {
                lang: 'ts',
                code: 'onOpenChange={(open) => {\n  console.log("Action bar open:", open)\n}}'
            }
        },
        {
            name: 'side',
            type: "'top' | 'bottom' | undefined",
            default: "'bottom'",
            desc: 'The side of the viewport to align the action bar.'
        },
        {
            name: 'sideOffset',
            type: 'number | undefined',
            default: '16',
            desc: 'Distance from the side of the viewport (in pixels).'
        },
        {
            name: 'align',
            type: "'center' | 'start' | 'end' | undefined",
            default: "'center'",
            desc: 'The alignment of the action bar along the viewport side.'
        },
        {
            name: 'alignOffset',
            type: 'number | undefined',
            default: '0',
            desc: "Distance from the aligned edge (in pixels). Only applies when `align` is `'start'` or `'end'.`"
        },
        {
            name: 'portalContainer',
            type: 'Element | DocumentFragment | null | undefined',
            default: 'document.body',
            desc: 'The container to mount the portal into.'
        },
        {
            name: 'onEscapeKeyDown',
            type: '((event: KeyboardEvent) => void) | undefined',
            desc: 'Event handler called when the Escape key is pressed. You can prevent the default dismissing behavior by calling `event.preventDefault()`.',
            example: {
                lang: 'ts',
                code: 'onEscapeKeyDown={(event) => {\n  console.log("Escape pressed!")\n  // To prevent closing: event.preventDefault();\n}}'
            }
        },
        {
            name: 'dir',
            type: "'ltr' | 'rtl' | undefined",
            default: 'ltr',
            desc: 'The reading direction of the toolbar.'
        },
        {
            name: 'orientation',
            desc: 'Orietation of the toolbar',
            type: "'vertical' | 'horizontal'",
            default: "'horizontal'"
        },
        {
            name: 'loop',
            desc: 'Whether keyboard navigation should loop from last item to first item and vice versa.',
            type: 'boolean | undefined',
            default: 'true'
        },
        {
            name: 'child',
            type: 'Snippet | undefined',
            default: 'undefined',
            desc: 'Use render delegation to render your own element. See Bits UI Child Snippet docs for more information.'
        }
    ],
    'action-bar-selection': [
        {
            name: 'child',
            type: 'Snippet | undefined',
            default: 'undefined',
            desc: 'Use render delegation to render your own element. See Bits UI Child Snippet docs for more information.'
        }
    ],
    'action-bar-group': [
        {
            name: 'child',
            type: 'Snippet | undefined',
            default: 'undefined',
            desc: 'Use render delegation to render your own element. See Bits UI Child Snippet docs for more information.'
        }
    ],
    'action-bar-item': [
        {
            name: 'onSelect',
            type: 'function | undefined',
            default: 'undefined',
            desc: 'Event handler called when the item is selected. When provided, the action bar will automatically close after selection unless `event.preventDefault()` is called.'
        },
        {
            name: 'child',
            type: 'Snippet | undefined',
            default: 'undefined',
            desc: 'Use render delegation to render your own element. See Bits UI Child Snippet docs for more information.'
        }
    ],
    'action-bar-close': [
        {
            name: 'children',
            desc: 'The children content to render.',
            type: 'Snippet'
        },
        {
            name: 'child',
            type: 'Snippet | undefined',
            default: 'undefined',
            desc: 'Use render delegation to render your own element. See Bits UI Child Snippet docs for more information.'
        }
    ],
    'action-bar-separator': [
        {
            name: 'orientation',
            desc: 'Orietation of the separator',
            type: "'vertical' | 'horizontal'"
        },
        {
            name: 'child',
            type: 'Snippet | undefined',
            default: 'undefined',
            desc: 'Use render delegation to render your own element. See Bits UI Child Snippet docs for more information.'
        }
    ],
    scroller: [
        {
            name: 'orientation',
            desc: 'The scroll direction of the container.',
            type: "'vertical' | 'horizontal' | undefined",
            default: "'vertical'"
        },
        {
            name: 'hideScrollbar',
            desc: 'Whether to hide the scrollbar.',
            type: 'boolean | undefined',
            default: 'false'
        },
        {
            name: 'size',
            desc: 'Size of the scroll shadow in pixels.',
            type: 'number | undefined',
            default: '40'
        },
        {
            name: 'offset',
            desc: 'Offset for scroll shadow visibility.',
            type: 'number | undefined',
            default: '0'
        },
        {
            name: 'withNavigation',
            desc: 'Whether to show navigation buttons.',
            type: 'boolean | undefined',
            default: 'false'
        },
        {
            name: 'scrollStep',
            desc: 'Amount to scroll when using navigation buttons. When `withNavigation` is false, this prop is ignored.',
            type: 'number | undefined',
            default: '40'
        },
        {
            name: 'scrollTriggerMode',
            desc: 'How navigation buttons trigger scrolling. `press`: Continuous scrolling while button is pressed. `hover`: Continuous scrolling while hovering. `click`: Single scroll step per click. When `withNavigation` is false, this prop is ignored.',
            type: "'press' | 'hover' | 'click' | undefined",
            default: "'press'"
        }
    ],
    status: [
        {
            name: 'child',
            type: 'Snippet | undefined',
            default: 'undefined',
            // bindable: true,
            desc: 'Use render delegation to render your own element. See Bits UI Child Snippet docs for more information.'
        },
        {
            name: 'children',
            desc: 'The children content to render.',
            type: 'Snippet'
        },
        {
            name: 'variant',
            desc: 'The visual style and color theme of the status badge.',
            type: '"default" | "success" | "error" | "warning" | "info" | undefined',
            default: '"default"'
        }
    ],
    'stat-label': [],
    'stat-indicator': [
        {
            name: 'variant',
            desc: `The visual style of the indicator.

- \`"default"\`: Simple icon without background
- \`"icon"\`: Icon with bordered container
- \`"badge"\`: Compact badge style with number or icon
- \`"action"\`: Interactive button style with hover effects
`,
            type: `"default" | "icon" | "badge" | "action" | undefined`,
            default: `"default"`
        },
        {
            name: 'child',
            type: 'Snippet | undefined',
            default: 'undefined',
            desc: 'Use render delegation to render your own element. See Bits UI Child Snippet docs for more information.'
        }
    ],
    'segmented-input': [
        {
            name: 'size',
            desc: 'The size of all inputs in the segment.',
            type: "'default' | 'sm' | 'lg' | undefined",
            default: "'default'"
        },
        {
            name: 'dir',
            desc: 'The reading direction of the segmented input.',
            type: 'Direction | undefined',
            default: "'ltr'"
        },
        {
            name: 'orientation',
            desc: 'The orientation of the segmented input.',
            type: 'Orientation | undefined',
            default: "'horizontal'"
        },
        {
            name: 'disabled',
            desc: 'Whether all inputs in the segment are disabled.',
            type: 'boolean | undefined',
            default: 'false'
        },
        {
            name: 'invalid',
            desc: 'Whether all inputs in the segment are in an invalid state.',
            type: 'boolean | undefined',
            default: 'false'
        },
        {
            name: 'required',
            desc: 'Whether all inputs in the segment are required.',
            type: 'boolean | undefined',
            default: 'false'
        },
        {
            name: 'child',
            type: 'Snippet | undefined',
            default: 'undefined',
            desc: 'Use render delegation to render your own element. See Bits UI Child Snippet docs for more information.'
        }
    ],
    'segmented-input-item': [
        {
            name: 'position',
            desc: "The position of the input within the segment. Controls the visual styling and borders. If not provided, it will be automatically detected based on the input's position: `isolated`: Single standalone input in the segment. `first`: First input in the segment. `middle`: Middle input in the segment. `last`: Last input in the segment.",
            type: "'first' | 'middle' | 'last' | 'isolated' | undefined",
            default: 'Auto-detected based on position in children array'
        },
        {
            name: 'disabled',
            desc: 'Whether the input is disabled. Inherits from the SegmentedInput if not specified.',
            type: 'boolean | undefined',
            default: 'undefined'
        },
        {
            name: 'required',
            desc: 'Whether the input is required. Inherits from the SegmentedInput if not specified.',
            type: 'boolean | undefined',
            default: 'undefined'
        },
        {
            name: 'child',
            type: 'Snippet | undefined',
            default: 'undefined',
            desc: 'Use render delegation to render your own element. See Bits UI Child Snippet docs for more information.'
        }
    ]
} satisfies ComponentPropsData;
