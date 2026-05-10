import type { Meta, StoryObj } from '@storybook/react';
import Progress from './Progress';

/**
 * Labeled progress bar used for usage and quota displays.
 * Useful for seats, API calls, storage, and other metered values.
 */
const meta = {
	title: 'Molecules/UsageBar',
	component: Progress,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: 'Labeled progress bar for usage and quota displays.',
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		value: {
			control: { type: 'range', min: 0, max: 100, step: 1 },
			description: 'Progress percentage (0–100)',
		},
		label: { control: 'text', description: 'Label below the bar' },
		indicatorColor: { control: 'text', description: 'Tailwind class for fill colour' },
		backgroundColor: { control: 'text', description: 'Tailwind class for track colour' },
		labelColor: { control: 'text', description: 'Tailwind class for label colour' },
	},
	args: {
		value: 45,
		label: '4,500 / 10,000 API calls',
	},
	decorators: [
		(Story) => (
			<div className='w-80'>
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LowUsage: Story = {
	args: {
		value: 18,
		label: '180 / 1,000 events',
		indicatorColor: 'bg-green-500',
	},
};

export const MediumUsage: Story = {
	args: {
		value: 62,
		label: '6,200 / 10,000 API calls',
		indicatorColor: 'bg-yellow-500',
	},
};

export const HighUsage: Story = {
	args: {
		value: 92,
		label: '9,200 / 10,000 API calls — 800 remaining',
		indicatorColor: 'bg-red-500',
		labelColor: 'text-red-600',
	},
};

export const AtLimit: Story = {
	args: {
		value: 100,
		label: '10,000 / 10,000 calls — Limit reached',
		indicatorColor: 'bg-red-600',
		labelColor: 'text-red-700',
	},
};

export const Empty: Story = {
	args: {
		value: 0,
		label: '0 / 5,000 seats',
	},
};

export const EntitlementPanel: Story = {
	render: () => (
		<div className='w-80 space-y-4 p-4 border border-gray-100 rounded-lg bg-white'>
			<p className='text-sm font-medium text-gray-800'>Plan Usage</p>
			<div className='space-y-3'>
				<div>
					<p className='text-xs text-muted-foreground mb-1'>API Calls</p>
					<Progress value={72} label='7,200 / 10,000' indicatorColor='bg-blue-500' />
				</div>
				<div>
					<p className='text-xs text-muted-foreground mb-1'>Seats</p>
					<Progress value={40} label='4 / 10 seats' indicatorColor='bg-green-500' />
				</div>
				<div>
					<p className='text-xs text-muted-foreground mb-1'>Storage</p>
					<Progress value={95} label='9.5 / 10 GB' indicatorColor='bg-red-500' labelColor='text-red-600' />
				</div>
			</div>
		</div>
	),
};
