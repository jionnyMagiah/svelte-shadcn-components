<script lang="ts">
    import CheckboxGroupIndicator from '$lib/registry/packages/dice-ui/checkbox-group/checkbox-group-indicator.svelte';
    import CheckboxGroupItem from '$lib/registry/packages/dice-ui/checkbox-group/checkbox-group-item.svelte';
    import CheckboxGroupLabel from '$lib/registry/packages/dice-ui/checkbox-group/checkbox-group-label.svelte';
    import CheckboxGroupList from '$lib/registry/packages/dice-ui/checkbox-group/checkbox-group-list.svelte';
    import CheckboxGroup from '$lib/registry/packages/dice-ui/checkbox-group/checkbox-group.svelte';
    import { Check } from '@lucide/svelte';
</script>

<CheckboxGroup class="peer flex flex-col gap-3.5">
    <CheckboxGroupLabel
        class="text-sm leading-none text-zinc-600 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-zinc-400"
    >
        Select your favorite tricks
    </CheckboxGroupLabel>
    <CheckboxGroupList
        class="flex gap-3 data-[orientation=horizontal]:flex-row data-[orientation=vertical]:flex-col"
    >
        <label
            class="flex w-fit items-center gap-2 text-sm leading-none text-zinc-900 select-none has-data-disabled:cursor-not-allowed has-data-disabled:opacity-50 has-data-invalid:text-red-500 dark:text-zinc-100 dark:has-data-invalid:text-red-400"
        >
            <CheckboxGroupItem
                value="kickflip"
                class="h-4 w-4 shrink-0 rounded-sm border border-zinc-600 shadow-sm focus-visible:ring-1 focus-visible:ring-zinc-500 focus-visible:outline-hidden data-invalid:border-red-500 dark:border-zinc-400 dark:focus-visible:ring-zinc-400 dark:data-invalid:border-red-400 [&[data-state=checked]:not([data-invalid])]:bg-zinc-900 [&[data-state=checked]:not([data-invalid])]:text-zinc-50 dark:[&[data-state=checked]:not([data-invalid])]:bg-zinc-100 dark:[&[data-state=checked]:not([data-invalid])]:text-zinc-900 [&[data-state=checked][data-invalid]]:bg-red-500 [&[data-state=checked][data-invalid]]:text-white dark:[&[data-state=checked][data-invalid]]:bg-red-400 [&[data-state=unchecked][data-invalid]]:bg-transparent"
            >
                <CheckboxGroupIndicator>
                    <Check class="size-3.5" />
                </CheckboxGroupIndicator>
            </CheckboxGroupItem>
            Kickflip
        </label>
        <label
            class="flex w-fit items-center gap-2 text-sm leading-none text-zinc-900 select-none has-data-disabled:cursor-not-allowed has-data-disabled:opacity-50 has-data-invalid:text-red-500 dark:text-zinc-100 dark:has-data-invalid:text-red-400"
        >
            <CheckboxGroupItem
                value="heelflip"
                class="h-4 w-4 shrink-0 rounded-sm border border-zinc-600 shadow-sm focus-visible:ring-1 focus-visible:ring-zinc-500 focus-visible:outline-hidden data-invalid:border-red-500 dark:border-zinc-400 dark:focus-visible:ring-zinc-400 dark:data-invalid:border-red-400 [&[data-state=checked]:not([data-invalid])]:bg-zinc-900 [&[data-state=checked]:not([data-invalid])]:text-zinc-50 dark:[&[data-state=checked]:not([data-invalid])]:bg-zinc-100 dark:[&[data-state=checked]:not([data-invalid])]:text-zinc-900 [&[data-state=checked][data-invalid]]:bg-red-500 [&[data-state=checked][data-invalid]]:text-white dark:[&[data-state=checked][data-invalid]]:bg-red-400 [&[data-state=unchecked][data-invalid]]:bg-transparent"
            >
                <CheckboxGroupIndicator>
                    <Check class="size-3.5" />
                </CheckboxGroupIndicator>
            </CheckboxGroupItem>
            Heelflip
        </label>
        <label
            class="flex w-fit items-center gap-2 text-sm leading-none text-zinc-900 select-none has-data-disabled:cursor-not-allowed has-data-disabled:opacity-50 has-data-invalid:text-red-500 dark:text-zinc-100 dark:has-data-invalid:text-red-400"
        >
            <CheckboxGroupItem
                value="tre-flip"
                class="h-4 w-4 shrink-0 rounded-sm border border-zinc-600 shadow-sm focus-visible:ring-1 focus-visible:ring-zinc-500 focus-visible:outline-hidden data-invalid:border-red-500 dark:border-zinc-400 dark:focus-visible:ring-zinc-400 dark:data-invalid:border-red-400 [&[data-state=checked]:not([data-invalid])]:bg-zinc-900 [&[data-state=checked]:not([data-invalid])]:text-zinc-50 dark:[&[data-state=checked]:not([data-invalid])]:bg-zinc-100 dark:[&[data-state=checked]:not([data-invalid])]:text-zinc-900 [&[data-state=checked][data-invalid]]:bg-red-500 [&[data-state=checked][data-invalid]]:text-white dark:[&[data-state=checked][data-invalid]]:bg-red-400 [&[data-state=unchecked][data-invalid]]:bg-transparent"
            >
                <CheckboxGroupIndicator>
                    <Check class="size-3.5" />
                </CheckboxGroupIndicator>
            </CheckboxGroupItem>
            Tre Flip
        </label>
        <label
            class="flex w-fit items-center gap-2 text-sm leading-none text-zinc-900 select-none has-data-disabled:cursor-not-allowed has-data-disabled:opacity-50 has-data-invalid:text-red-500 dark:text-zinc-100 dark:has-data-invalid:text-red-400"
        >
            <CheckboxGroupItem
                value="540-flip"
                class="h-4 w-4 shrink-0 rounded-sm border border-zinc-600 shadow-sm focus-visible:ring-1 focus-visible:ring-zinc-500 focus-visible:outline-hidden data-invalid:border-red-500 dark:border-zinc-400 dark:focus-visible:ring-zinc-400 dark:data-invalid:border-red-400 [&[data-state=checked]:not([data-invalid])]:bg-zinc-900 [&[data-state=checked]:not([data-invalid])]:text-zinc-50 dark:[&[data-state=checked]:not([data-invalid])]:bg-zinc-100 dark:[&[data-state=checked]:not([data-invalid])]:text-zinc-900 [&[data-state=checked][data-invalid]]:bg-red-500 [&[data-state=checked][data-invalid]]:text-white dark:[&[data-state=checked][data-invalid]]:bg-red-400 [&[data-state=unchecked][data-invalid]]:bg-transparent"
            >
                <CheckboxGroupIndicator>
                    <Check class="size-3.5" />
                </CheckboxGroupIndicator>
            </CheckboxGroupItem>
            540 Flip
        </label>
    </CheckboxGroupList>
</CheckboxGroup>
