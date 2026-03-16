<script lang="ts">
    import EnvTable from '$lib/registry/components/jal-co-ui/env-table/env-table.svelte';
    import type { EnvVariable } from '$lib/registry/components/jal-co-ui/env-table/utils';

    const databaseVars: EnvVariable[] = [
        {
            key: 'DATABASE_URL',
            value: 'postgresql://admin:s3cret@db.example.com:5432/myapp',
            environment: 'production',
            description: 'Primary PostgreSQL connection string.'
        },
        {
            key: 'DATABASE_POOL_SIZE',
            value: '25',
            environment: 'production'
        },
        {
            key: 'REDIS_URL',
            value: 'redis://:p4ssw0rd@cache.example.com:6379/0',
            environment: 'production',
            description: 'Redis cache connection string.'
        },
        {
            key: 'DATABASE_URL',
            value: 'postgresql://dev:dev@localhost:5432/myapp_dev',
            environment: 'development'
        }
    ];
</script>

<EnvTable variables={databaseVars} title="Database" />
