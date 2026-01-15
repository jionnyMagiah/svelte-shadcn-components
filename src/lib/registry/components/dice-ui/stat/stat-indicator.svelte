<script lang="ts" module>
    import { tv, type VariantProps } from 'tailwind-variants';
    import { cn } from '$lib/utils';
    import type { HTMLAttributes } from 'svelte/elements';

    const statIndicatorVariants = tv({
        base: 'flex shrink-0 items-center justify-center [&_svg]:pointer-events-none',
        variants: {
            variant: {
                default:
                    "text-muted-foreground [&_svg:not([class*='size-'])]:size-5",
                icon: "size-8 rounded-md border [&_svg:not([class*='size-'])]:size-3.5",
                badge: "h-6 min-w-6 rounded-sm border px-1.5 font-medium text-xs [&_svg:not([class*='size-'])]:size-3",
                action: "size-8 cursor-pointer rounded-md transition-colors hover:bg-muted/50 [&_svg:not([class*='size-'])]:size-4"
            },
            color: {
                default: 'bg-muted text-muted-foreground',
                success:
                    'border-green-500/20 bg-green-500/10 text-green-600 dark:text-green-400',
                info: 'border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400',
                warning:
                    'border-orange-500/20 bg-orange-500/10 text-orange-600 dark:text-orange-400',
                error: 'border-destructive/20 bg-destructive/10 text-destructive'
            }
        },
        defaultVariants: {
            variant: 'default',
            color: 'default'
        }
    });
    interface StatIndicatorProps
        extends
            Omit<HTMLAttributes<HTMLDivElement>, 'color'>,
            VariantProps<typeof statIndicatorVariants> {}
</script>

<script lang="ts">
    let {
        class: className,
        color,
        variant,
        children,
        ...props
    }: StatIndicatorProps = $props();
</script>

<div
    data-slot="stat-indicator"
    data-variant={variant}
    data-color={color}
    class={cn(statIndicatorVariants({ variant, color }), className)}
    {...props}
>
    {@render children?.()}
</div>
