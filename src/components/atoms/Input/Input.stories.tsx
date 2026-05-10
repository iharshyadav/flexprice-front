import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { useState } from 'react';
import { DollarSign, Percent, Search } from 'lucide-react';
import Input from './Input';

/**
 * Main text/number input used across forms in FlexPrice.
 * Supports labels, validation messages, prefixes/suffixes, and numeric formatting variants.
 */
const meta = {
	title: 'Atoms/Input',
	component: Input,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: 'Text/number input with labels, validation, and numeric formatting options.',
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['text', 'number', 'formatted-number', 'integer'],
			description: 'Input type variant',
		},
		size: {
			control: 'select',
			options: ['default', 'sm', 'lg'],
			description: 'Input size',
		},
		label: { control: 'text' },
		placeholder: { control: 'text' },
		error: { control: 'text' },
		description: { control: 'text' },
		disabled: { control: 'boolean' },
	},
	args: {
		placeholder: 'Enter text here',
		variant: 'text',
		size: 'default',
		disabled: false,
	},
	decorators: [
		(Story) => (
			<div className='w-80'>
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		placeholder: 'Enter text here',
	},
};

export const WithLabel: Story = {
	args: {
		label: 'Email Address',
		placeholder: 'you@company.com',
		description: 'Used for invoices and notifications.',
		type: 'email',
	},
};

export const WithError: Story = {
	args: {
		label: 'API Key',
		placeholder: 'Enter API key',
		error: 'Invalid API key format.',
	},
};

export const Disabled: Story = {
	args: {
		label: 'Plan ID',
		value: 'plan_01HM6...',
		disabled: true,
	},
};

const CurrencyPrefixStory = () => {
	const [val, setVal] = useState('');
	return (
		<div className='w-80'>
			<Input
				label='Price'
				placeholder='0.00'
				variant='formatted-number'
				inputPrefix={<DollarSign size={14} className='text-muted-foreground' />}
				suffix={<span className='text-xs text-muted-foreground'>USD</span>}
				value={val}
				onChange={setVal}
			/>
		</div>
	);
};

export const WithCurrencyPrefix: Story = {
	render: () => <CurrencyPrefixStory />,
};

const SearchInputStory = () => {
	const [val, setVal] = useState('');
	return (
		<div className='w-80'>
			<Input
				placeholder='Search customers...'
				inputPrefix={<Search size={14} className='text-muted-foreground' />}
				value={val}
				onChange={setVal}
			/>
		</div>
	);
};

export const SearchInput: Story = {
	render: () => <SearchInputStory />,
};

const PercentSuffixStory = () => {
	const [val, setVal] = useState('');
	return (
		<div className='w-80'>
			<Input
				label='Discount Rate'
				placeholder='0'
				variant='number'
				suffix={<Percent size={14} className='text-muted-foreground' />}
				value={val}
				onChange={setVal}
			/>
		</div>
	);
};

export const WithPercentSuffix: Story = {
	render: () => <PercentSuffixStory />,
};

const NumberVariantStory = () => {
	const [val, setVal] = useState('');
	return (
		<div className='w-80'>
			<Input
				label='Usage Units'
				placeholder='0'
				variant='number'
				value={val}
				onChange={setVal}
				description='Number of API calls billed this period.'
			/>
		</div>
	);
};

export const NumberVariant: Story = {
	render: () => <NumberVariantStory />,
};

const IntegerVariantStory = () => {
	const [val, setVal] = useState('');
	return (
		<div className='w-80'>
			<Input label='Seat Count' placeholder='0' variant='integer' value={val} onChange={setVal} />
		</div>
	);
};

export const IntegerVariant: Story = {
	render: () => <IntegerVariantStory />,
};

const InteractiveStory = () => {
	const [val, setVal] = useState('');
	return (
		<div className='w-80 flex flex-col gap-2'>
			<Input label='Controlled Input' value={val} onChange={setVal} placeholder='Type something...' />
			<p className='text-xs text-muted-foreground'>Value: {val || '(empty)'}</p>
		</div>
	);
};

export const Interactive: Story = {
	render: () => <InteractiveStory />,
};

export const TypingTest: Story = {
	args: {
		label: 'Customer Name',
		placeholder: 'Type here...',
		id: 'input-typing-test',
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole('textbox');
		await userEvent.click(input);
		await userEvent.type(input, 'Acme Corp');
		await expect(input).toHaveValue('Acme Corp');
	},
};
