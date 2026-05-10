import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within, fn } from '@storybook/test';
import { CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';
import Chip from './Chip';

/**
 * Compact status badge used for plan, invoice, and subscription states.
 * Supports semantic variants, optional icons, and click interaction.
 */
const meta = {
	title: 'Atoms/Chip',
	component: Chip,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: 'Compact status badge with semantic variants and optional icon/click behavior.',
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['default', 'success', 'warning', 'failed', 'info'],
			description: 'Semantic colour variant',
		},
		label: {
			control: 'text',
			description: 'Chip label text',
		},
		disabled: {
			control: 'boolean',
			description: 'Disable interaction',
		},
	},
	args: {
		label: 'Active',
		variant: 'success',
		disabled: false,
	},
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
	args: {
		label: 'Active',
		variant: 'success',
		icon: <CheckCircle size={14} />,
	},
};

export const Default: Story = {
	args: {
		label: 'Archived',
		variant: 'default',
	},
};

export const Failed: Story = {
	args: {
		label: 'Void',
		variant: 'failed',
		icon: <XCircle size={14} />,
	},
};

export const Warning: Story = {
	args: {
		label: 'Pending',
		variant: 'warning',
		icon: <AlertTriangle size={14} />,
	},
};

export const InfoState: Story = {
	args: {
		label: 'Draft',
		variant: 'info',
		icon: <Info size={14} />,
	},
};

export const Disabled: Story = {
	args: {
		label: 'Unavailable',
		variant: 'default',
		disabled: true,
	},
};

export const InvoiceStatuses: Story = {
	render: () => (
		<div className='flex flex-wrap gap-2'>
			<Chip label='Paid' variant='success' icon={<CheckCircle size={14} />} />
			<Chip label='Draft' variant='info' />
			<Chip label='Void' variant='failed' icon={<XCircle size={14} />} />
			<Chip label='Pending' variant='warning' icon={<AlertTriangle size={14} />} />
			<Chip label='Archived' variant='default' />
		</div>
	),
};

export const SubscriptionStatuses: Story = {
	render: () => (
		<div className='flex flex-wrap gap-2'>
			<Chip label='Active' variant='success' />
			<Chip label='Trialing' variant='info' />
			<Chip label='Cancelled' variant='failed' />
			<Chip label='Past Due' variant='warning' />
			<Chip label='Paused' variant='default' />
		</div>
	),
};

export const Clickable: Story = {
	args: {
		label: 'Click me',
		variant: 'info',
		onClick: fn(),
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const chip = canvas.getByRole('button');
		await userEvent.click(chip);
		await expect(chip).toBeInTheDocument();
	},
};
