export type Environment =
    | 'production'
    | 'preview'
    | 'development'
    | (string & {});

export type EnvVariable = {
    /** Variable name (e.g. DATABASE_URL). */
    key: string;
    /** Variable value. Masked by default. */
    value: string;
    /** Target environment. When provided, renders as a badge. */
    environment?: Environment;
    /** Optional description shown below the key. */
    description?: string;
};

export type EnvTableProps = {
    /** Environment variables to display. */
    variables: EnvVariable[];
    /** Optional heading above the table. */
    title?: string;
    /** Start with all values revealed. Defaults to false. */
    defaultRevealed?: boolean;
    /** Additional CSS classes on the root element. */
    className?: string;
};

export function envBadgeColor(env: Environment): string {
    switch (env) {
        case 'production':
            return 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400';
        case 'preview':
            return 'bg-sky-500/15 text-sky-700 dark:text-sky-400';
        case 'development':
            return 'bg-amber-500/15 text-amber-700 dark:text-amber-400';
        default:
            return 'bg-muted text-muted-foreground';
    }
}

export function maskValue(value: string): string {
    if (value.length <= 4) return '••••••••';
    return value.slice(0, 4) + '••••••••';
}
