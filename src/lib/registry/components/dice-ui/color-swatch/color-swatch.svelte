<script lang="ts" module>
    import { cn } from '$lib/utils';
    import type { Snippet } from 'svelte';
    import { mergeProps } from 'svelte-toolbelt';
    import type { HTMLAttributes } from 'svelte/elements';
    import { tv, type VariantProps } from 'tailwind-variants';

    const colorSwatchVariants = tv({
        base: 'box-border rounded-sm border shadow-sm [background-clip:padding-box] data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        variants: {
            size: {
                default: 'size-8',
                sm: 'size-6',
                lg: 'size-12'
            }
        },
        defaultVariants: {
            size: 'default'
        }
    });

    function getIsCssColor(v: string): boolean {
        try {
            return typeof CSS !== 'undefined' &&
                typeof CSS.supports === 'function'
                ? CSS.supports('color', v)
                : true;
        } catch {
            return false;
        }
    }

    function getHasAlpha(v: string): boolean {
        const s = v.trim().toLowerCase();

        if (s === 'transparent') return true;

        if (/^#(?:[0-9a-f]{4}|[0-9a-f]{8})$/i.test(s)) return true;

        if (/\b(?:rgba|hsla)\s*\(/i.test(s)) return true;

        if (
            /\b(?:rgb|hsl|lab|lch|oklab|oklch|color)\s*\([^)]*\/\s*[\d.]+%?\s*\)/i.test(
                s
            )
        ) {
            return true;
        }

        return false;
    }

    type ColorSwatchProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> &
        VariantProps<typeof colorSwatchVariants> & {
            color?: string;
            child?: Snippet<[{ props: Record<string, unknown> }]>;
            disabled?: boolean;
            withoutTransparency?: boolean;
        };
</script>

<script lang="ts">
    let {
        color,
        size = 'default',
        child,
        disabled = false,
        withoutTransparency = false,
        class: className,
        style,
        ...props
    }: ColorSwatchProps = $props();
    const colorValue = $derived(color?.trim());

    const backgroundStyle = $derived.by(() => {
        if (!colorValue) {
            return `background: linear-gradient(to bottom right, transparent calc(50% - 1px), hsl(var(--destructive)) calc(50% - 1px) calc(50% + 1px), transparent calc(50% + 1px)) no-repeat`;
        }

        if (!getIsCssColor(colorValue)) {
            return `background-color: 'transparent'`;
        }

        if (!withoutTransparency && getHasAlpha(colorValue)) {
            return `background: linear-gradient(${colorValue}, ${colorValue}), repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%) 0% 50% / 10px 10px`;
        }

        return ` background-color: ${colorValue}`;
    });

    const ariaLabel = $derived(
        !colorValue ? 'No color selected' : `Color swatch: ${colorValue}`
    );

    const mergedProps = $derived(
        mergeProps(
            {
                role: 'img',
                'aria-label': ariaLabel,
                'aria-disabled': disabled || undefined,
                'data-disabled': disabled ? '' : undefined,
                'data-slot': 'color-swatch',
                class: cn(
                    colorSwatchVariants({ size }),
                    className,
                    'forced-color-adjust-none'
                ),
                style,
                ...props
            },
            { style: backgroundStyle }
        )
    );
</script>

{#if child}
    {@render child({ props: mergedProps })}
{:else}
    <div {...mergedProps}></div>
{/if}
