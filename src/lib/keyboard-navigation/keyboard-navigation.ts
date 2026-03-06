type KeyboardNavigation = Record<string, { keys: string[]; desc: string }[]>;
export type KeyboardNavigationDataKeys = keyof typeof keyboardNavigation;

export const keyboardNavigation = {
    'action-bar': [
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
    ],
    'key-value': [
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
    ]
} satisfies KeyboardNavigation;
