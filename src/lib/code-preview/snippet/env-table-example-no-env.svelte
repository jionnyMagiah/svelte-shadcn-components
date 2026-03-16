<script lang="ts">
    import EnvTable from '$lib/registry/components/jal-co-ui/env-table/env-table.svelte';
    import type { EnvVariable } from '$lib/registry/components/jal-co-ui/env-table/utils';

    const simpleVars: EnvVariable[] = [
        {
            key: 'API_KEY',
            value: 'ak_prod_9f8e7d6c5b4a3210'
        },
        {
            key: 'API_SECRET',
            value: 'as_prod_xyzzy42plugh'
        },
        {
            key: 'WEBHOOK_URL',
            value: 'https://hooks.example.com/ingest/v1/abc123'
        },
        {
            key: 'LOG_LEVEL',
            value: 'info'
        }
    ];
</script>

<EnvTable variables={simpleVars} title="API Keys" />
