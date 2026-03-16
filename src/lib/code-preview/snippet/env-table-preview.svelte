<script lang="ts">
    import EnvTable from '$lib/registry/components/jal-co-ui/env-table/env-table.svelte';
    import type { EnvVariable } from '$lib/registry/components/jal-co-ui/env-table/utils';

    const vercelVars: EnvVariable[] = [
        {
            key: 'NEXT_PUBLIC_SITE_URL',
            value: 'https://ui.justinlevine.me',
            environment: 'production'
        },
        {
            key: 'NEXT_PUBLIC_SITE_URL',
            value: 'https://preview--jalco-ui.vercel.app',
            environment: 'preview'
        },
        {
            key: 'VERCEL_ENV',
            value: 'production',
            environment: 'production'
        },
        {
            key: 'STRIPE_SECRET_KEY',
            value: 'stripe_live_key_example_abcdefghijklmnopqrstuv',
            environment: 'production',
            description: 'Stripe live API key. Never expose client-side.'
        },
        {
            key: 'STRIPE_SECRET_KEY',
            value: 'stripe_test_key_example_abcdefghijklmnopqrstuv',
            environment: 'preview'
        },
        {
            key: 'GITHUB_TOKEN',
            value: 'ghp_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8',
            environment: 'production',
            description: 'GitHub PAT for API access.'
        }
    ];
</script>

<EnvTable variables={vercelVars} title="Environment Variables" />
