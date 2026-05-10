import type { Meta, StoryObj } from '@storybook/react';
import FlexPriceSelect from './Select';

/**
 * Single-select dropdown built on Radix Select.
 * Used for plan/status/currency selection and common form fields.
 */
const meta = {
	title: 'Atoms/Select',
	component: FlexPriceSelect,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: 'Single-select dropdown with labels, validation, and disabled/radio options.',
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		placeholder: { control: 'text' },
		label: { control: 'text' },
		error: { control: 'text' },
		description: { control: 'text' },
		disabled: { control: 'boolean' },
		isRadio: { control: 'boolean' },
	},
	decorators: [
		(Story) => (
			<div className='w-72'>
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof FlexPriceSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

const PLAN_OPTIONS = [
	{ value: 'starter', label: 'Starter' },
	{ value: 'growth', label: 'Growth' },
	{ value: 'enterprise', label: 'Enterprise' },
	{ value: 'custom', label: 'Custom' },
];

const STATUS_OPTIONS = [
	{ value: 'active', label: 'Active', description: 'Currently billing' },
	{ value: 'cancelled', label: 'Cancelled', description: 'Subscription ended' },
	{ value: 'trialing', label: 'Trialing', description: 'In free trial period' },
	{ value: 'past_due', label: 'Past Due', description: 'Payment overdue', disabled: true },
];

const CURRENCY_OPTIONS = [
	{ value: 'usd', label: 'USD — US Dollar' },
	{ value: 'eur', label: 'EUR — Euro' },
	{ value: 'gbp', label: 'GBP — British Pound' },
	{ value: 'inr', label: 'INR — Indian Rupee' },
	{ value: 'jpy', label: 'JPY — Japanese Yen' },
	{ value: 'cad', label: 'CAD — Canadian Dollar' },
];

export const Default: Story = {
	args: {
		options: PLAN_OPTIONS,
		placeholder: 'Select plan',
		label: 'Plan',
	},
};

export const WithValue: Story = {
	args: {
		options: PLAN_OPTIONS,
		value: 'growth',
		label: 'Plan',
	},
};

export const WithDescriptions: Story = {
	args: {
		options: STATUS_OPTIONS,
		placeholder: 'Select status',
		label: 'Subscription Status',
	},
};

export const CurrencySelector: Story = {
	args: {
		options: CURRENCY_OPTIONS,
		placeholder: 'Select currency',
		label: 'Billing Currency',
		description: 'All amounts will be displayed in this currency.',
	},
};

export const WithError: Story = {
	args: {
		options: PLAN_OPTIONS,
		placeholder: 'Select plan',
		label: 'Plan',
		error: 'Please select a billing plan.',
	},
};

export const Disabled: Story = {
	args: {
		options: PLAN_OPTIONS,
		value: 'starter',
		label: 'Plan (locked)',
		disabled: true,
	},
};

export const RadioMode: Story = {
	args: {
		options: PLAN_OPTIONS,
		placeholder: 'Select billing cycle',
		label: 'Billing Cycle',
		isRadio: true,
	},
};

export const WithDisabledOptions: Story = {
	args: {
		options: STATUS_OPTIONS,
		placeholder: 'Filter by status',
		label: 'Status Filter',
	},
};
