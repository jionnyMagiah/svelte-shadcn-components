<script>
    import { AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';
    import AvatarGroupItem from '$lib/registry/components/avatar-group/avatar-group-item.svelte';
    import AvatarGroupRoot from '$lib/registry/components/avatar-group/avatar-group-root.svelte';
    import {
        Bell,
        Heart,
        MessageCircle,
        Settings,
        Star,
        User
    } from '@lucide/svelte';

    const avatars = [
        {
            name: 'shadcn',
            src: 'https://github.com/shadcn.png',
            fallback: 'CN'
        },
        {
            name: 'Ethan Niser',
            src: 'https://github.com/ethanniser.png',
            fallback: 'EN'
        },
        {
            name: 'Guillermo Rauch',
            src: 'https://github.com/rauchg.png',
            fallback: 'GR'
        },
        {
            name: 'Lee Robinson',
            src: 'https://github.com/leerob.png',
            fallback: 'LR'
        },
        {
            name: 'Evil Rabbit',
            src: 'https://github.com/evilrabbit.png',
            fallback: 'ER'
        },
        {
            name: 'Tim Neutkens',
            src: 'https://github.com/timneutkens.png',
            fallback: 'TN'
        }
    ];

    const iconData = [
        { icon: User, color: 'bg-blue-500' },
        { icon: Heart, color: 'bg-red-500' },
        { icon: Star, color: 'bg-yellow-500' },
        { icon: MessageCircle, color: 'bg-green-500' },
        { icon: Settings, color: 'bg-purple-500' },
        { icon: Bell, color: 'bg-orange-500' }
    ];
</script>



<h1>With Truncation</h1>

<div class="flex flex-col gap-8">
    <div class="flex flex-col gap-3">
        <h3 class="text-sm font-medium">Avatar Group</h3>
        <AvatarGroupRoot>
            {#each avatars as avatar}
                <AvatarGroupItem size={10}>
                    <AvatarImage src={avatar.src} />
                    <AvatarFallback>{avatar.fallback}</AvatarFallback>
                </AvatarGroupItem>
            {/each}
        </AvatarGroupRoot>
    </div>
    <div class="flex flex-col gap-3">
        <h3 class="text-sm font-medium">Avatar Group with overflow (max 4)</h3>
        <AvatarGroupRoot max={4}>
            {#each avatars as avatar}
                <AvatarGroupItem>
                    <AvatarImage src={avatar.src} />
                    <AvatarFallback>{avatar.fallback}</AvatarFallback>
                </AvatarGroupItem>
            {/each}
        </AvatarGroupRoot>
    </div>
</div>

<h1>With RTL</h1>

<div class="grid gap-6 md:grid-cols-2">
    <div class="flex flex-col gap-3">
        <h3 class="text-sm font-medium">RTL</h3>
        <AvatarGroupRoot dir="ltr">
            {#each avatars as avatar}
                <AvatarGroupItem>
                    <AvatarImage src={avatar.src} />
                    <AvatarFallback>{avatar.fallback}</AvatarFallback>
                </AvatarGroupItem>
            {/each}
        </AvatarGroupRoot>
    </div>
    <div class="flex flex-col gap-3">
        <h3 class="text-sm font-medium">Reverse RTL</h3>
        <AvatarGroupRoot dir="rtl" reverse>
            {#each avatars as avatar}
                <AvatarGroupItem>
                    <AvatarImage src={avatar.src} />
                    <AvatarFallback>{avatar.fallback}</AvatarFallback>
                </AvatarGroupItem>
            {/each}
        </AvatarGroupRoot>
    </div>
    <div class="flex flex-col gap-3">
        <h3 class="text-sm font-medium">Vertical RTL</h3>
        <div class="flex justify-center">
            <AvatarGroupRoot orientation="vertical" dir="rtl">
                {#each avatars as avatar}
                    <AvatarGroupItem>
                        <AvatarImage src={avatar.src} />
                        <AvatarFallback>{avatar.fallback}</AvatarFallback>
                    </AvatarGroupItem>
                {/each}
            </AvatarGroupRoot>
        </div>
    </div>
    <div class="flex flex-col gap-3">
        <h3 class="text-sm font-medium">Vertical reverse RTL</h3>
        <div class="flex justify-center">
            <AvatarGroupRoot orientation="vertical" dir="rtl" reverse>
                {#each avatars as avatar}
                    <AvatarGroupItem>
                        <AvatarImage src={avatar.src} />
                        <AvatarFallback>{avatar.fallback}</AvatarFallback>
                    </AvatarGroupItem>
                {/each}
            </AvatarGroupRoot>
        </div>
    </div>
</div>


<h1>With Icon</h1>

<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
    <div class="flex flex-col gap-3">
        <h3 class="text-sm font-medium">Icon Group</h3>
        <AvatarGroupRoot>
            {#each iconData as item, i}
                <AvatarGroupItem>
                    {#snippet child({ props })}
                        {@const Icon = item.icon}
                        <div
                        {...props}
                            class={`flex size-10 items-center justify-center rounded-full text-white ${item.color}`}
                        >
                            <Icon size={16} />
                        </div>
                    {/snippet}
                </AvatarGroupItem>
            {/each}
        </AvatarGroupRoot>
    </div>
    <div class="flex flex-col gap-3">
        <h3 class="text-sm font-medium">Icon Group with Truncation</h3>
        <AvatarGroupRoot max={3}>
            {#each iconData as item, i}
                {@const Icon = item.icon}
                <div
                    class={`flex size-10 items-center justify-center rounded-full text-white ${item.color}`}
                >
                    <Icon size={16} />
                </div>
            {/each}
        </AvatarGroupRoot>
    </div>
    <div class="flex flex-col gap-3">
        <h3 class="text-sm font-medium">Reverse Icon Group</h3>
        <AvatarGroupRoot reverse>
            {#each iconData as item, i}
                {@const Icon = item.icon}
                <div
                    class={`flex size-10 items-center justify-center rounded-full text-white ${item.color}`}
                >
                    <Icon size={16} />
                </div>
            {/each}
        </AvatarGroupRoot>
    </div>
    <div class="flex flex-col gap-3">
        <h3 class="text-sm font-medium">Reverse with Truncation</h3>
        <AvatarGroupRoot reverse max={3}>
            {#each iconData as item, i}
                {@const Icon = item.icon}
                <div
                    class={`flex size-10 items-center justify-center rounded-full text-white ${item.color}`}
                >
                    <Icon size={16} />
                </div>
            {/each}
        </AvatarGroupRoot>
    </div>
    <div class="flex flex-col gap-3">
        <h3 class="text-sm font-medium">Vertical Icon Group</h3>
        <div class="flex justify-center">
            <AvatarGroupRoot orientation="vertical" size={32}>
                {#each iconData as item, i}
                    {@const Icon = item.icon}
                    <div
                        class={`flex size-8 items-center justify-center rounded-full text-white ${item.color}`}
                    >
                        <Icon size={14} />
                    </div>
                {/each}
            </AvatarGroupRoot>
        </div>
    </div>
    <div class="flex flex-col gap-3">
        <h3 class="text-sm font-medium">Vertical Reverse Icon Group</h3>
        <div class="flex justify-center">
            <AvatarGroupRoot orientation="vertical" reverse size={32}>
                {#each iconData as item, i}
                    {@const Icon = item.icon}
                    <div
                        class={`flex size-8 items-center justify-center rounded-full text-white ${item.color}`}
                    >
                        <Icon size={14} />
                    </div>
                {/each}
            </AvatarGroupRoot>
        </div>
    </div>
</div>
