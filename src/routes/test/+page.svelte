<script lang="ts">
    import Button from '$lib/components/ui/button/button.svelte';
    import * as Card from '$lib/components/ui/card/index.js';
    import * as Field from '$lib/components/ui/field/index.js';
    import { Input } from '$lib/components/ui/input/index.js';
    import { cn } from '$lib/utils';
    import type { Orientation } from 'bits-ui';
    import type { ComponentProps } from 'svelte';

    type InputField = ComponentProps<typeof Input>;
    type FieldData = {
        label: string;
        id: string;
        description?: string;
    } & {
        type: 'input';
        props?: InputField;
    };
    type FormData = {
        id: string;
        name?: string;
        description?: string;
        fields: (FieldData | FormData)[];
        orientation: Orientation;
    };

    type FormAction = { label: string; action: 'submit' | 'reset' };
    type Form = { actions: FormAction[] } & FormData;
    const form: Form = {
        actions: [
            { action: 'reset', label: 'Reset' },
            { action: 'submit', label: 'Submit' }
        ],
        id: 'card_info',
        orientation: 'vertical',
        fields: [
            {
                label: 'Full Name',
                type: 'input',
                description: 'Name on Card',
                id: 'firstname'
            },
            {
                label: 'Card Number',
                type: 'input',
                props: { placeholder: 'XXXX-XXXX-XXXX-XXXX' },
                id: 'card_number'
            },
            {
                id: 'card_detail',
                name: 'Card details',
                orientation: 'horizontal',
                fields: [
                    {
                        label: 'CCV',
                        props: {
                            placeholder: '000',
                            class: 'uppercase'
                        },
                        type: 'input',
                        id: 'ccv'
                    },
                    {
                        label: 'Exp',
                        type: 'input',
                        props: { placeholder: 'DD/MM/YYYY' },
                        description: 'Expires on',
                        id: 'exp_date'
                    }
                ]
            }
        ]
    };

    function isField(data: FieldData | FormData): data is FieldData {
        return (data as FieldData).type !== undefined;
    }

    const formRenderDefaultOptions = { asForm: true };
    type FormRendererOptions = typeof formRenderDefaultOptions;

    function handleFormAction(action: FormAction['action']) {
        if (action === 'reset') {
            stamp = Date.now();
        } else if (action === 'submit') {
            let data: { id: string; value: string }[] = [];
            const formEl = document.querySelectorAll(`form#${form.id} input`);
            formEl.forEach((el) => {
                const inputEl = el as HTMLInputElement;
                data.push({ value: inputEl.value, id: inputEl.id });
            });

            console.log(data);
        }
    }
    let stamp = $state(Date.now());
</script>

{#key stamp}
    <div class="w-full max-w-md">
        {@render formRenderer(form)}
    </div>
{/key}

{#snippet formRenderer(
    form: Form | FormData,
    options: FormRendererOptions = formRenderDefaultOptions
)}
    <Card.Root>
        {#if form.name || form.description}
            <Card.Header>
                {#if form.name}
                    <Card.Title>{form.name}</Card.Title>
                {/if}
                {#if form.description}
                    <Card.Description>{form.description}</Card.Description>
                {/if}
            </Card.Header>
        {/if}
        <Card.Content>
            {#if options.asForm}
                <form id={form.id}>
                    {@render cardContentRenderer(form)}
                </form>
            {:else}
                {@render cardContentRenderer(form)}
            {/if}
        </Card.Content>
        {#if (form as Form).actions}
            {@const actions = (form as Form).actions}
            {#if actions.length > 0}
                <Card.Footer class="flex-col gap-2">
                    {#each actions as action, i (i)}
                        <Button
                            type="submit"
                            class="w-full"
                            form={form.id}
                            onclick={(e) => {
                                handleFormAction(action.action);
                            }}>{action.label}</Button
                        >
                    {/each}
                </Card.Footer>
            {/if}
        {/if}
    </Card.Root>
{/snippet}

{#snippet fieldRenderer(field: FieldData)}
    {#if field.type === 'input'}
        <Field.Field>
            <Field.Label for={field.id}>{field.label}</Field.Label>
            <Input id={field.id} {...field.props} />
            {#if field.description}
                <Field.Description>{field.description}</Field.Description>
            {/if}
        </Field.Field>
    {/if}
{/snippet}

{#snippet cardContentRenderer(form: FormData | Form)}
    <Field.Group>
        <Field.Set>
            <div
                class={cn('flex w-full flex-col gap-3', {
                    'flex-row': form.orientation === 'horizontal'
                })}
            >
                {#each form.fields as field (field.id)}
                    {#if isField(field)}
                        {@render fieldRenderer(field)}
                    {:else}
                        {@render formRenderer(field, { asForm: false })}
                    {/if}
                {/each}
            </div>
        </Field.Set>
    </Field.Group>
{/snippet}
