<script lang="ts">
    import Button from '$lib/components/ui/button/button.svelte';
    import StepperContent from '$lib/registry/components/dice-ui/stepper/stepper-content.svelte';
    import StepperDescription from '$lib/registry/components/dice-ui/stepper/stepper-description.svelte';
    import StepperIndicator from '$lib/registry/components/dice-ui/stepper/stepper-indicator.svelte';
    import StepperItem from '$lib/registry/components/dice-ui/stepper/stepper-item.svelte';
    import StepperList from '$lib/registry/components/dice-ui/stepper/stepper-list.svelte';
    import StepperNext from '$lib/registry/components/dice-ui/stepper/stepper-next.svelte';
    import StepperPrev from '$lib/registry/components/dice-ui/stepper/stepper-prev.svelte';
    import StepperRoot from '$lib/registry/components/dice-ui/stepper/stepper-root.svelte';
    import StepperSeparator from '$lib/registry/components/dice-ui/stepper/stepper-separator.svelte';
    import StepperTitle from '$lib/registry/components/dice-ui/stepper/stepper-title.svelte';
    import StepperTrigger from '$lib/registry/components/dice-ui/stepper/stepper-trigger.svelte';

    const steps = [
        {
            value: 'account',
            title: 'Account creation',
            description: 'Create your account and verify email'
        },
        {
            value: 'profile',
            title: 'Profile Information',
            description: 'Add your personal details and preferences'
        },
        {
            value: 'payment',
            title: 'Payment Details',
            description: 'Set up billing and payment methods'
        },
        {
            value: 'complete',
            title: 'Complete Setup',
            description: 'Review and finish your account setup'
        }
    ];
</script>

<StepperRoot defaultValue="account" class="w-full max-w-md">
    <StepperList>
        {#each steps as step (step.title)}
            <StepperItem value={step.value}>
                <StepperTrigger>
                    <StepperIndicator></StepperIndicator>
                </StepperTrigger>
                <StepperSeparator />
            </StepperItem>
        {/each}
    </StepperList>
    {#each steps as step (step.title)}
        <StepperContent
            value={step.value}
            class="flex flex-col items-center gap-4 rounded-md border bg-card p-4 text-card-foreground"
        >
            <div class="flex flex-col items-center gap-px text-center">
                <span class="text-lg font-semibold">{step.title}</span>
                <p class="text-muted-foreground">{step.description}</p>
            </div>
            <p class="text-sm">Content for {step.title} goes here.</p>
            <StepperPrev>
                {#snippet child({ props })}
                    <Button {...props}>Prev</Button>
                {/snippet}
            </StepperPrev>
            <StepperNext>
                {#snippet child({ props })}
                    <Button {...props}>Next</Button>
                {/snippet}
            </StepperNext>
        </StepperContent>
    {/each}

    <!-- <StepperList>
        <StepperItem value=''>
            <StepperTrigger>
                <StepperIndicator />
                <StepperTitle />
                <StepperDescription />
            </StepperTrigger>
            <StepperSeparator />
        </StepperItem>
    </StepperList>
    <StepperContent value=''>a</StepperContent>
    <StepperPrev />
    <StepperNext /> -->
</StepperRoot>
