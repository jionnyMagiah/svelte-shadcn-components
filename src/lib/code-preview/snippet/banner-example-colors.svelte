<script lang="ts">
    import BannerAction from '$lib/registry/components/kibo-ui/banner/banner-action.svelte';
    import BannerClose from '$lib/registry/components/kibo-ui/banner/banner-close.svelte';
    import BannerIcon from '$lib/registry/components/kibo-ui/banner/banner-icon.svelte';
    import BannerTitle from '$lib/registry/components/kibo-ui/banner/banner-title.svelte';
    import Banner from '$lib/registry/components/kibo-ui/banner/banner.svelte';
    import { CircleAlert } from '@lucide/svelte';
</script>

<div class="flex w-full flex-col gap-8">
    <div
        class="w-full"
        style:--primary="oklch(0.637 0.237 25.331)"
        style:--primary-foreground="oklch(0.971 0.013 17.38)"
    >
        <Banner>
            <BannerIcon icon={CircleAlert} />
            <BannerTitle>
                Something's gone <strong>horribly</strong> wrong.
            </BannerTitle>
            <BannerAction>Restart</BannerAction>
            <BannerClose />
        </Banner>
    </div>
    <div
        class="w-full"
        style:--primary="oklch(0.705 0.213 47.604)"
        style:--primary-foreground="oklch(0.98 0.016 73.684)"
    >
        <Banner>
            <BannerIcon icon={CircleAlert} />
            <BannerTitle>You're almost out of disk space.</BannerTitle>
            <BannerAction>Upgrade</BannerAction>
            <BannerClose />
        </Banner>
    </div>
    <div
        class="w-full"
        style:--primary="oklch(0.723 0.219 149.579)"
        style:--primary-foreground="oklch(0.982 0.018 155.826)"
    >
        <Banner>
            <BannerIcon icon={CircleAlert} />
            <BannerTitle>You've been selected for a secret mission.</BannerTitle
            >
            <BannerAction>Accept</BannerAction>
            <BannerClose />
        </Banner>
    </div>
</div>
